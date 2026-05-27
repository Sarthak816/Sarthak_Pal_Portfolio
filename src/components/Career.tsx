import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My journey <span>&</span>
          <br /> achievements
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in Computer Science</h4>
                <h5>Prestige Institute of Engineering, Management &amp; Research (RGPV)</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Building AI applications, leading hackathon teams, and shipping
              full-stack products. Coursework: Data Structures &amp; Algorithms,
              Systems Design, OOP, Large Scale Databases.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Diploma in Computer Science</h4>
                <h5>Shri Vaishnav Polytechnic College (RGPV University)</h5>
              </div>
              <h3>2021–24</h3>
            </div>
            <p>
              CGPA: 8.12 / 10.0. Foundation in CS fundamentals, programming,
              and software development practices.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Hackathons &amp; Competitions</h4>
                <h5>AMUHACKS 5.0 · Smart India Hackathon · Salesforce Dreamquest</h5>
              </div>
              <h3>ONGOING</h3>
            </div>
            <p>
              AMUHACKS 5.0: Top 8 / 100+ teams (Feb 2026).
              SIH 2025: Team Lead on Sahayak.
              Salesforce Dreamquest: Top 150 globally (2026).
              LeetCode 1650+ rating · 400+ problems · Top 15% globally.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Certifications &amp; Open Source</h4>
                <h5>AWS · Anthropic · GFG 160 Days · HackerRank</h5>
              </div>
              <h3>2024–26</h3>
            </div>
            <p>
              AWS Certified AI Practitioner (Apr 2026).
              Anthropic Claude Code in Action (2025).
              HackerRank: 5-Star Java · SQL Advanced certified.
              GFG 160 Days Coding Challenge completed (2024).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
