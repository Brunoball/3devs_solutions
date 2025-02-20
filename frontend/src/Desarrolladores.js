import React, { useState, useEffect } from "react";
import "./Desarrolladores.css"; // Importa los estilos
import miImagen from "./Imagen de WhatsApp 2025-02-11 a .jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";

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
      trabajos: "Trabajos",
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
    },
    en: {
      welcome: "Welcome to 3 Devs Solutions",
      subtitle: "Innovation, technology, and tailored solutions",
      aboutTitle: "About Us",
      trabajos: "Works",
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
      stackTitle: "Tech Stack",
      stackSubtitle:
        "Technologies and tools we use to develop efficient solutions.",
      contactTitle: "Contact",
      followTitle: "Follow Us",
      footerText: "Innovation, technology, and tailored solutions",
      copyright: "All rights reserved.",
    },
  };


  const servicios = [
    {
      title: { es: "Desarrollo Web", en: "Web Development" },
      description: {
        es: "Creamos soluciones personalizadas para tu presencia en línea.",
        en: "We create customized solutions for your online presence.",
      },
      image: "/path/to/your/image1.jpg",
    },
    {
      title: { es: "Consultoría Técnica", en: "Technical Consulting" },
      description: {
        es: "Asesoría experta para optimizar tus procesos tecnológicos.",
        en: "Expert advice to optimize your technological processes.",
      },
      image: "/path/to/your/image2.jpg",
    },
    {
      title: { es: "Mantenimiento de Sistemas", en: "System Maintenance" },
      description: {
        es: "Mantenemos tus sistemas actualizados y funcionando correctamente.",
        en: "We keep your systems up to date and running smoothly.",
      },
      image: "/path/to/your/image3.jpg",
    },
  ];
  

 const trabajos = [
  {
    image: miImagen, // Reemplaza con la ruta de tu imagen
    description: {
      es: "LALCEC, Liga Argentina de Lucha Contra el Cáncer en la localidad de San Francisco, es una organización sin fines de lucro que trabaja en la prevención y detección temprana del cáncer. Desarrollamos una aplicación web para la gestión de socios y el manejo de cobro de las cuotas, facilitando la comunicación entre los socios y los de LALCEC. Donde se puede editar, agregar, eliminar socios, visualizar los pagos realizados y pendientes, entre otras funcionalidades.",
      en: "LALCEC, the Argentine League Against Cancer in the town of San Francisco, is a non-profit organization that works in the prevention and early detection of cancer. We developed a web application for managing members and handling membership fees, facilitating communication between members and LALCEC. It allows editing, adding, and deleting members, viewing payments made and pending, among other features."
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
      role: language === "es" ? "Líder de Equipo de Software" : "Software Team Lead",
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
                  src={language === "es" ? esFlag : usFlag}
                  alt={language === "es" ? "Español" : "English"}
                  className="flag-icon"
                />
                <span className="language-text">{language === "es" ? "ES" : "EN"}</span> {/* Add the language text here */}
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
        <h3 className="sub-title">{translations[language].teamSubtitle}</h3>
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
<section className="trabajos-section bg-gradient-radial from-[#26354b] to-[#4a6fa5] text-gray-200 py-12" id="trabajos">
  <h2 className="text-3xl font-extrabold text-center text-white mb-8 capitalize">
    {translations[language].trabajos}
  </h2>

  <div className="trabajos-container flex flex-col items-center gap-6">
    {trabajos.map((trabajo, index) => (
      <div key={index} className="trabajos-card bg-white/10 backdrop-blur-lg rounded-xl p-6 max-w-lg text-center shadow-lg">
        <img src={trabajo.image} alt="Imagen" className="trabajos-image w-full h-60 object-cover rounded-lg mb-4" />
        <p className="max-w-md mx-auto text-white">{trabajo.description[language]}</p>
        <a href={trabajo.link} className="btn-details bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg mt-4 inline-block transition transform hover:scale-105">
          {translations[language].mas}
        </a>
      </div>
    ))}
  </div>
</section>

{/* Sección de servicios */}
<section className="servicios-section bg-gradient-radial from-[#26354b] to-[#4a6fa5] text-gray-200 py-12" id="servicios">
  <h2 className="text-3xl font-extrabold text-center text-white mb-8 capitalize">
    {translations[language].servicios}
  </h2>

  <div className="servicios-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {servicios.map((servicio, index) => (
      <div key={index} className="servicio-card bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center shadow-lg">
        <img src={servicio.image} alt="Imagen Servicio" className="servicio-image w-full h-60 object-cover rounded-lg mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">{servicio.title[language]}</h3>
        <p className="text-gray-300">{servicio.description[language]}</p>
      </div>
    ))}
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