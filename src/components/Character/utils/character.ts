import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc?v=2",
          "MyCharacter12"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;

                // Change clothing colors to match site theme
                if (mesh.material) {
                  if (mesh.name === "BODY.SHIRT") {
                    const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    newMat.color = new THREE.Color("#8B4513");
                    mesh.material = newMat;
                  } else if (mesh.name === "Pant") {
                    const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    newMat.color = new THREE.Color("#000000");
                    mesh.material = newMat;
                  }
                }

                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });

            // Add spectacles tracked to head bone world transform
            const headBone = character.getObjectByName("spine006");
            if (headBone) {
              const frameMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.4, metalness: 0.6 });
              const lensMat = new THREE.MeshStandardMaterial({ color: 0x222222, transparent: true, opacity: 0.4, roughness: 0.1, metalness: 0.2 });

              const lensL = new THREE.Mesh(new THREE.TorusGeometry(0.038, 0.005, 8, 24), frameMat);
              const lensR = new THREE.Mesh(new THREE.TorusGeometry(0.038, 0.005, 8, 24), frameMat);
              const fillL = new THREE.Mesh(new THREE.CircleGeometry(0.033, 24), lensMat);
              const fillR = new THREE.Mesh(new THREE.CircleGeometry(0.033, 24), lensMat);
              lensL.position.set(-0.045, 0, 0);
              lensR.position.set(0.045, 0, 0);
              fillL.position.copy(lensL.position);
              fillR.position.copy(lensR.position);

              const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.024, 6), frameMat);
              bridge.rotation.z = Math.PI / 2;

              const templeL = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.09, 6), frameMat);
              const templeR = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.09, 6), frameMat);
              templeL.rotation.z = Math.PI / 2;
              templeR.rotation.z = Math.PI / 2;
              templeL.position.set(-0.13, 0, -0.01);
              templeR.position.set(0.13, 0, -0.01);

              const spectacles = new THREE.Group();
              spectacles.add(lensL, lensR, fillL, fillR, bridge, templeL, templeR);
              scene.add(spectacles);

              // Patch renderer.render to sync spectacles to bone each frame
              const bonePos = new THREE.Vector3();
              const boneQuat = new THREE.Quaternion();
              const origRender = renderer.render.bind(renderer);
              renderer.render = (s, c) => {
                headBone.getWorldPosition(bonePos);
                headBone.getWorldQuaternion(boneQuat);
                spectacles.position.copy(bonePos);
                spectacles.quaternion.copy(boneQuat);
                origRender(s, c);
              };
            }

            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;

            // Monitor scale is handled by GsapScroll.ts animations

            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
