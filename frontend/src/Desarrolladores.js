import React, { useState, useEffect } from "react";
import "./Desarrolladores.css"; // Importa los estilos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";


const Desarrolladores = () => {

  useEffect(() => {
    document.title = "3 Devs Solutions"; // Aquí cambias el título
  }, []);
  
  const developers = [
    { 
      name: "Joaquín Mullasano", 
      role: "Software Developer", 
      img: "/img/dev1.avif", 
      info: [
        "Técnico en Electrónica",
        "Estudiante de tecnicatura universitaria en programación",
        "Experiencia en desarrollo de visión artificial y software"
      ]
    },
    { 
      name: "Franco Valverde", 
      role: "Software Team Lead", 
      img: "/img/dev1.avif", 
      info: [
        "Ingeniero en Telecomunicaciones",
        "Técnico en Electrónica",
        "Amplia experiencia en desarrollo de software, sistemas y soluciones tecnológicas"
      ]
    },
    { 
      name: "Bruno Ballarino", 
      role: "Software Developer", 
      img: "/img/dev1.avif",
      info: [
        "Técnico en Electrónica",
        "Estudiante de tecnicatura superior en desarrollo de software",
        "Experiencia en desarrollo web y soluciones de software"
      ]
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

  const services = [
    {
      title: "Desarrollo de software a medida",
      description: "Creación de aplicaciones y sistemas completamente adaptados a las necesidades de tu negocio, mejorando la eficiencia y productividad.",
    },
    {
      title: "Integración de sistemas",
      description: "Conectamos y optimizamos todos tus sistemas y plataformas para garantizar su funcionamiento eficiente y sin fallos.",
    },
    {
      title: "Desarrollo de aplicaciones web y móviles",
      description: "Desarrollamos aplicaciones web y móviles intuitivas y funcionales, con interfaces de usuario atractivas y experiencia fluida.",
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);
  const [navbarBackground, setNavbarBackground] = useState(false);

  const toggleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Cambia 50 por la cantidad de scroll que desees
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

  return (
    <div className="page-container">
      {/* Sección de Navegación */}
      <div className="background-container" style={{ backgroundImage: "url('/img/img_menu.jpg')" }}>
        <nav className={`navbar ${navbarBackground ? "navbar-scrolled" : ""}`}>
          <div className="logo-container">
            <img src="/img/logo_negro.png" alt="Logo" className={`logo ${navbarBackground ? "logo-scrolled" : ""}`} />
          </div>
          <ul className="nav-links">
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#nosotros">Nosotros</a></li>
            <li><a href="#stack">Stack Tecnológico</a></li>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </nav>
        <div className="overlay" id="inicio">
          <h1 className="main-title">Bienvenido a 3 Devs Solutions</h1>
          <p className="subtitle">Innovación, tecnología y soluciones a medida</p>
        </div>
      </div>

      {/* Sección de Nosotros */}
      <section className="about-section" id="nosotros">
        <div className="about-content">
          <h2>Sobre Nosotros</h2>
          <p>
            En <strong>3 Devs Solutions</strong>, nos especializamos en el desarrollo de software a medida,
            combinando innovación y tecnología para ofrecer soluciones eficientes y personalizadas
            que se adaptan a las necesidades específicas de cada cliente.
          </p>
          <p>
            Fundada en 2024, nuestra misión es transformar ideas en realidad a través
            de soluciones tecnológicas que impulsen el crecimiento y la competitividad de tu negocio.
            Nos enorgullece ser un aliado estratégico para clientes que buscan optimizar sus procesos
            y alcanzar sus objetivos de manera eficaz.
          </p>
          <p>
            Nuestro equipo está formado por estudiantes y profesionales en programación, todos comprometidos 
            con la excelencia y la satisfacción del cliente. Trabajamos con metodologías ágiles para garantizar 
            que cada proyecto se entregue a tiempo y con la más alta calidad.
          </p>

          <p>
            En <strong>3 Devs Solutions</strong>, creemos que cada negocio es único. Por eso, adoptamos
            un enfoque personalizado para cada proyecto, comenzando con un análisis detallado de tus
            necesidades y objetivos. Utilizamos tecnologías de vanguardia y las mejores prácticas de la
            industria para garantizar que nuestras soluciones no solo cumplan, sino que superen tus
            expectativas.
          </p>
          <p>
            Ya sea que necesites una plataforma de comercio electrónico, un sistema de gestión empresarial
            o una aplicación móvil innovadora, estamos aquí para ayudarte a alcanzar el éxito en la era
            digital.
          </p>
          <p>
            <strong>¡Contáctanos hoy mismo y descubre cómo podemos transformar tu negocio!</strong>
          </p>
        </div>
      </section>


      {/* Sección de Equipo */}
      <section className="team-section" id="equipo">
        <h2>Nuestro Equipo</h2>
        <h3 className="sub-title">Conoce a los desarrolladores detrás de nuestras soluciones</h3> {/* Subtítulo */}
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
                {expandedIndex === index ? "Menos" : "Más"}
              </button>
            </div>
          ))}
        </div>
      </section>



      {/* Sección de Stack Tecnológico */}
      <section className="tech-stack-section" id="stack">
        <h2>Stack Tecnológico</h2>
        <p className="tech-subtitle">
          Tecnologías y herramientas que utilizamos para desarrollar soluciones eficientes.
        </p>
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




      {/* Sección del Footer */}
      <footer className="footer-section" id="contacto">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/img/logo_blanco.png" alt="Logo" className="footer-logo-img" />
            <p className="footer-slogan">Innovación, tecnología y soluciones a medida</p>
          </div>
          <div className="footer-contact">
            <h3>Contacto</h3>
            <p>Email: 3devs.soluciones@gmail.com</p>
            <p>Teléfono: +54 9 1234 5678</p>
            <p>Dirección: San Francisco/Rafaela, Argentina</p>
          </div>



          <div className="footer-social">
            <h3>Síguenos</h3>
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
          <p>&copy; {new Date().getFullYear()} 3 Devs Solutions. Todos los derechos reservados.</p>
        </div>
      </footer>






    </div>
  );
};

export default Desarrolladores;
