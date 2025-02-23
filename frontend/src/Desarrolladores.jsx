import React, { useState, useEffect } from "react";
import "./Desarrolladores.css"; // Importa los estilos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCheckCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";


// Importa las banderas (puedes usar imágenes o íconos)
const esFlag = "/img/es-flag.png";
const usFlag = "/img/us-flag.png";


const Desarrolladores = () => {
  const [language, setLanguage] = useState("es"); // Estado para manejar el idioma
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [navbarBackground, setNavbarBackground] = useState(false);

  // Textos en español e inglés
  const translations = {
    es: {
      welcome: "Bienvenido a 3 Devs Solutions",
      subtitle: "Innovación, tecnología y soluciones a medida",
      aboutTitle: "Sobre Nosotros",
      trabajos: "Nuestros Trabajos",
      trabajos_subtitle: "Trabajos que reflejan nuestra pasión por la tecnología",
      mas: "Más",
      servicios: "Servicios",
      aboutText1:
        "En <strong>3 Devs Solutions</strong>, nos especializamos en el desarrollo de software a medida, combinando innovación y tecnología para ofrecer soluciones eficientes y personalizadas que se adaptan a las necesidades específicas de cada cliente.",
      aboutText2:
        "Fundada en 2024, nuestra misión es transformar ideas en realidad a través de soluciones tecnológicas que impulsen el crecimiento y la competitividad de tu negocio. Nos enorgullece ser un aliado estratégico para clientes que buscan optimizar sus procesos y alcanzar sus objetivos de manera eficaz.",
      aboutText3:
        "Nuestro equipo está formado por estudiantes y profesionales en programación, todos comprometidos con la excelencia y la satisfacción del cliente. Trabajamos con metodologías ágiles para garantizar que cada proyecto se entregue a tiempo y con la más alta calidad.",
      aboutText4:
        "En <strong>3 Devs Solutions</strong>, creemos que cada negocio es único. Por eso, adoptamos un enfoque personalizado para cada proyecto, comenzando con un análisis detallado de tus necesidades y objetivos. Utilizamos tecnologías de vanguardia y las mejores prácticas de la industria para garantizar que nuestras soluciones no solo cumplan, sino que superen tus expectativas.",
      aboutText5:
        "Ya sea que necesites una plataforma de comercio electrónico, un sistema de gestión empresarial o una aplicación móvil innovadora, estamos aquí para ayudarte a alcanzar el éxito en la era digital.",
      aboutText6:
        "<strong>¡Contáctanos hoy mismo y descubre cómo podemos transformar tu negocio!</strong>",
      teamTitle: "Nuestro Equipo",
      teamSubtitle: "Conoce a los desarrolladores detrás de nuestras soluciones",
      stackTitle: "Stack Tecnológico",
      stackSubtitle:
        "Tecnologías y herramientas que utilizamos para desarrollar soluciones eficientes.",
      contactTitle: "Contacto",
      followTitle: "Síguenos",
      footerText: "Innovación, tecnología y soluciones a medida",
      copyright: "Todos los derechos reservados.",
  
      // Nuevas traducciones para la sección de Servicios
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
      aboutText1:
        "At <strong>3 Devs Solutions</strong>, we specialize in custom software development, combining innovation and technology to deliver efficient and personalized solutions tailored to each client's specific needs.",
      aboutText2:
        "Founded in 2024, our mission is to turn ideas into reality through technological solutions that drive growth and competitiveness for your business. We are proud to be a strategic ally for clients seeking to optimize their processes and achieve their goals effectively.",
      aboutText3:
        "Our team is made up of students and programming professionals, all committed to excellence and customer satisfaction. We work with agile methodologies to ensure that each project is delivered on time and with the highest quality.",
      aboutText4:
        "At <strong>3 Devs Solutions</strong>, we believe that every business is unique. That's why we adopt a personalized approach for each project, starting with a detailed analysis of your needs and objectives. We use cutting-edge technologies and industry best practices to ensure that our solutions not only meet but exceed your expectations.",
      aboutText5:
        "Whether you need an e-commerce platform, a business management system, or an innovative mobile application, we are here to help you achieve success in the digital age.",
      aboutText6:
        "<strong>Contact us today and discover how we can transform your business!</strong>",
      teamTitle: "Our Team",
      teamSubtitle: "Meet the developers behind our solutions",
      stackTitle: "Technological Stack",
      stackSubtitle:
        "Technologies and tools we use to develop efficient solutions.",
      contactTitle: "Contact",
      followTitle: "Follow Us",
      footerText: "Innovation, technology, and tailored solutions",
      copyright: "All rights reserved.",
  
      // Nuevas traducciones para la sección de Servicios
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



  

  const trabajos = [
    {
      description: {
        es: "Nuestro equipo desarrolló una plataforma web exclusiva para la asociación LALCEC (San Francisco), diseñada para optimizar la gestión interna de socios y el control de pagos. Esta herramienta es accesible únicamente para los administradores de la institución, asegurando la confidencialidad y seguridad de la información de los miembros.",
        en: "Our team developed an exclusive web platform for the LALCEC association (San Francisco), designed to optimize the internal management of members and payment control. This tool is accessible only to the institution's administrators, ensuring the confidentiality and security of member information."
      }
    }
  ];
  
  // Cambiar idioma
  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "es" ? "en" : "es"));
  };

  useEffect(() => {
    document.title = "3 Devs Solutions"; // Cambia el título de la página
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarBackground(true);
      } else {
        setNavbarBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const developers = [
    {
      name: language === "es" ? "Joaquín Mullasano" : "Joaquín Mullasano",
      role: language === "es" ? "Desarrollador de Software" : "Software Developer",
      img: "/img/dev1.avif",
      info:
        language === "es"
          ? [
              "Técnico en Electrónica",
              "Estudiante de tecnicatura universitaria en programación",
              "Experiencia en desarrollo de visión artificial y software",
            ]
          : [
              "Electronics Technician",
              "Student of University Programming",
              "Experience in artificial vision and software development",
            ],
    },
    {
      name: language === "es" ? "Franco Valverde" : "Franco Valverde",
      role: language === "es" ? "Líder del Equipo de Software" : "Software Team Lead",
      img: "/img/dev1.avif",
      info:
        language === "es"
          ? [
              "Ingeniero en Telecomunicaciones",
              "Técnico en Electrónica",
              "Amplia experiencia en desarrollo de software, sistemas y soluciones tecnológicas",
            ]
          : [
              "Telecommunications Engineer",
              "Electronics Technician",
              "Extensive experience in software development, systems, and technological solutions",
            ],
    },
    {
      name: language === "es" ? "Bruno Ballarino" : "Bruno Ballarino",
      role: language === "es" ? "Desarrollador de Software" : "Software Developer",
      img: "/img/dev1.avif",
      info:
        language === "es"
          ? [
              "Técnico en Electrónica",
              "Estudiante de tecnicatura superior en desarrollo de software",
              "Experiencia en desarrollo web y soluciones de software",
            ]
          : [
              "Electronics Technician",
              "Student of Higher Software Development",
              "Experience in web development and software solutions",
            ],
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

  return (
    <div className="page-container" id="inicio">



      
      {/* Sección de Navegación */}
      <div className="background-container" style={{ backgroundImage: "url('/img/img_menu.jpg')" }}>
        <nav className={`navbar ${navbarBackground ? "navbar-scrolled" : ""}`}>
          <div className="logo-container">
            <img src="/img/logo_negro.png" alt="Logo" className={`logo ${navbarBackground ? "logo-scrolled" : ""}`} />
          </div>
          <ul className="nav-links">
            <li><a href="#inicio">{language === "es" ? "Inicio" : "Home"}</a></li>
            <li><a href="#nosotros">{language === "es" ? "Nosotros" : "About Us"}</a></li>
            <li><a href="#stack">{language === "es" ? "Stack Tecnológico" : "Tech Stack"}</a></li>
            <li><a href="#trabajos">{language === "es" ? "Trabajos" : "jobs"}</a></li>
            <li><a href="#servicios">{language === "es" ? "Servicios" : "Services"}</a></li>
            <li><a href="#contacto">{language === "es" ? "Contacto" : "Contact"}</a></li>

            <li>
              <button onClick={toggleLanguage} className="language-button">
                <img
                  src={language === "es" ? usFlag : esFlag}
                  alt={language === "es" ? "Español" : "English"}
                  className="flag-icon"
                />
                <span className="language-text">{language === "es" ? "EN" : "ES"}</span> {/* Add the language text here */}
              </button>
            </li>
          </ul>
        </nav>
        <div className="overlay" id="inicio">
          <h1 className="main-title">{translations[language].welcome}</h1>
          <p className="subtitle">{translations[language].subtitle}</p>
        </div>
      </div>

















      {/* Sección de Nosotros */}
      <section className="about-section">
        <div className="about-content">
          <h2>{translations[language].aboutTitle}</h2>
          <p dangerouslySetInnerHTML={{ __html: translations[language].aboutText1 }} />
          <p>{translations[language].aboutText2}</p>
          <p>{translations[language].aboutText3}</p>
          <p dangerouslySetInnerHTML={{ __html: translations[language].aboutText4 }} />
          <p>{translations[language].aboutText5}</p>
          <p dangerouslySetInnerHTML={{ __html: translations[language].aboutText6 }} />
        </div>
      </section>

      {/* Sección de Equipo */}
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
            </div>
          ))}
        </div>
      </section>

      {/* Sección de Stack Tecnológico */}
      <section className="tech-stack-section">
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
      


















      {/* Sección de trabajos */}
      <section className="trabajos-section" id="trabajos">
        <h2 className="trabajos-title">
          {translations[language].trabajos}
        </h2>
        {/* Subtítulo agregado */}
        <p className="trabajos-subtitle">
          {translations[language].trabajos_subtitle}
        </p>

        
        <div className="box_work"> 
          <div className="trabajos-container">
            {trabajos.map((trabajo, index) => (
              <div key={index} className="trabajos-card">
                {/* Imagen con difuminado */}
                <img src="/img/lalcec_app.png" alt="Imagen" className="trabajo-img" />
                
                {/* Contenedor con logo y texto superpuestos */}
                <div className="overlay-container">
                  <img src="/img/logo_lalcec.png" alt="Logo LALCEC" className="overlay-logo" />
                  <span className="overlay-text">LALCEC</span>
                </div>
                
                <p>{trabajo.description[language]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

























      <section className="servicios">
        <div className="titles-container">
          <h2 className="titulo-serv">{translations[language].servicios}</h2>
          <p className="subtitulo-servicios">{translations[language].servicios_subtitle}</p>
        </div>

        <div className="servicios-container">
          {/* Tarjeta de Desarrollo Web */}
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
                href="https://api.whatsapp.com/send?phone=3492253860&text=¡Hola!,%20vengo%20de%20la%20web%20y%20estoy%20interesado%20en%20el%20servicio%20de%20Desarrollo%20Web.%20¿Podrían%20darme%20más%20información?"
                target="_blank"
                rel="noopener noreferrer"
                className="servicios-boton"
              >
                {translations[language].consultar_servicio}
              </a>
            </div>
          </div>

          {/* Tarjeta de Desarrollo de Escritorio */}
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
                href="https://api.whatsapp.com/send?phone=3492253860&text=¡Hola!,%20vengo%20de%20la%20web%20y%20estoy%20interesado%20en%20el%20servicio%20de%20Desarrollo%20de%20Escritorio.%20¿Podrían%20darme%20más%20información?"
                target="_blank"
                rel="noopener noreferrer"
                className="servicios-boton"
              >
                {translations[language].consultar_servicio}
              </a>
            </div>
          </div>

          {/* Tarjeta de Desarrollo Móvil */}
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
                href="https://api.whatsapp.com/send?phone=3492253860&text=¡Hola!,%20vengo%20de%20la%20web%20y%20estoy%20interesado%20en%20el%20servicio%20de%20Desarrollo%20Móvil.%20¿Podrían%20darme%20más%20información?"
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






























































      {/* Sección del Footer */}
      <footer className="footer-section" id="contacto">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/img/logo_blanco.png" alt="Logo" className="footer-logo-img" />
            <p className="footer-slogan">{translations[language].footerText}</p>
          </div>
          <div className="footer-contact">
            <h3>{translations[language].contactTitle}</h3>
            <p>Email: 3devs.soluciones@gmail.com</p>
            <p>Teléfono: +54 9 1234 5678</p>
            <p>Dirección: San Francisco/Rafaela, Argentina</p>
          </div>
          <div className="footer-social">
            <h3>{translations[language].followTitle}</h3>
            <ul>
              <li>
                <a href="https://linkedin.com/company/3devsolutions" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </li>
              <li>
                <a href="https://instagram.com/3devsolutions" target="_blank" rel="noopener noreferrer">
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