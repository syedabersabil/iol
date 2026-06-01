import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  const [activeFilter, setActiveFilter] = useState('all');
  
  // Interactive sandbox states
  const [borderRadius, setBorderRadius] = useState(50);
  const [rotation, setRotation] = useState(45);
  const [scale, setScale] = useState(1);
  const [hue, setHue] = useState(270);

  // Form states
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus('sending');
    
    // Simulate API request
    setTimeout(() => {
      setSubmitStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus(''), 4000);
    }, 1500);
  };

  const projects = [
    {
      id: 1,
      name: "Nebula UI Design System",
      description: "A highly accessible, glassmorphic component library styled using custom HSL tokens and subtle CSS keyframe micro-animations.",
      category: "react",
      emoji: "🌌",
      tech: ["React", "CSS", "A11y"],
      link: "#"
    },
    {
      id: 2,
      name: "Helix Web Synthesizer",
      description: "An audio synthesizer built on the Web Audio API with visual frequency rendering on an interactive canvas viewport.",
      category: "creative",
      emoji: "🔊",
      tech: ["Web Audio", "Vite", "Canvas"],
      link: "#"
    },
    {
      id: 3,
      name: "Chroma Interactive Mesh",
      description: "Real-time interactive color and vector shape playground letting developers customize fluid responsive containers.",
      category: "creative",
      emoji: "🎨",
      tech: ["React", "CSS Grid", "Interpolation"],
      link: "#"
    },
    {
      id: 4,
      name: "Flux Cache Engine",
      description: "High-performance caching middleware library optimized for modern Node.js edge deployments and serverless functions.",
      category: "node",
      emoji: "⚡",
      tech: ["Node.js", "Redis", "TypeScript"],
      link: "#"
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const skills = [
    { name: "Frontend Development", level: 95, desc: "Modern React (Hooks, Context, SSR), HTML5, Semantic SEO structure" },
    { name: "CSS Design Systems", level: 90, desc: "Custom variables, keyframe animations, grid layouts, fluid responsiveness" },
    { name: "Creative Web GL / Canvas", level: 80, desc: "2D context mapping, interactive physics, browser animation loops" },
    { name: "Node.js & Backend Architecture", level: 85, desc: "RESTful API engineering, Serverless functions, routing systems" }
  ];

  return (
    <div className="app-container">
      <div className="bg-gradient-mesh"></div>
      
      {/* Navigation Header */}
      <nav className="navbar">
        <div className="nav-brand">
          <span>IOL</span>
        </div>
        <ul className="nav-links">
          <li><a href="#projects" className="nav-link">Projects</a></li>
          <li><a href="#skills" className="nav-link">Capabilities</a></li>
          <li><a href="#sandbox" className="nav-link">Playground</a></li>
          <li><a href="#contact" className="nav-link">Contact</a></li>
        </ul>
        <div className="nav-actions">
          <button 
            onClick={toggleTheme} 
            className="theme-btn" 
            aria-label="Toggle layout theme"
            title="Toggle Layout Theme"
          >
            {theme === 'light' ? (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"></path></svg>
            ) : (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M4.978 4.978l1.591 1.591m10.862 10.862l1.591 1.591M3 12h2.25m13.5 0H21M4.978 19.022l1.591-1.591m10.862-10.862l1.591-1.591M12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z"></path></svg>
            )}
          </button>
          <a href="#contact" className="cta-btn" style={{ textDecoration: 'none' }}>Get in Touch</a>
        </div>
      </nav>

      {/* Main Container */}
      <main className="main-content">
        
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-pulse"></span>
              <span>Available for Creative Engineering projects</span>
            </div>
            <h1 className="hero-title">
              Crafting premium digital experiences through <span>code & design</span>
            </h1>
            <p className="hero-description">
              Welcome to IOL. We create clean, fast, high-performance web applications using robust structures, curated typography, and fluid micro-interactions.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="cta-btn" style={{ textDecoration: 'none' }}>View Showcase</a>
              <a href="#sandbox" className="btn-secondary" style={{ textDecoration: 'none' }}>Enter Playground</a>
            </div>
          </div>
          
          {/* Interactive Sandbox Card */}
          <div className="hero-visualizer" id="sandbox">
            <div className="visualizer-card">
              <div className="visualizer-header">
                <div className="dot-indicators">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
                <span className="visualizer-title">chroma-mesh.config</span>
              </div>
              
              <div className="visualizer-preview">
                <div 
                  className="interactive-mesh"
                  style={{
                    borderRadius: `${borderRadius}%`,
                    transform: `rotate(${rotation}deg) scale(${scale})`,
                    background: `linear-gradient(135deg, hsl(${hue}, 85%, 65%), hsl(${(hue + 60) % 360}, 85%, 55%))`,
                    boxShadow: `0 10px 30px hsla(${hue}, 85%, 65%, 0.3)`
                  }}
                ></div>
              </div>

              <div className="control-panel">
                <div className="control-row">
                  <div className="control-label">
                    <span>Morph Radius</span>
                    <span>{borderRadius}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="50" 
                    value={borderRadius} 
                    onChange={(e) => setBorderRadius(Number(e.target.value))} 
                    className="slider"
                  />
                </div>

                <div className="control-row">
                  <div className="control-label">
                    <span>Rotation Angle</span>
                    <span>{rotation}°</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="360" 
                    value={rotation} 
                    onChange={(e) => setRotation(Number(e.target.value))} 
                    className="slider"
                  />
                </div>

                <div className="control-row">
                  <div className="control-label">
                    <span>Color Spectrum Hue</span>
                    <span>{hue}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="360" 
                    value={hue} 
                    onChange={(e) => setHue(Number(e.target.value))} 
                    className="slider"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid Section */}
        <section className="section" id="projects">
          <div className="section-header">
            <span className="section-tag">Case Studies</span>
            <h2 className="section-title">Selected Projects</h2>
            <p className="section-description">A collection of custom applications designed with a focus on polished interface transitions and scalable foundations.</p>
          </div>

          <div className="filters">
            <button className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => handleFilterChange('all')}>All</button>
            <button className={`filter-btn ${activeFilter === 'react' ? 'active' : ''}`} onClick={() => handleFilterChange('react')}>React Components</button>
            <button className={`filter-btn ${activeFilter === 'creative' ? 'active' : ''}`} onClick={() => handleFilterChange('creative')}>Creative Tech</button>
            <button className={`filter-btn ${activeFilter === 'node' ? 'active' : ''}`} onClick={() => handleFilterChange('node')}>Node Engines</button>
          </div>

          <div className="projects-grid">
            {filteredProjects.map(project => (
              <article className="project-card" key={project.id}>
                <div className="project-banner">
                  <span>{project.emoji}</span>
                  <span className="project-tag">{project.category}</span>
                </div>
                <div className="project-details">
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((t, idx) => (
                      <span className="tech-tag" key={idx}>{t}</span>
                    ))}
                  </div>
                  <div className="project-footer">
                    <a href={project.link} className="project-link">
                      Launch app
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path></svg>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Technical Capabilities Section */}
        <section className="section" id="skills">
          <div className="section-header">
            <span className="section-tag">Stack & Skills</span>
            <h2 className="section-title">Core Competencies</h2>
            <p className="section-description">Our specialized engineering toolkit designed for building performant modern web solutions.</p>
          </div>

          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div className="skill-card" key={index}>
                <h3 className="skill-name">{skill.name}</h3>
                <p className="skill-desc">{skill.desc}</p>
                <div className="skill-bar-container">
                  <div className="skill-bar-fill" style={{ width: `${skill.level}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="section contact-section" id="contact">
          <div className="section-header">
            <span className="section-tag">Collaboration</span>
            <h2 className="section-title">Let's build something</h2>
            <p className="section-description">Get in touch to discuss creative engineering ideas, contract development, or visual system design.</p>
          </div>

          <div className="contact-card">
            <form onSubmit={handleFormSubmit} className="contact-form">
              <div className="form-group">
                <label className="form-label" htmlFor="user-name">Your Name</label>
                <input 
                  type="text" 
                  id="user-name" 
                  className="form-input" 
                  placeholder="Enter name"
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="user-email">Email Address</label>
                <input 
                  type="email" 
                  id="user-email" 
                  className="form-input" 
                  placeholder="Enter email address"
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="user-message">Project Brief / Message</label>
                <textarea 
                  id="user-message" 
                  className="form-input form-textarea" 
                  placeholder="Tell us about your project timeline and requirements..."
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-btn" disabled={submitStatus === 'sending'}>
                {submitStatus === 'sending' ? 'Dispatching Message...' : 'Submit Inquiry'}
              </button>
              {submitStatus === 'success' && (
                <div className="form-status" role="status">
                  Thank you! Your message has been sent successfully. We'll be in touch soon.
                </div>
              )}
            </form>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-socials">
            <a href="https://github.com" className="social-link" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com" className="social-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://twitter.com" className="social-link" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
          <p className="footer-text">
            &copy; {new Date().getFullYear()} IOL Creative Development Lab. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
