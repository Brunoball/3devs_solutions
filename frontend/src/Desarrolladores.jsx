import React, { useState, useEffect, useRef } from "react";
import "./Desarrolladores.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faAngleUp, faCheckCircle, faExclamationTriangle, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faBullseye, faCogs, faHandshake, faUsers, faCode, faMobileAlt, faDesktop } from '@fortawesome/free-solid-svg-icons';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { translations, developersData, serviciosData } from './translations';

const esFlag = "/img/es-flag.png";
const usFlag = "/img/us-flag.png";

const TechCategoryCard = ({ category, title, description, icon, technologies, accentColor }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`tech-card ${category}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ '--accent-color': accentColor }}
    >
      <div className={`card-content ${isHovered ? 'hidden' : ''}`}>
        <div className="card-header">
          <div className="card-icon">
            {icon}
          </div>
          <h3>{title}</h3>
        </div>
        <p>{description}</p>
        <div className="tech-preview">
          {technologies.slice(0, 4).map((tech, i) => (
            <div key={`preview-${category}-${i}`} className="tech-icon">
              <img src={tech.icon} alt={tech.name} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
      
      <div className={`tech-details ${isHovered ? 'visible' : ''}`}>
        <h4>Technologies</h4>
        <div className="tech-grid">
          {technologies.map((tech, i) => (
            <div key={`${category}-${i}`} className="tech-item">
              <div className="tech-icon">
                <img src={tech.icon} alt={tech.name} loading="lazy" />
              </div>
              <span className="tech-name">{tech.name}</span>
              {tech.level && (
                <div className="skill-level">
                  <div 
                    className="skill-progress" 
                    style={{ width: `${tech.level}%` }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Desarrolladores = () => {
  
  const [expandedCard, setExpandedCard] = useState(null);
  const [language, setLanguage] = useState("es");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [activeService, setActiveService] = useState(0);
  const [selectedTech, setSelectedTech] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const canvasRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const cursorIntervalRef = useRef(null);
  const sectionRefs = useRef([]);
  
  const technologies = [
    { name: "HTML5", icon: "/img/html_logo.png", className: "html-style", category: "frontend", level: 90, description: "Lenguaje de marcado estándar para crear páginas web." },
    { name: "CSS3", icon: "/img/css_logo.png", className: "css-style", category: "frontend", level: 85, description: "Lenguaje de diseño para estilizar páginas web." },
    { name: "JavaScript", icon: "/img/js_logo.png", className: "js-style", category: "frontend", level: 80, description: "Lenguaje de programación para interactividad web." },
    { name: "React", icon: "/img/react_logo.png", className: "react-style", category: "frontend", level: 75, description: "Biblioteca JavaScript para construir interfaces de usuario." },
    { name: "PHP", icon: "/img/php_logo.png", className: "php-style", category: "backend", level: 70, description: "Lenguaje de scripting del lado del servidor." },
    { name: "Python", icon: "/img/py_logo.png", className: "python-style", category: "backend", level: 65, description: "Lenguaje de programación versátil y potente." },
    { name: "Node JS", icon: "/img/node_logo.png", className: "node-style", category: "backend", level: 60, description: "Entorno de ejecución de JavaScript del lado del servidor." },
    { name: "SQL", icon: "/img/sql_logo.png", className: "sql-style", category: "database", level: 75, description: "Lenguaje para gestionar bases de datos relacionales." },
    { name: "Visual Studio", icon: "/img/visual_logo.png", className: "visual-style", category: "tools", level: 80, description: "Entorno de desarrollo integrado de Microsoft." },
    { name: "GitHub", icon: "/img/git_logo.png", className: "git-style", category: "tools", level: 70, description: "Plataforma de desarrollo colaborativo y control de versiones." },
  ];

  const filterTech = (category) => {
    setActiveCategory(category);
    setSelectedTech(null);
  };

  const showTechDetails = (tech) => {
    setSelectedTech(tech);
  };

  const filteredTechs = activeCategory === 'all' 
    ? technologies 
    : technologies.filter(tech => tech.category === activeCategory);

  useEffect(() => {
    const welcomeText = translations[language].welcome;
    setTypedText("");
    let currentIndex = 0;
  
    clearTimeout(typingTimeoutRef.current);
    clearInterval(cursorIntervalRef.current);
  
    setShowCursor(true);
  
    cursorIntervalRef.current = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
  
    const typeText = () => {
      if (currentIndex <= welcomeText.length) {
        setTypedText(welcomeText.substring(0, currentIndex));
        currentIndex++;
        typingTimeoutRef.current = setTimeout(typeText, 100);
      } else {
        clearInterval(cursorIntervalRef.current);
        setShowCursor(false);
      }
    };
  
    typeText();
  
    return () => {
      clearTimeout(typingTimeoutRef.current);
      clearInterval(cursorIntervalRef.current);
    };
  }, [language]);
    
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 70;
    let animationFrameId;
  
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
  
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.mass = this.size * 2;
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 2 - 1;
        this.color = `hsl(${Math.random() * 60 + 180}, 70%, 50%)`;
        this.gravity = 0.05;
        this.friction = 0.98;
        this.maxSpeed = 3;
      }
  
      attract(other) {
        const dx = other.x - this.x;
        const dy = other.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = this.size + other.size;
        
        if (distance > minDistance) {
          const force = this.gravity * this.mass * other.mass / (distance * distance);
          const angle = Math.atan2(dy, dx);
          const fx = Math.cos(angle) * force;
          const fy = Math.sin(angle) * force;
          
          this.vx += fx / this.mass;
          this.vy += fy / this.mass;
        } else if (distance > 0 && distance < minDistance) {
          const angle = Math.atan2(dy, dx);
          this.vx -= Math.cos(angle) * 0.1;
          this.vy -= Math.sin(angle) * 0.1;
        }
      }
  
      update() {
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > this.maxSpeed) {
          this.vx = (this.vx / speed) * this.maxSpeed;
          this.vy = (this.vy / speed) * this.maxSpeed;
        }
        
        this.vx *= this.friction;
        this.vy *= this.friction;
        
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) {
          this.vx = -this.vx * 0.8;
          this.x = Math.max(0, Math.min(canvas.width, this.x));
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.vy = -this.vy * 0.8;
          this.y = Math.max(0, Math.min(canvas.height, this.y));
        }
      }
  
      draw() {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(0.8, this.color.replace('50%)', '30%)'));
        gradient.addColorStop(1, this.color.replace('50%)', '10%)'));
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;
          
          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;
            ctx.strokeStyle = particles[i].color.replace('50%)', `${opacity * 20}%)`);
            ctx.lineWidth = opacity * 1.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };
  
    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };
  
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 15, 25, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = 0; j < particles.length; j++) {
          if (i !== j) {
            particles[i].attract(particles[j]);
          }
        }
        particles[i].update();
      }
      
      drawConnections();
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
  
    resizeCanvas();
    init();
    animate();
  
    window.addEventListener('resize', () => {
      resizeCanvas();
      init();
    });
  
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "es" ? "en" : "es"));
  };

  useEffect(() => {
    document.title = "3 Devs Solutions";
  }, []);

  const toggleExpand = (index) => {

    if (expandedCard === index) {
      setExpandedCard(null); // Cierra la tarjeta si ya está abierta
    } else {
      setExpandedCard(index); // Abre la tarjeta clickeada
    }
  };

  return (
    <div className="page-container" id="inicio">
      {isScrolled && (
        <button
          className="scroll-to-top-button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <FontAwesomeIcon icon={faAngleUp} />
        </button>
      )}

      <div className="hero-container">
        <canvas 
          ref={canvasRef} 
          className="particles-canvas"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1
          }}
        />
        
        <div className="lottie-animation-container">
          <DotLottieReact
            src="https://lottie.host/27615f6b-e468-45da-a344-0c0be8dc3a38/Z9R0OeBeXF.lottie"
            loop
            autoplay
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              height: '100%',
              maxWidth: '800px',
              zIndex: 2,
              opacity: 0.8
            }}
          />
        </div>
        
        <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
          <div className="nav-container">
            <div className="logo-container">
              <img
                src="/img/3devs_lg.png"
                alt="Logo"
                className={`logo ${isScrolled ? "logo-scrolled" : ""}`}
              />
            </div>
            
            <button
              className={`hamburger ${isMenuOpen ? "open" : ""}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
            
            <div className={`nav-links-container ${isMenuOpen ? "open" : ""}`}>
              <ul className="nav-links">
                <li><a href="#inicio" onClick={() => setIsMenuOpen(false)} className="nav-link">{language === "es" ? "Inicio" : "Home"}</a></li>
                <li><a href="#nosotros" onClick={() => setIsMenuOpen(false)} className="nav-link">{language === "es" ? "Nosotros" : "About Us"}</a></li>
                <li><a href="#equipo" onClick={() => setIsMenuOpen(false)} className="nav-link">{language === "es" ? "Equipo" : "Team"}</a></li>
                <li><a href="#stack" onClick={() => setIsMenuOpen(false)} className="nav-link">{language === "es" ? "Stack Tecnológico" : "Tech Stack"}</a></li>
                <li><a href="#servicios" onClick={() => setIsMenuOpen(false)} className="nav-link">{language === "es" ? "Servicios" : "Services"}</a></li>
                <li><a href="#contacto" onClick={() => setIsMenuOpen(false)} className="nav-link">{language === "es" ? "Contacto" : "Contact"}</a></li>
                <li className="language-switcher">
                  <button onClick={toggleLanguage} className="language-button" aria-label="Change language">
                    <img
                      src={language === "es" ? usFlag : esFlag}
                      alt={language === "es" ? "English" : "Español"}
                      className="flag-icon"
                    />
                    <span className="language-text">{language === "es" ? "EN" : "ES"}</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="hero-content">
          <div className="overlay">
            <h1 className="main-title">
              {typedText.split('').map((char, index) => (
                <span key={index} className="char">
                  {char === '\n' ? <br /> : char}
                  {index === typedText.length - 1 && showCursor && <span className="typing-cursor">|</span>}
                </span>
              ))}
            </h1>
            <p className="subtitle">{translations[language].subtitle}</p>
            <div className="cta-buttons">
              <a href="#contacto" className="cta-button primary">
                {language === "es" ? "Contáctanos" : "Contact Us"}
              </a>
              <a href="#servicios" className="cta-button secondary">
                {language === "es" ? "Nuestros Servicios" : "Our Services"}
              </a>
            </div>
          </div>
        </div>
      </div>

      <section className="about-section" id="nosotros">
        <div className="about-content">
          <h2>{translations[language].aboutTitle}</h2>
          <div className="info-cards">
            <div className="info-card">
              <div className="info-icon-container">
                <FontAwesomeIcon icon={faBullseye} className="info-icon" />
              </div>
              <p dangerouslySetInnerHTML={{ __html: translations[language].aboutText1 }} />
            </div>

            <div className="info-card">
              <div className="info-icon-container">
                <FontAwesomeIcon icon={faCogs} className="info-icon" />
              </div>
              <p dangerouslySetInnerHTML={{ __html: translations[language].aboutText2 }} />
            </div>

            <div className="info-card">
              <div className="info-icon-container">
                <FontAwesomeIcon icon={faHandshake} className="info-icon" />
              </div>
              <p dangerouslySetInnerHTML={{ __html: translations[language].aboutText3 }} />
            </div>

            <div className="info-card">
              <div className="info-icon-container">
                <FontAwesomeIcon icon={faUsers} className="info-icon" />
              </div>
              <p dangerouslySetInnerHTML={{ __html: translations[language].aboutText4 }} />
            </div>
          </div>
        </div>
      </section>


      <section className="team-section" id="equipo">
      <h2>{translations[language].teamTitle}</h2>
      <p className="sub-title">{translations[language].teamSubtitle}</p>
      <div className="cards-container">
        {developersData(language).map((dev, index) => (
          <div
            key={index}
            className={`card ${expandedCard === index ? "expanded" : ""}`}
          >
            <div className="card-content">
              <div className="avatar-container">
                <img src={dev.img} alt={dev.name} className="avatar" />
              </div>
              <h3 className="name">{dev.name}</h3>
              <p className="role">{dev.role}</p>
              
              {expandedCard === index && (
                <div className="expandable-content">
                  <ul className="info">
                    {dev.info.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                  <div className="social-icons">
                    <a href={dev.linkedin} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
                    </a>
                    <a href={dev.instagram} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faInstagram} className="social-icon" />
                    </a>
                  </div>
                </div>
              )}
              
              <button 
                className="more-btn"
                onClick={() => toggleExpand(index)}
              >
                {expandedCard === index 
                  ? (language === "es" ? "Menos" : "Less") 
                  : (language === "es" ? "Más" : "More")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>

      <section className="tech-sphere-section" id="stack">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="title-gradient">{translations[language].stackTitle}</span>
            </h2>
            <p className="section-subtitle">{translations[language].stackSubtitle}</p>
          </div>
          
          <div className="tech-sphere-container">
            <div className="tech-sphere-wrapper">
              <div className="tech-sphere">
                {technologies.map((tech, index) => {
                  const angle = (360 / technologies.length) * index;
                  return (
                    <div
                      key={tech.name}
                      className={`tech-node ${tech.category}`}
                      style={{
                        transform: `rotateY(${angle}deg) translateZ(200px)`
                      }}
                      onClick={() => showTechDetails(tech)}
                    >
                      <div className="tech-icon">
                        <img src={tech.icon} alt={tech.name} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="tech-info-panel-container">
              <div className="tech-info-panel">
                <div className="category-selector">
                  <button 
                    className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`} 
                    onClick={() => filterTech('all')}
                  >
                    {language === "es" ? "Todos" : "All"}
                  </button>
                  <button 
                    className={`category-btn ${activeCategory === 'frontend' ? 'active' : ''}`} 
                    onClick={() => filterTech('frontend')}
                  >
                    Frontend
                  </button>
                  <button 
                    className={`category-btn ${activeCategory === 'backend' ? 'active' : ''}`} 
                    onClick={() => filterTech('backend')}
                  >
                    Backend
                  </button>
                  <button 
                    className={`category-btn ${activeCategory === 'database' ? 'active' : ''}`} 
                    onClick={() => filterTech('database')}
                  >
                    {language === "es" ? "Base de Datos" : "Database"}
                  </button>
                  <button 
                    className={`category-btn ${activeCategory === 'tools' ? 'active' : ''}`} 
                    onClick={() => filterTech('tools')}
                  >
                    {language === "es" ? "Herramientas" : "Tools"}
                  </button>
                </div>
                
                <div className="tech-details">
                  {!selectedTech ? (
                    <>
                      <div className="tech-grid">
                        {filteredTechs.map((tech, i) => (
                          <div 
                            key={`tech-${i}`} 
                            className={`tech-grid-item ${tech.category}`}
                            onClick={() => showTechDetails(tech)}
                          >
                            <div className="tech-grid-icon">
                              <img src={tech.icon} alt={tech.name} />
                            </div>
                            <div className="tech-grid-name">{tech.name}</div>
                          </div>
                        ))}
                      </div>
                      <div className="select-tech-prompt">
                        {language === "es" ? "Selecciona una tecnología para ver detalles" : "Select a technology to see details"}
                      </div>
                    </>
                  ) : (
                    <div className="selected-tech-details">
                      <h3 className="tech-name">{selectedTech.name}</h3>
                      <p className="tech-description">
                        {selectedTech.description || 
                          (language === "es" ? "No hay descripción disponible" : "No description available")}
                      </p>
                      <div className="skill-meter">
                        <div className="skill-level">
                          <span className="skill-label">
                            {language === "es" ? "Nivel de habilidad:" : "Skill Level:"}
                          </span>
                          <div className="skill-bar">
                            <div 
                              className="skill-progress" 
                              style={{width: `${selectedTech.level}%`}}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <button 
                        className="back-button"
                        onClick={() => setSelectedTech(null)}
                      >
                        {language === "es" ? "Volver" : "Back"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="tech-categories">
            <div className="tech-category-pill frontend">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12 7l5 5-5 5-5-5 5-5z"/>
              </svg>
              {translations[language].frontendTitle || "Frontend"}
              <span className="tech-category-count">
                {technologies.filter(t => t.category === 'frontend').length}
              </span>
            </div>
            
            <div className="tech-category-pill backend">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12 6v12c3.31 0 6-2.69 6-6s-2.69-6-6-6z"/>
              </svg>
              {translations[language].backendTitle || "Backend"}
              <span className="tech-category-count">
                {technologies.filter(t => t.category === 'backend').length}
              </span>
            </div>
            
            <div className="tech-category-pill database">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M4 7v6c0 2.21 3.58 4 8 4s8-1.79 8-4V7"/>
              </svg>
              {translations[language].databaseTitle || "Database"}
              <span className="tech-category-count">
                {technologies.filter(t => t.category === 'database').length}
              </span>
            </div>
            
            <div className="tech-category-pill tools">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12 6v12M6 12h12"/>
              </svg>
              {translations[language].toolsTitle || "DevOps & Tools"}
              <span className="tech-category-count">
                {technologies.filter(t => t.category === 'tools').length}
              </span>
            </div>
          </div>
        </div>
        
        <div className="tech-particles">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="particle"
              style={{
                '--size': `${Math.random() * 6 + 2}px`,
                '--x': `${Math.random() * 100}%`,
                '--y': `${Math.random() * 100}%`,
                '--delay': `${Math.random() * 5}s`,
                '--duration': `${Math.random() * 10 + 10}s`
              }}
            ></div>
          ))}
        </div>
      </section>

      <section className="services-section" id="servicios" ref={el => sectionRefs.current[4] = el}>
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">{translations[language].servicios}</h2>
            <p className="section-subtitle">{translations[language].servicios_subtitle}</p>
          </div>
          
          <div className="services-tabs">
            <div className="tab-buttons">
              {serviciosData[language].map((service, index) => (
                <button
                  key={index}
                  className={`tab-button ${activeService === index ? 'active' : ''}`}
                  onClick={() => setActiveService(index)}
                >
                  <FontAwesomeIcon icon={
                    index === 0 ? faCode : 
                    index === 1 ? faDesktop : 
                    faMobileAlt
                  } />
                  <span>{service.title}</span>
                </button>
              ))}
            </div>
            
            <div className="tab-content">
              <div className="service-details">
                <div className="service-image">
                  <img src={serviciosData[language][activeService].image} alt={serviciosData[language][activeService].title} />
                </div>
                <div className="service-info">
                  <h3>{serviciosData[language][activeService].title}</h3>
                  <p className="service-description">{serviciosData[language][activeService].subtitle}</p>
                  
                  <div className="pros-cons">
                    <div className="pros">
                      <h4>{language === "es" ? "Ventajas" : "Pros"}</h4>
                      <ul>
                        {serviciosData[language][activeService].pros.map((pro, idx) => (
                          <li key={`pro-${idx}`}>
                            <FontAwesomeIcon icon={faCheckCircle} className="pro-icon" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="cons">
                      <h4>{language === "es" ? "Consideraciones" : "Cons"}</h4>
                      <ul>
                        {serviciosData[language][activeService].contras.map((contra, idx) => (
                          <li key={`contra-${idx}`}>
                            <FontAwesomeIcon icon={faExclamationTriangle} className="con-icon" />
                            {contra}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <a
                    href={`https://api.whatsapp.com/send?phone=3564672341&text=¡Hola!%20Estoy%20interesado%20en%20el%20servicio%20de%20${serviciosData[language][activeService].title}.%20¿Podrían%20darme%20más%20información?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="service-cta"
                  >
                    {translations[language].consultar_servicio}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-section" id="contacto">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/img/logo_blanco.png" alt="Logo" className="footer-logo-img" />
            <p className="footer-slogan">{translations[language].footerText}</p>
          </div>
          <div className="footer-contact">
            <h3>{translations[language].contactTitle}</h3>
            <p>Email: 3devs.soluciones@gmail.com</p>
            <p>Teléfono: +54 3564-672341</p>
            <p>Dirección: San Francisco/Rafaela, Argentina</p>
          </div>
          <div className="footer-social">
            <h3>{translations[language].followTitle}</h3>
            <ul>
              <li>
                <a href="https://www.linkedin.com/search/results/all/?heroEntityKey=urn%3Ali%3Aorganization%3A106893326&keywords=3devs%20solutions&origin=ENTITY_SEARCH_HOME_HISTORY&sid=ZMS" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/3devs_solutions/" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} 3 Devs Solutions. {translations[language].copyright}</p>
        </div>
      </footer>
    </div>
  );
};

export default Desarrolladores;