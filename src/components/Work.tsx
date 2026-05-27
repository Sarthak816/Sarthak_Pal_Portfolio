import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "NextFlow",
    category: "Visual LLM Workflow Engine",
    tools: "Next.js 15, TypeScript, React Flow, Trigger.dev, Gemini API, PostgreSQL",
    image: "/images/nextflow.png",
    link: "https://nextflow-roan.vercel.app/",
  },
  {
    title: "Sahayak",
    category: "AI Workflow Automation Platform",
    tools: "Python, FastAPI, LangChain, HuggingFace, Docker, Vue (Frontend)",
    image: "/images/sahayak.png",
    link: "https://github.com/Sarthak816/Sahayak",
  },
  {
    title: "REBOUND",
    category: "AI Student Recovery Platform",
    tools: "React, Vite, Tailwind CSS, Node.js, Express, MongoDB",
    image: "/images/rebound.png",
    link: "http://couch-potato-amuhacks-5-0.vercel.app/",
  },
  {
    title: "Protec-X",
    category: "Real-Time Fraud Detection System",
    tools: "Java, MySQL, JDBC, Multithreading, MVC Architecture",
    image: "/images/protecx.png",
    link: "https://github.com/Sarthak816/Protec-X",
  },
  {
    title: "AI-Code-Review-Bot",
    category: "Automated AI Code Review Tool",
    tools: "JavaScript, OpenAI API, GitHub Actions, Webhooks",
    image: "/images/sapphire.png",
    link: "https://github.com/Sarthak816/AI-Code-Review-Bot",
  },
  {
    title: "Velync AI",
    category: "AI-Powered SaaS Platform",
    tools: "TypeScript, Next.js, AI/LLM Integration",
    image: "/images/Solidx.png",
    link: "https://github.com/Sarthak816/Velync-AI",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div className="carousel-slide" key={currentIndex}>
              <div className="carousel-content">
                <div className="carousel-info">
                  <div className="carousel-number">
                    <h3>{String(currentIndex + 1).padStart(2, "0")}</h3>
                  </div>
                  <div className="carousel-details">
                    <h4>{projects[currentIndex].title}</h4>
                    <p className="carousel-category">{projects[currentIndex].category}</p>
                    <div className="carousel-tools">
                      <span className="tools-label">Tools & Features</span>
                      <p>{projects[currentIndex].tools}</p>
                    </div>
                  </div>
                </div>
                <div className="carousel-image-wrapper">
                  <WorkImage
                    image={projects[currentIndex].image}
                    alt={projects[currentIndex].title}
                    link={projects[currentIndex].link}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
