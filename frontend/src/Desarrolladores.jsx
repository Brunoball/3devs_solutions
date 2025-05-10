import React, { useState, useEffect, useRef } from "react";
import "./Desarrolladores.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faAngleUp, faCheckCircle, faExclamationTriangle, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faBullseye, faCogs, faHandshake, faUsers, faCode, faMobileAlt, faDesktop } from '@fortawesome/free-solid-svg-icons';
import { HiChevronLeft } from 'react-icons/hi';
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
    {
      name: "HTML5",
      icon: "/img/html_logo.png",
      className: "html-style",
      category: "frontend",
      level: 90,
      description: {
        es: "HTML5 es el lenguaje de marcado estándar para crear y estructurar páginas web. Introduce nuevos elementos semánticos, soporte multimedia nativo y APIs para aplicaciones web complejas. Es la quinta y última versión principal de HTML, compatible con todos los navegadores modernos.",
        en: "HTML5 is the standard markup language for creating and structuring web pages. It introduces new semantic elements, native multimedia support, and APIs for complex web applications. It's the fifth and final major version of HTML, compatible with all modern browsers."
      }
    },
    {
      name: "CSS3",
      icon: "/img/css_logo.png",
      className: "css-style",
      category: "frontend",
      description: {
        es: "CSS3 es la última evolución del lenguaje de hojas de estilo, que permite controlar el diseño y presentación de páginas web. Introduce características como animaciones, transiciones, gradientes, sombras y diseño responsive con media queries, permitiendo crear interfaces modernas y atractivas.",
        en: "CSS3 is the latest evolution of the style sheet language, allowing control over web page layout and presentation. It introduces features like animations, transitions, gradients, shadows, and responsive design with media queries, enabling modern and attractive interfaces."
      }
    },
    {
      name: "JavaScript",
      icon: "/img/java_logo.png",
      className: "js-style",
      category: "frontend",
      description: {
        es: "JavaScript es un lenguaje de programación interpretado que permite agregar interactividad a sitios web. Como lenguaje del lado del cliente, se ejecuta en el navegador y permite manipular el DOM, gestionar eventos y comunicarse con servidores. Es fundamental para el desarrollo web moderno.",
        en: "JavaScript is an interpreted programming language that adds interactivity to websites. As a client-side language, it runs in the browser and allows DOM manipulation, event handling, and server communication. It's fundamental for modern web development."
      }
    },
    {
      name: "React",
      icon: "/img/react_logo.png",
      className: "react-style",
      category: "frontend",
      level: 75,
      description: {
        es: "React es una biblioteca JavaScript desarrollada por Facebook para construir interfaces de usuario interactivas. Utiliza un enfoque basado en componentes y un DOM virtual para un rendimiento óptimo. Es ideal para aplicaciones de una sola página (SPA) y se puede combinar con otras bibliotecas o frameworks.",
        en: "React is a JavaScript library developed by Facebook for building interactive user interfaces. It uses a component-based approach and virtual DOM for optimal performance. It's ideal for single-page applications (SPA) and can be combined with other libraries or frameworks."
      }
    },
    {
      name: "PHP",
      icon: "/img/php_logo.png",
      className: "php-style",
      category: "backend",
      level: 70,
      description: {
        es: "PHP es un lenguaje de scripting del lado del servidor ampliamente utilizado para el desarrollo web. Se integra fácilmente con HTML y es compatible con la mayoría de servidores y bases de datos. Es especialmente conocido por su uso en sistemas de gestión de contenidos como WordPress.",
        en: "PHP is a widely used server-side scripting language for web development. It integrates easily with HTML and is compatible with most servers and databases. It's especially known for its use in content management systems like WordPress."
      }
    },
    {
      name: "Python",
      icon: "/img/py_logo.png",
      className: "python-style",
      category: "backend",
      level: 65,
      description: {
        es: "Python es un lenguaje de programación versátil y de alto nivel, conocido por su sintaxis clara y legible. Es ideal para desarrollo web (Django, Flask), análisis de datos, inteligencia artificial y automatización. Su amplia comunidad y ecosistema de librerías lo hacen muy popular.",
        en: "Python is a versatile, high-level programming language known for its clear and readable syntax. It's ideal for web development (Django, Flask), data analysis, artificial intelligence, and automation. Its large community and library ecosystem make it very popular."
      }
    },
    {
      name: "Node JS",
      icon: "/img/node_logo.png",
      className: "node-style",
      category: "backend",
      level: 60,
      description: {
        es: "Node.js es un entorno de ejecución de JavaScript del lado del servidor basado en el motor V8 de Chrome. Permite desarrollar aplicaciones escalables y de alta performance usando JavaScript tanto en frontend como backend, facilitando el desarrollo full-stack con un solo lenguaje.",
        en: "Node.js is a server-side JavaScript runtime built on Chrome's V8 engine. It enables scalable, high-performance applications using JavaScript for both frontend and backend, facilitating full-stack development with a single language."
      }
    },
    {
      name: "SQL",
      icon: "/img/database_lg.png",
      className: "sql-style",
      category: "database",
      level: 75,
      description: {
        es: "SQL (Structured Query Language) es el lenguaje estándar para gestionar y manipular bases de datos relacionales. Permite crear, leer, actualizar y eliminar datos (CRUD), así como definir estructuras de bases de datos y establecer relaciones entre tablas.",
        en: "SQL (Structured Query Language) is the standard language for managing and manipulating relational databases. It allows creating, reading, updating, and deleting data (CRUD), as well as defining database structures and establishing table relationships."
      }
    },
    {
      name: "Visual Studio Code",
      icon: "/img/vs_studio.png",
      className: "visual-style",
      category: "tools",
      level: 80,
      description: {
        es: "Visual Studio Code es un editor de código fuente ligero pero potente desarrollado por Microsoft. Ofrece soporte para múltiples lenguajes, depuración integrada, control de versiones Git, extensiones personalizables y un terminal integrado, siendo uno de los editores más populares para desarrolladores.",
        en: "Visual Studio Code is a lightweight yet powerful source code editor developed by Microsoft. It offers multi-language support, built-in debugging, Git version control, customizable extensions, and an integrated terminal, being one of the most popular editors for developers."
      }
    },
    {
      name: "GitHub",
      icon: "/img/github.png",
      className: "git-style",
      category: "tools",
      level: 70,
      description: {
        es: "GitHub es una plataforma de desarrollo colaborativo basada en Git que permite alojar y revisar código, gestionar proyectos y construir software en equipo. Ofrece características como pull requests, issues, GitHub Actions para CI/CD, y es el mayor host de código fuente del mundo.",
        en: "GitHub is a Git-based collaborative development platform for hosting and reviewing code, managing projects, and team software building. It offers features like pull requests, issues, GitHub Actions for CI/CD, and is the world's largest source code host."
      }
    },
    {
      name: "Git",
      icon: "/img/gt_logo.png",
      className: "git-style",
      category: "tools",
      level: 70,
      description: {
        es: "Git es un sistema de control de versiones distribuido que permite gestionar el historial de cambios en proyectos de software. Facilita la colaboración entre desarrolladores, el manejo de ramas (branching) y la fusión de código (merging), siendo esencial en el desarrollo moderno.",
        en: "Git is a distributed version control system for managing change history in software projects. It facilitates developer collaboration, branching, and code merging, being essential in modern development."
      }
    }
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
    setExpandedCard(expandedCard === index ? null : index);
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
                  <img 
                    src={dev.img} 
                    alt={dev.name} 
                    className="avatar"
                    loading="lazy"
                    width={100}
                    height={100}
                  />
                </div>
                <h3 className="name">{dev.name}</h3>
                <p className="role">{dev.role}</p>
                
                <div className="expandable-content">
                  <ul className="info">
                    {dev.info.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                  <div className="social-icons">
                    <a 
                      href={dev.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`${dev.name} LinkedIn`}
                    >
                      <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
                    </a>
                    <a 
                      href={dev.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`${dev.name} Instagram`}
                    >
                      <FontAwesomeIcon icon={faInstagram} className="social-icon" />
                    </a>
                  </div>
                </div>
                
                <button 
                  className="more-btn"
                  onClick={() => toggleExpand(index)}
                  aria-expanded={expandedCard === index}
                  aria-label={expandedCard === index ? "Contraer información" : "Expandir información"}
                >
                  <FontAwesomeIcon 
                    icon={faChevronDown} 
                    className={`chevron-icon ${expandedCard === index ? "expanded" : ""}`} 
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>











































      <section className="tech-sphere-section" id="stack">
        <div className="section-container Satack">
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
                        <img src={tech.icon} alt={tech.name} style={{ filter: 'brightness(0) invert(1)' }} />
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
                      {filteredTechs.length === technologies.length ? (
                        <div className="initial-state">
                          <h3 className="initial-title">
                            {language === "es" ? "Explora mi stack tecnológico" : "Explore my tech stack"}
                          </h3>
                          <p className="initial-description">
                            {language === "es" ? 
                              "Selecciona una categoría o haz clic en cualquier tecnología para ver detalles" : 
                              "Select a category or click on any technology to see details"}
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="tech-grid">
                            {filteredTechs.map((tech, i) => (
                              <div 
                                key={`tech-${i}`} 
                                className={`tech-grid-item ${tech.category}`}
                                onClick={() => showTechDetails(tech)}
                              >
                                <div className="tech-grid-icon">
                                  <img src={tech.icon} alt={tech.name} style={{ filter: 'brightness(0) invert(1)' }} />
                                </div>
                                <div className="tech-grid-name">{tech.name}</div>
                              </div>
                            ))}
                          </div>
                          <div className="select-tech-prompt">
                            {language === "es" ? "Selecciona una tecnología para ver detalles" : "Select a technology to see details"}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="selected-tech-details">
                      <h3 className="tech-name">{selectedTech.name}</h3>
                      <p className="tech-description">
                        {selectedTech.description[language] || 
                          (language === "es" ? "No hay descripción disponible" : "No description available")}
                      </p>

                      <button 
                        className="back-button"
                        onClick={() => setSelectedTech(null)}
                      >
                        <HiChevronLeft className="back-icon" />
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
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
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