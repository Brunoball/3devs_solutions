import React, { useState, useEffect, useRef } from "react";
import "./Desarrolladores.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faAngleUp, faCheckCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { faBullseye, faCogs, faHandshake, faUsers } from '@fortawesome/free-solid-svg-icons';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const esFlag = "/img/es-flag.png";
const usFlag = "/img/us-flag.png";

const Desarrolladores = () => {
  const [language, setLanguage] = useState("es");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const canvasRef = useRef(null);

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
          // Repulsión cuando están muy cerca
          const angle = Math.atan2(dy, dx);
          this.vx -= Math.cos(angle) * 0.1;
          this.vy -= Math.sin(angle) * 0.1;
        }
      }
  
      update() {
        // Limitar velocidad máxima
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > this.maxSpeed) {
          this.vx = (this.vx / speed) * this.maxSpeed;
          this.vy = (this.vy / speed) * this.maxSpeed;
        }
        
        // Aplicar fricción
        this.vx *= this.friction;
        this.vy *= this.friction;
        
        // Mover partícula
        this.x += this.vx;
        this.y += this.vy;
        
        // Rebote en bordes
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
        // Crear efecto de brillo
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
      
      // Actualizar partículas con atracción gravitatoria
      for (let i = 0; i < particles.length; i++) {
        for (let j = 0; j < particles.length; j++) {
          if (i !== j) {
            particles[i].attract(particles[j]);
          }
        }
        particles[i].update();
      }
      
      // Dibujar conexiones primero (detrás de las partículas)
      drawConnections();
      
      // Luego dibujar partículas
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

  const translations = {
    es: {
      welcome: "Bienvenido a 3 Devs Solutions",
      subtitle: "Innovación, tecnología y soluciones a medida",
      aboutTitle: "Sobre Nosotros",
      trabajos: "Nuestros Trabajos",
      trabajos_subtitle: "Trabajos que reflejan nuestra pasión por la tecnología",
      mas: "Más",
      servicios: "Servicios",
      aboutText1: "En <strong>3 Devs Solutions</strong>, transformamos ideas en <strong>software a medida</strong>, combinando <strong>innovación</strong> y <strong>tecnología</strong> para desarrollar <strong>soluciones eficientes</strong> y adaptadas a cada cliente.",
      aboutText2: "Nos distingue nuestro <strong>compromiso</strong> con la <strong>excelencia</strong> y la <strong>satisfacción del cliente</strong>. Diseñamos <strong>productos de alta calidad</strong> mediante <strong>metodologías ágiles</strong>, optimizando tiempos y garantizando <strong>entregas puntuales</strong>.",
      aboutText3: "Nuestro equipo está formado por <strong>profesionales apasionados</strong>, enfocados en ofrecer <strong>resultados que marquen la diferencia</strong>. Priorizamos la <strong>comunicación</strong> y la <strong>adaptación</strong> a cada desafío para garantizar el <strong>éxito</strong> de cada proyecto.",
      aboutText4: "Entendemos que cada <strong>negocio es único</strong>. Por eso, iniciamos cada desarrollo con un <strong>análisis detallado</strong> de tus necesidades y objetivos, aplicando <strong>tecnología de vanguardia</strong> para <strong>superar expectativas</strong>.",
      teamTitle: "Nuestro Equipo",
      teamSubtitle: "Conoce a los desarrolladores detrás de nuestras soluciones",
      stackTitle: "Stack Tecnológico",
      stackSubtitle: "Tecnologías y herramientas que utilizamos para desarrollar soluciones eficientes.",
      contactTitle: "Contacto",
      followTitle: "Síguenos",
      footerText: "Innovación, tecnología y soluciones a medida",
      copyright: "Todos los derechos reservados.",
      servicios_subtitle: "Ofrecemos soluciones personalizadas para satisfacer tus necesidades tecnológicas",
      desarrollo_web: "Desarrollo Web",
      desarrollo_web_subtitle: "Desarrollo de sitios web modernos, funcionales y optimizados.",
      desarrollo_web_pros: [
        "Accesible desde cualquier dispositivo con internet.",
        "Fácil mantenimiento y escalabilidad.",
        "No requiere instalación en los dispositivos del usuario.",
        "Mayor visibilidad y captación de clientes.",
      ],
      desarrollo_web_contras: [
        "El tiempo de desarrollo varía según el proyecto.",
        "Requiere servidores para su correcto funcionamiento.",
      ],
      desarrollo_escritorio: "Desarrollo de Escritorio",
      desarrollo_escritorio_subtitle: "Software eficiente y personalizado para entornos de escritorio.",
      desarrollo_escritorio_pros: [
        "Funciona sin necesidad de conexión a internet.",
        "Mayor rendimiento en tareas exigentes y especializadas.",
        "No depende de servidores externos para su operatividad.",
        "Mayor control y seguridad en el manejo de datos locales.",
      ],
      desarrollo_escritorio_contras: [
        "Uso limitado al dispositivo en el que se instala.",
        "Puede requerir más recursos del sistema.",
        "Necesita instalación y actualizaciones manuales.",
      ],
      desarrollo_movil: "Desarrollo Móvil",
      desarrollo_movil_subtitle: "Aplicaciones para dispositivos móviles adaptadas a tus necesidades.",
      desarrollo_movil_pros: [
        "Fluidez y optimización para pantallas táctiles.",
        "Mejor uso de los recursos del dispositivo.",
        "Funciona sin conexión en varias tareas.",
        "Mayor seguridad y control de datos.",
      ],
      desarrollo_movil_contras: [
        "Depende del sistema operativo.",
        "Puede consumir más almacenamiento y batería.",
        "Requiere descargas y actualizaciones.",
      ],
      consultar_servicio: "Consultar servicio",
    },
    en: {
      welcome: "Welcome to 3 Devs Solutions",
      subtitle: "Innovation, technology, and tailored solutions",
      aboutTitle: "About Us",
      trabajos: "Our Work",
      trabajos_subtitle: "Projects that reflect our passion for technology",
      mas: "More",
      servicios: "Services",
      aboutText1: "At <strong>3 Devs Solutions</strong>, we turn ideas into <strong>custom software</strong>, combining <strong>innovation</strong> and <strong>technology</strong> to develop <strong>efficient solutions</strong> tailored to each client.",
      aboutText2: "We are distinguished by our <strong>commitment</strong> to <strong>excellence</strong> and <strong>customer satisfaction</strong>. We design <strong>high-quality products</strong> using <strong>agile methodologies</strong>, optimizing time and ensuring <strong>on-time deliveries</strong>.",
      aboutText3: "Our team is made up of <strong>passionate professionals</strong> focused on delivering <strong>results that make a difference</strong>. We prioritize <strong>communication</strong> and <strong>adaptability</strong> to each challenge to ensure project <strong>success</strong>.",
      aboutText4: "We understand that every <strong>business is unique</strong>. That's why we start each development with a <strong>detailed analysis</strong> of your needs and objectives, applying <strong>cutting-edge technology</strong> to <strong>exceed expectations</strong>.",
      teamTitle: "Our Team",
      teamSubtitle: "Meet the developers behind our solutions",
      stackTitle: "Technological Stack",
      stackSubtitle: "Technologies and tools we use to develop efficient solutions.",
      contactTitle: "Contact",
      followTitle: "Follow Us",
      footerText: "Innovation, technology, and tailored solutions",
      copyright: "All rights reserved.",
      servicios_subtitle: "We offer tailored solutions to meet your technological needs",
      desarrollo_web: "Web Development",
      desarrollo_web_subtitle: "Development of modern, functional, and optimized websites.",
      desarrollo_web_pros: [
        "Accessible from any device with internet.",
        "Easy maintenance and scalability.",
        "No installation required on user devices.",
        "Greater visibility and customer acquisition.",
      ],
      desarrollo_web_contras: [
        "Development time varies depending on the project.",
        "Requires servers for proper functioning.",
      ],
      desarrollo_escritorio: "Desktop Development",
      desarrollo_escritorio_subtitle: "Efficient and customized software for desktop environments.",
      desarrollo_escritorio_pros: [
        "Works without an internet connection.",
        "Better performance for demanding and specialized tasks.",
        "Does not depend on external servers for operation.",
        "Greater control and security in handling local data.",
      ],
      desarrollo_escritorio_contras: [
        "Limited to the device where it is installed.",
        "May require more system resources.",
        "Requires manual installation and updates.",
      ],
      desarrollo_movil: "Mobile Development",
      desarrollo_movil_subtitle: "Mobile applications tailored to your needs.",
      desarrollo_movil_pros: [
        "Smooth and optimized for touch screens.",
        "Better use of device resources.",
        "Works offline for various tasks.",
        "Greater security and data control.",
      ],
      desarrollo_movil_contras: [
        "Dependent on the operating system.",
        "May consume more storage and battery.",
        "Requires downloads and updates.",
      ],
      consultar_servicio: "Inquire about the service",
    },
  };

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "es" ? "en" : "es"));
  };

  useEffect(() => {
    document.title = "3 Devs Solutions";
  }, []);

  const developers = [
    {
      name: language === "es" ? "Joaquín Mullasano" : "Joaquín Mullasano",
      role: language === "es" ? "Desarrollador de Software" : "Software Developer",
      img: "/img/joa.jpeg",
      info: language === "es" ? [
        "Técnico en Electrónica",
        "Estudiante de tecnicatura universitaria en programación",
        "Experiencia en desarrollo de visión artificial y software",
      ] : [
        "Electronics Technician",
        "Student of University Programming",
        "Experience in artificial vision and software development",
      ],
      linkedin: "https://www.linkedin.com/in/joaquin-mullasano",
      instagram: "https://www.instagram.com/joa.mullasano/",
    },
    {
      name: language === "es" ? "Franco Valverde" : "Franco Valverde",
      role: language === "es" ? "Líder del Equipo de Software" : "Software Team Lead",
      img: "/img/franco.jpeg",
      info: language === "es" ? [
        "Ingeniero en Telecomunicaciones",
        "Técnico en Electrónica",
        "Amplia experiencia en desarrollo de software, sistemas y soluciones tecnológicas",
      ] : [
        "Telecommunications Engineer",
        "Electronics Technician",
        "Extensive experience in software development, systems, and technological solutions",
      ],
      linkedin: "https://www.linkedin.com/in/franco-valverde-b3821b309/",
      instagram: "https://www.instagram.com/francovalver/",
    },
    {
      name: language === "es" ? "Bruno Ballarino" : "Bruno Ballarino",
      role: language === "es" ? "Desarrollador de Software" : "Software Developer",
      img: "/img/Bruno.jpeg",
      info: language === "es" ? [
        "Técnico en Electrónica",
        "Estudiante de tecnicatura superior en desarrollo de software",
        "Experiencia en desarrollo web y soluciones de software",
      ] : [
        "Electronics Technician",
        "Student of Higher Software Development",
        "Experience in web development and software solutions",
      ],
      linkedin: "https://www.linkedin.com/in/bruno-ballarino-8275622b7/",
      instagram: "https://www.instagram.com/ballarinobruno/",
    },
  ];

  const technologies = [
    { name: "HTML5", icon: "/img/html_logo.png", className: "html-style" },
    { name: "CSS3", icon: "/img/css_logo.png", className: "css-style" },
    { name: "Java Script", icon: "/img/js_logo.png", className: "js-style" },
    { name: "React", icon: "/img/react_logo.png", className: "react-style" },
    { name: "PHP", icon: "/img/php_logo.png", className: "php-style" },
    { name: "Python", icon: "/img/py_logo.png", className: "python-style" },
    { name: "Node JS", icon: "/img/node_logo.png", className: "node-style" },
    { name: "SQL", icon: "/img/sql_logo.png", className: "sql-style" },
    { name: "Visual Studio", icon: "/img/visual_logo.png", className: "visual-style" },
    { name: "GitHub", icon: "/img/git_logo.png", className: "git-style" },
  ];

  const trabajos = [
    {
      description: {
        es: "Nuestro equipo desarrolló una plataforma web exclusiva para la asociación LALCEC (San Francisco), diseñada para optimizar la gestión interna de socios y el control de pagos. Esta herramienta es accesible únicamente para los administradores de la institución, asegurando la confidencialidad y seguridad de la información de los miembros.",
        en: "Our team developed an exclusive web platform for the LALCEC association (San Francisco), designed to optimize the internal management of members and payment control. This tool is accessible only to the institution's administrators, ensuring the confidentiality and security of member information."
      }
    }
  ];

  const toggleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
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
            src="https://lottie.host/a83ca3bc-67d3-4b7d-9004-454bb2fb0f32/pGgibeV6UD.lottie"
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
              <span className="title-line">{translations[language].welcome}</span>
            </h1>
            <p className="subtitle">{translations[language].subtitle}</p>
            <div className="cta-buttons">
              <a href="#contacto" className="cta-button primary">{language === "es" ? "Contáctanos" : "Contact Us"}</a>
              <a href="#servicios" className="cta-button secondary">{language === "es" ? "Nuestros Servicios" : "Our Services"}</a>
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
          {developers.map((dev, index) => (
            <div
              key={index}
              className={`card ${expandedIndex === index ? "expanded" : ""}`}
              onClick={() => toggleExpand(index)}
            >
              <img src={dev.img} alt={dev.name} className="avatar" />
              <h3 className="name">{dev.name}</h3>
              <p className="role">{dev.role}</p>
              {expandedIndex === index && (
                <ul className="info">
                  {dev.info.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              )}
              <button className="more-btn">
                {expandedIndex === index ? (language === "es" ? "Menos" : "Less") : (language === "es" ? "Más" : "More")}
              </button>
              {expandedIndex === index && (
                <div className="social-icons">
                  <a href={dev.linkedin} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
                  </a>
                  <a href={dev.instagram} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} className="social-icon" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="tech-stack-section" id="stack">
        <h2>{translations[language].stackTitle}</h2>
        <p className="tech-subtitle">{translations[language].stackSubtitle}</p>
        <div className="tech-stack-grid">
          {technologies.map((tech, index) => (
            <div key={index} className={`tech-card ${tech.className}`}>
              <div className="tech-icon">
                <img src={tech.icon} alt={tech.name} />
              </div>
              <p className="tech-name">{tech.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="servicios" id="servicios">
        <div className="titles-container">
          <h2 className="titulo-serv">{translations[language].servicios}</h2>
          <p className="subtitulo-servicios">{translations[language].servicios_subtitle}</p>
        </div>

        <div className="servicios-container">
          <div className="servicios-card">
            <img src="/img/icono_web.png" className="servicios-img" alt="Desarrollo Web" />
            <h3 className="titulo">{translations[language].desarrollo_web}</h3>
            <p className="subtitulo">{translations[language].desarrollo_web_subtitle}</p>
            <div className="pros-contras-container">
              {translations[language].desarrollo_web_pros.map((pro, index) => (
                <p key={index}>
                  <FontAwesomeIcon icon={faCheckCircle} style={{ color: "green" }} /> {pro}
                </p>
              ))}
              {translations[language].desarrollo_web_contras.map((contra, index) => (
                <p key={index}>
                  <FontAwesomeIcon icon={faExclamationTriangle} style={{ color: "orange" }} /> {contra}
                </p>
              ))}
            </div>
            <div className="servicios-boton-container">
              <a
                href="https://api.whatsapp.com/send?phone=3564672341&text=¡Hola!,%20vengo%20de%20la%20web%20y%20estoy%20interesado%20en%20el%20servicio%20de%20Desarrollo%20Web.%20¿Podrían%20darme%20más%20información?"
                target="_blank"
                rel="noopener noreferrer"
                className="servicios-boton"
              >
                {translations[language].consultar_servicio}
              </a>
            </div>
          </div>

          <div className="servicios-card">
            <img src="/img/icono_escritorio.png" className="servicios-img" alt="Desarrollo de Escritorio" />
            <h3 className="titulo">{translations[language].desarrollo_escritorio}</h3>
            <p className="subtitulo">{translations[language].desarrollo_escritorio_subtitle}</p>
            <div className="pros-contras-container">
              {translations[language].desarrollo_escritorio_pros.map((pro, index) => (
                <p key={index}>
                  <FontAwesomeIcon icon={faCheckCircle} style={{ color: "green" }} /> {pro}
                </p>
              ))}
              {translations[language].desarrollo_escritorio_contras.map((contra, index) => (
                <p key={index}>
                  <FontAwesomeIcon icon={faExclamationTriangle} style={{ color: "orange" }} /> {contra}
                </p>
              ))}
            </div>
            <div className="servicios-boton-container">
              <a
                href="https://api.whatsapp.com/send?phone=3564672341&text=¡Hola!,%20vengo%20de%20la%20web%20y%20estoy%20interesado%20en%20el%20servicio%20de%20Desarrollo%20de%20Escritorio.%20¿Podrían%20darme%20más%20información?"
                target="_blank"
                rel="noopener noreferrer"
                className="servicios-boton"
              >
                {translations[language].consultar_servicio}
              </a>
            </div>
          </div>

          <div className="servicios-card">
            <img src="/img/icono_mov.png" className="servicios-img" alt="Desarrollo Móvil" />
            <h3 className="titulo">{translations[language].desarrollo_movil}</h3>
            <p className="subtitulo">{translations[language].desarrollo_movil_subtitle}</p>
            <div className="pros-contras-container">
              {translations[language].desarrollo_movil_pros.map((pro, index) => (
                <p key={index}>
                  <FontAwesomeIcon icon={faCheckCircle} style={{ color: "green" }} /> {pro}
                </p>
              ))}
              {translations[language].desarrollo_movil_contras.map((contra, index) => (
                <p key={index}>
                  <FontAwesomeIcon icon={faExclamationTriangle} style={{ color: "orange" }} /> {contra}
                </p>
              ))}
            </div>
            <div className="servicios-boton-container">
              <a
                href="https://api.whatsapp.com/send?phone=3564672341&text=¡Hola!,%20vengo%20de%20la%20web%20y%20estoy%20interesado%20en%20el%20servicio%20de%20Desarrollo%20Móvil.%20¿Podrían%20darme%20más%20información?"
                target="_blank"
                rel="noopener noreferrer"
                className="servicios-boton" 
              >
                {translations[language].consultar_servicio}
              </a>
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