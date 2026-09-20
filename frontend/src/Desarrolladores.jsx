import React, { useState, useEffect, useRef } from "react";
import "./Desarrolladores.css";
import "./Servicios.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faAngleUp,
  faCheckCircle,
  faExclamationTriangle,
  faChevronDown,
  faBullseye,
  faCogs,
  faHandshake,
  faUsers,
  faCode,
  faMobileAlt,
  faDesktop,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { translations, developersData, serviciosData } from "./translations";

const esFlag = "/img/es-flag.png";
const usFlag = "/img/us-flag.png";

// Imágenes de Casos de Éxito:
// Cada sistema tiene su propia carpeta dentro de public/img-caso-exito/.
// Las rutas respetan exactamente la estructura/nombres de las capturas disponibles.
const successCasesData = {
  es: [
    {
      name: "LALCEC",
      client: "LALCEC San Francisco",
      category: "Gestión institucional",
      images: [
        "/img-caso-exito/Lalcec/01_dashboard.png",
        "/img-caso-exito/Lalcec/02_socios.png",
        "/img-caso-exito/Lalcec/03_cuotas.png",
        "/img-caso-exito/Lalcec/04_ingresos.png",
        "/img-caso-exito/Lalcec/05_resumen_contable.png",
        "/img-caso-exito/Lalcec/06_panel_bot_conversacion.png",
        "/img-caso-exito/Lalcec/07_bot_whatsapp.png",
      ],
      imageDetails: [
        {
          title: "Panel de gestión",
          description:
            "Vista general con indicadores de socios, cuotas registradas, recaudación y calidad de los datos para consultar el estado de la institución de un vistazo.",
        },
        {
          title: "Gestión de socios",
          description:
            "Centraliza la ficha de cada socio y permite encontrar rápidamente su información, estado de cuota y deuda, evitando búsquedas dispersas y facilitando la gestión diaria.",
        },
        {
          title: "Control de cuotas",
          description:
            "Permite detectar quién está al día o adeuda cuotas, filtrar por período y gestionar varios registros a la vez para agilizar el seguimiento de cobranzas.",
        },
        {
          title: "Registro de ingresos",
          description:
            "Reúne cada cobro con su fecha, período, medio de pago y monto para mantener trazabilidad sobre lo recaudado y consultar movimientos sin perder contexto.",
        },
        {
          title: "Resumen contable",
          description:
            "Resume ingresos, egresos y resultado en una única vista para entender rápidamente la situación económica y seguir su evolución a lo largo del año.",
        },
        {
          title: "Panel del Bot de WhatsApp",
          description:
            "Centraliza las conversaciones del asistente para supervisar contactos, pagos y comprobantes, dando seguimiento a la atención automatizada desde un solo panel.",
        },
        {
          title: "Asistente por WhatsApp",
          description:
            "Permite que el socio consulte opciones y avance en gestiones desde WhatsApp, reduciendo pasos manuales y guiando el proceso de pago de forma simple.",
        },
      ],
      summary:
        "Plataforma web desarrollada para centralizar la gestión de socios, grupos familiares, cuotas, cobranzas y movimientos administrativos.",
      challenge:
        "Ordenar procesos que requerían consultar información de socios, pagos y cobranzas desde distintos puntos de gestión.",
      solution:
        "Un sistema centralizado con administración de socios, cuotas, pagos, saldos, comprobantes, ingresos, egresos y reportes.",
      result:
        "La institución dispone de una única herramienta para consultar y registrar su operatoria cotidiana con mayor trazabilidad.",
      tags: ["Socios", "Cuotas", "Cobranzas", "Contabilidad", "Reportes"],
    },
    {
      name: "Círculo RH Negativo",
      client: "Círculo RH Negativo",
      category: "Gestión de socios",
      images: [
        "/img-caso-exito/Rh/01_dashboard.png",
        "/img-caso-exito/Rh/02_socios.png",
        "/img-caso-exito/Rh/03_cuotas.png",
        "/img-caso-exito/Rh/04_ingresos.png",
      ],
      imageDetails: [
        {
          title: "Panel de gestión",
          description:
            "Vista general con indicadores de socios, cuotas, cobranzas y movimientos para consultar rápidamente el estado general de la organización.",
        },
        {
          title: "Gestión de socios",
          description:
            "Organiza la información de cada socio y su grupo familiar para agilizar búsquedas, revisar estados y mantener actualizados los datos principales desde un solo lugar.",
        },
        {
          title: "Control de cuotas",
          description:
            "Facilita el seguimiento de cuotas, estados de pago y registros pendientes para ordenar cobranzas y actuar más rápido sobre deudas o períodos adeudados.",
        },
        {
          title: "Registro de ingresos",
          description:
            "Concentra cobranzas y movimientos económicos con su detalle correspondiente para mantener trazabilidad sobre lo recaudado y consultar ingresos sin perder contexto.",
        },
      ],
      summary:
        "Sistema orientado a la administración de socios y familias, con control de cuotas, pagos, saldos y movimientos de la organización.",
      challenge:
        "Centralizar la información de socios y mejorar el seguimiento de cuotas, cobranzas, saldos y comprobantes.",
      solution:
        "Una plataforma web con gestión de socios, familias, pagos múltiples, saldos a favor, comprobantes e información contable.",
      result:
        "Los procesos de consulta, cobro y seguimiento quedan integrados en una misma experiencia de trabajo.",
      tags: ["Socios", "Familias", "Pagos", "Saldos", "Ingresos"],
    },
    {
      name: "LERNA",
      client: "Gestión educativa",
      category: "Mesas de examen",
      images: [
        "/img-caso-exito/Lerna/01_dashboard_portada.png",
        "/img-caso-exito/Lerna/02_mesas_examen.png",
        "/img-caso-exito/Lerna/03_previas.png",
        "/img-caso-exito/Lerna/04_catedras.png",
        "/img-caso-exito/Lerna/05_estadisticas.png",
        "/img-caso-exito/Lerna/06_formulario_inscripcion.png",
      ],
      imageDetails: [
        {
          title: "Panel principal",
          description:
            "Presenta de forma resumida el estado general del sistema, con accesos a módulos clave y una vista rápida para ubicar la información académica más importante.",
        },
        {
          title: "Mesas de examen",
          description:
            "Permite organizar y consultar las mesas disponibles con sus fechas, docentes y estados para administrar el proceso de examen de forma más clara y ordenada.",
        },
        {
          title: "Materias previas",
          description:
            "Ordena el seguimiento de asignaturas pendientes para identificar rápidamente qué previas tiene cada alumno y acompañar mejor el proceso de inscripción.",
        },
        {
          title: "Cátedras",
          description:
            "Centraliza materias, cursos y docentes vinculados para mantener la estructura académica organizada y facilitar la carga o consulta de información relacionada.",
        },
        {
          title: "Estadísticas",
          description:
            "Resume datos e indicadores del sistema para analizar participación, actividad y evolución del proceso académico desde una vista más analítica.",
        },
        {
          title: "Formulario de inscripción",
          description:
            "Simplifica la inscripción de alumnos a las mesas mediante un flujo claro y ordenado, reduciendo errores y facilitando la carga de datos necesarios.",
        },
      ],
      summary:
        "Plataforma creada para organizar el circuito de mesas de examen, docentes, inscripciones y resultados desde un único sistema.",
      challenge:
        "Simplificar la organización de mesas y reducir tareas manuales al momento de administrar docentes, alumnos e inscripciones.",
      solution:
        "Un sistema que reúne mesas actuales, historial, docentes, inscripciones, confirmaciones y registro de resultados.",
      result:
        "La información académica queda organizada y disponible para acompañar cada etapa del proceso de examen.",
      tags: ["Mesas", "Docentes", "Inscripciones", "Resultados", "Historial"],
    },
    {
      name: "Cooperadora IPET 50",
      client: "Cooperadora IPET 50",
      category: "Gestión de cooperadora escolar",
      images: [
        "/img-caso-exito/Cooperadora/01_dashboard_panel_gestion.png",
        "/img-caso-exito/Cooperadora/02_gestion_alumnos.png",
        "/img-caso-exito/Cooperadora/03_gestion_cuotas.png",
        "/img-caso-exito/Cooperadora/04_ventas_escolares.png",
        "/img-caso-exito/Cooperadora/05_panel_bot_whatsapp.png",
        "/img-caso-exito/Cooperadora/06_bot_whatsapp_resumen_pago.png",
      ],
      imageDetails: [
        {
          title: "Panel de gestión",
          description:
            "Reúne los accesos principales de la cooperadora en una única pantalla para ingresar rápidamente a alumnos, cuotas, ventas escolares, administración y contabilidad.",
        },
        {
          title: "Gestión de alumnos",
          description:
            "Centraliza la información de los alumnos y permite buscar, filtrar, registrar altas, consultar familias y exportar datos para mantener el padrón escolar ordenado.",
        },
        {
          title: "Gestión de cuotas",
          description:
            "Permite consultar cuotas pendientes por período, categoría y cobrador, identificar estados de pago y ejecutar acciones de cobranza desde una vista unificada.",
        },
        {
          title: "Ventas escolares",
          description:
            "Organiza conceptos y campañas de venta de la cooperadora, con precios, vigencia, productos asociados, cantidad de ventas y estado de cada propuesta.",
        },
        {
          title: "Panel del Bot de WhatsApp",
          description:
            "Centraliza las conversaciones del asistente para supervisar consultas y pagos de las familias, manteniendo el seguimiento de cada interacción desde un solo panel.",
        },
        {
          title: "Pago asistido por WhatsApp",
          description:
            "El bot identifica al alumno, resume los períodos adeudados y facilita el acceso al pago desde WhatsApp, reduciendo tareas manuales y simplificando la cobranza.",
        },
      ],
      summary:
        "Sistema web desarrollado para centralizar la gestión de alumnos, cuotas, ventas escolares, administración y cobranzas de una cooperadora escolar.",
      challenge:
        "Ordenar información de alumnos y familias, mejorar el seguimiento de cuotas y simplificar procesos de cobranza que requerían múltiples tareas manuales.",
      solution:
        "Una plataforma integrada con gestión de alumnos, cuotas, ventas escolares, administración, contabilidad y un asistente de WhatsApp conectado al circuito de pagos.",
      result:
        "La cooperadora dispone de una única herramienta para gestionar su operatoria diaria y acompañar a las familias con un proceso de consulta y pago más directo.",
      tags: ["Alumnos", "Cuotas", "Ventas", "WhatsApp", "Contabilidad"],
    },
    {
      name: "BALTO",
      client: "BALTO",
      category: "Gestión empresarial",
      images: [
        "/img-caso-exito/Balto/01_dashboard_menu_abierto.png",
        "/img-caso-exito/Balto/02_ventas.png",
        "/img-caso-exito/Balto/03_stock.png",
        "/img-caso-exito/Balto/04_servicios.png",
        "/img-caso-exito/Balto/05_flujo_de_caja.png",
        "/img-caso-exito/Balto/06_dashboard_alternativo.png",
      ],
      imageDetails: [
        {
          title: "Panel principal",
          description:
            "Presenta una vista general del sistema con acceso a módulos clave para consultar rápidamente la operación comercial, administrativa y financiera del negocio.",
        },
        {
          title: "Gestión de ventas",
          description:
            "Organiza ventas, clientes y movimientos comerciales en una misma pantalla para agilizar la operatoria diaria y mejorar el seguimiento de cada transacción.",
        },
        {
          title: "Control de stock",
          description:
            "Permite revisar existencias, movimientos y disponibilidad de productos para mantener el inventario más ordenado y tomar decisiones con información actualizada.",
        },
        {
          title: "Gestión de servicios",
          description:
            "Centraliza la administración de servicios, materiales y recursos vinculados para coordinar mejor la operación y mantener cada trabajo bajo control.",
        },
        {
          title: "Flujo de caja",
          description:
            "Resume ingresos, egresos y movimientos financieros para visualizar la salud económica del negocio y acompañar el control diario de caja.",
        },
        {
          title: "Dashboard alternativo",
          description:
            "Ofrece otra lectura visual del rendimiento general del sistema, con indicadores y accesos que ayudan a analizar el negocio desde una perspectiva más estratégica.",
        },
      ],
      summary:
        "Ecosistema de gestión para empresas de servicios y comercios, pensado para integrar operación, administración y finanzas.",
      challenge:
        "Reunir en una sola plataforma procesos comerciales, stock, clientes, proveedores, cuentas corrientes y análisis financiero.",
      solution:
        "Módulos conectados para ventas, servicios, inventario, cobranzas, pagos, caja, reportes y configuración del negocio.",
      result:
        "La operatoria diaria y la información financiera se consultan desde un entorno centralizado y preparado para crecer.",
      tags: ["Ventas", "Servicios", "Stock", "Finanzas", "Reportes"],
    },
  ],
  en: [
    {
      name: "LALCEC",
      client: "LALCEC San Francisco",
      category: "Institutional management",
      images: [
        "/img-caso-exito/Lalcec/01_dashboard.png",
        "/img-caso-exito/Lalcec/02_socios.png",
        "/img-caso-exito/Lalcec/03_cuotas.png",
        "/img-caso-exito/Lalcec/04_ingresos.png",
        "/img-caso-exito/Lalcec/05_resumen_contable.png",
        "/img-caso-exito/Lalcec/06_panel_bot_conversacion.png",
        "/img-caso-exito/Lalcec/07_bot_whatsapp.png",
      ],
      imageDetails: [
        {
          title: "Management dashboard",
          description:
            "Overview with member, registered-fee, collection and data-quality indicators to understand the institution's status at a glance.",
        },
        {
          title: "Member management",
          description:
            "Centralizes each member record and makes information, fee status and debt easy to find, reducing scattered searches and speeding up daily management.",
        },
        {
          title: "Fee tracking",
          description:
            "Makes it easy to identify who is up to date or owes fees, filter by period and manage multiple records at once to streamline collection follow-up.",
        },
        {
          title: "Income records",
          description:
            "Keeps every collection traceable by date, paid period, payment method and amount, making recorded income easier to review without losing context.",
        },
        {
          title: "Accounting summary",
          description:
            "Brings income, expenses and results into one view so the institution can quickly understand its financial position and follow its evolution throughout the year.",
        },
        {
          title: "WhatsApp Bot panel",
          description:
            "Centralizes assistant conversations so contacts, payments and receipts can be supervised from one place while keeping automated support traceable.",
        },
        {
          title: "WhatsApp assistant",
          description:
            "Lets members move through common tasks from WhatsApp, reducing manual steps and guiding the payment process in a simple, assisted flow.",
        },
      ],
      summary:
        "A web platform built to centralize member, family group, fee, collection and administrative management.",
      challenge:
        "Organize processes that required checking member, payment and collection information across different workflows.",
      solution:
        "A centralized system for members, fees, payments, balances, receipts, income, expenses and reports.",
      result:
        "The institution now has one tool to register and review its daily operations with better traceability.",
      tags: ["Members", "Fees", "Collections", "Accounting", "Reports"],
    },
    {
      name: "Círculo RH Negativo",
      client: "Círculo RH Negativo",
      category: "Member management",
      images: [
        "/img-caso-exito/Rh/01_dashboard.png",
        "/img-caso-exito/Rh/02_socios.png",
        "/img-caso-exito/Rh/03_cuotas.png",
        "/img-caso-exito/Rh/04_ingresos.png",
      ],
      imageDetails: [
        {
          title: "Management dashboard",
          description:
            "Overview with member, fee, collection and movement indicators so the organization can quickly understand its current operating status.",
        },
        {
          title: "Member management",
          description:
            "Organizes each member and family-group record in one place, making searches faster and helping the team keep key information updated.",
        },
        {
          title: "Fee tracking",
          description:
            "Makes fee status and pending records easier to follow so collections can be organized and overdue periods can be reviewed more efficiently.",
        },
        {
          title: "Income records",
          description:
            "Brings collections and financial movements together with their details to keep income traceable and easier to review without losing context.",
        },
      ],
      summary:
        "A system focused on member and family administration, with fee, payment, balance and organization movement tracking.",
      challenge:
        "Centralize member information and improve the tracking of fees, collections, balances and receipts.",
      solution:
        "A web platform with member and family management, multiple payments, credit balances, receipts and accounting information.",
      result:
        "Daily consultation, collection and follow-up processes are integrated into the same working experience.",
      tags: ["Members", "Families", "Payments", "Balances", "Income"],
    },
    {
      name: "LERNA",
      client: "Education management",
      category: "Exam sessions",
      images: [
        "/img-caso-exito/Lerna/01_dashboard_portada.png",
        "/img-caso-exito/Lerna/02_mesas_examen.png",
        "/img-caso-exito/Lerna/03_previas.png",
        "/img-caso-exito/Lerna/04_catedras.png",
        "/img-caso-exito/Lerna/05_estadisticas.png",
        "/img-caso-exito/Lerna/06_formulario_inscripcion.png",
      ],
      summary:
        "A platform created to organize exam sessions, teachers, registrations and results from a single system.",
      challenge:
        "Simplify exam-session organization and reduce manual work when managing teachers, students and registrations.",
      solution:
        "A system that brings together current sessions, history, teachers, registrations, confirmations and result records.",
      result:
        "Academic information remains organized and available throughout every stage of the examination process.",
      tags: ["Sessions", "Teachers", "Registrations", "Results", "History"],
    },
    {
      name: "Cooperadora IPET 50",
      client: "Cooperadora IPET 50",
      category: "School cooperative management",
      images: [
        "/img-caso-exito/Cooperadora/01_dashboard_panel_gestion.png",
        "/img-caso-exito/Cooperadora/02_gestion_alumnos.png",
        "/img-caso-exito/Cooperadora/03_gestion_cuotas.png",
        "/img-caso-exito/Cooperadora/04_ventas_escolares.png",
        "/img-caso-exito/Cooperadora/05_panel_bot_whatsapp.png",
        "/img-caso-exito/Cooperadora/06_bot_whatsapp_resumen_pago.png",
      ],
      imageDetails: [
        {
          title: "Management dashboard",
          description:
            "Brings the cooperative's main areas into one screen so the team can quickly access students, fees, school sales, administration and accounting.",
        },
        {
          title: "Student management",
          description:
            "Centralizes student information with search, filters, registrations, family records and data exports to keep the school roster organized.",
        },
        {
          title: "Fee management",
          description:
            "Makes pending fees easier to review by period, category and collector, while keeping payment status and collection actions together in one view.",
        },
        {
          title: "School sales",
          description:
            "Organizes the cooperative's sales concepts and campaigns, including prices, availability, linked products, sales volume and current status.",
        },
        {
          title: "WhatsApp Bot panel",
          description:
            "Centralizes assistant conversations so family inquiries and payments can be supervised while keeping every interaction traceable from one panel.",
        },
        {
          title: "WhatsApp-assisted payment",
          description:
            "The bot identifies the student, summarizes outstanding periods and provides a direct payment path from WhatsApp, reducing manual collection work.",
        },
      ],
      summary:
        "A web system built to centralize student, fee, school sales, administration and collection management for a school cooperative.",
      challenge:
        "Organize student and family information, improve fee tracking and simplify collection processes that previously required multiple manual tasks.",
      solution:
        "An integrated platform for students, fees, school sales, administration and accounting, plus a WhatsApp assistant connected to the payment workflow.",
      result:
        "The cooperative now has one tool for its daily operations and a more direct consultation and payment experience for families.",
      tags: ["Students", "Fees", "Sales", "WhatsApp", "Accounting"],
    },
    {
      name: "BALTO",
      client: "BALTO",
      category: "Business management",
      images: [
        "/img/casos-exito/balto-dashboard.png",
        "/img/casos-exito/balto-servicios.png",
        "/img/casos-exito/balto-ventas.png",
        "/img/casos-exito/balto-analisis-financiero.png",
      ],
      summary:
        "A management ecosystem for service companies and retailers, designed to integrate operations, administration and finance.",
      challenge:
        "Bring commercial processes, stock, customers, suppliers, current accounts and financial analysis into one platform.",
      solution:
        "Connected modules for sales, services, inventory, collections, payments, cash flow, reports and business settings.",
      result:
        "Daily operations and financial information can be managed from a centralized environment built to scale.",
      tags: ["Sales", "Services", "Stock", "Finance", "Reports"],
    },
  ],
};

// Logos reales de clientes disponibles en public/img-clientes/.
// Se mantienen siete elementos para el carrusel continuo y sutil.
const clientsData = [
  { id: 1, name: "IPET 50", image: "/img-clientes/01_ipet_50.png" },
  { id: 2, name: "LALCEC", image: "/img-clientes/02_lalcec.png" },
  { id: 3, name: "Círculo RH Negativo", image: "/img-clientes/03_rh_negativo.png" },
  { id: 4, name: "MR Natural", image: "/img-clientes/04_mr_natural.png" },
  { id: 5, name: "EVSF 2.0", image: "/img-clientes/05_evsf_2_0.png" },
  { id: 6, name: "QARA", image: "/img-clientes/06_qara.png" },
  { id: 7, name: "JYG", image: "/img-clientes/07_jyg.png" },
];

const TechCategoryCard = ({
  category,
  title,
  description,
  icon,
  technologies,
  accentColor,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`tech-card ${category}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ "--accent-color": accentColor }}
    >
      <div className={`card-content ${isHovered ? "hidden" : ""}`}>
        <div className="card-header">
          <div className="card-icon">{icon}</div>
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

      <div className={`tech-details ${isHovered ? "visible" : ""}`}>
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


const SuccessCaseCard = ({ successCase, caseIndex, language }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageAspectRatio, setImageAspectRatio] = useState(2.1);
  const images = successCase.images || [];
  const imageDetails = successCase.imageDetails || [];
  const currentImageDetail = imageDetails[imageIndex] || null;
  const isLalcec = successCase.name === "LALCEC";
  const isRh = successCase.name === "Círculo RH Negativo";
  const isLerna = successCase.name === "LERNA";
  const isBalto = successCase.name === "BALTO";
  const isCooperadora = successCase.name === "Cooperadora IPET 50";
  const isFeaturedInstitutionCase = isLalcec || isRh || isLerna || isBalto || isCooperadora;
  const isLalcecDashboard = isLalcec && imageIndex === 0;
  const isRhDashboard = isRh && imageIndex === 0;
  const isLernaDashboard = isLerna && imageIndex === 0;
  const isBaltoDashboard = isBalto && imageIndex === 0;
  const isCooperadoraDashboard = isCooperadora && imageIndex === 0;
  const isFeaturedDashboard = isFeaturedInstitutionCase && imageIndex === 0;
  const showGeneralCaseInfo = !isFeaturedInstitutionCase || isFeaturedDashboard;
  const isLalcecDetailView = isLalcec && imageIndex > 0;
  const isRhDetailView = isRh && imageIndex > 0;
  const isLernaDetailView = isLerna && imageIndex > 0;
  const isBaltoDetailView = isBalto && imageIndex > 0;
  const isCooperadoraDetailView = isCooperadora && imageIndex > 0;
  const isFeaturedDetailView = isFeaturedInstitutionCase && imageIndex > 0;
  // En LALCEC, las primeras seis capturas son panorámicas.
  // La última (WhatsApp) conserva un formato más compacto/vertical.
  const isLalcecWideImage = isLalcec && imageIndex < 6;
  const isLalcecCompactImage = isLalcec && imageIndex >= 6;
  // RH utiliza capturas panorámicas que se muestran como tarjeta interna.
  const isRhWideImage = isRh;
  // LERNA también utiliza capturas panorámicas con tratamiento tipo tarjeta.
  const isLernaWideImage = isLerna;
  // BALTO utiliza capturas panorámicas con el mismo tratamiento tipo tarjeta.
  const isBaltoWideImage = isBalto;
  // Cooperadora combina capturas panorámicas del sistema y del Bot de WhatsApp.
  const isCooperadoraWideImage = isCooperadora;

  // Solo reinicia la captura cuando realmente cambia el proyecto.
  // Un cambio de idioma conserva tanto el caso activo como la imagen interna.
  useEffect(() => {
    setImageIndex(0);
    setImageFailed(false);
    setIsImageModalOpen(false);
    setImageAspectRatio(2.1);
  }, [successCase.name]);

  // Precarga las capturas del caso activo sin modificar la posición actual.
  useEffect(() => {
    images.forEach((src) => {
      const image = new Image();
      image.src = src;
    });
  }, [successCase.name, images]);

  useEffect(() => {
    if (!isImageModalOpen) return undefined;

    // Bloquea el fondo sin sacar el body del flujo de la página.
    // De esta forma la posición de scroll se conserva naturalmente y,
    // al cerrar el modal, no existe el salto momentáneo hacia el inicio.
    const body = document.body;
    const html = document.documentElement;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    const previousBodyStyles = {
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
      overscrollBehavior: body.style.overscrollBehavior,
    };
    const previousHtmlStyles = {
      overflow: html.style.overflow,
      overscrollBehavior: html.style.overscrollBehavior,
    };

    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsImageModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      html.style.overflow = previousHtmlStyles.overflow;
      html.style.overscrollBehavior = previousHtmlStyles.overscrollBehavior;
      body.style.overflow = previousBodyStyles.overflow;
      body.style.paddingRight = previousBodyStyles.paddingRight;
      body.style.overscrollBehavior = previousBodyStyles.overscrollBehavior;
    };
  }, [isImageModalOpen]);

  const changeImage = (direction) => {
    if (images.length <= 1) return;

    setImageIndex((currentIndex) => {
      if (direction === "next") {
        return (currentIndex + 1) % images.length;
      }

      return (currentIndex - 1 + images.length) % images.length;
    });
    setImageFailed(false);
  };

  const imageAlt = currentImageDetail
    ? `${successCase.name} - ${currentImageDetail.title}`
    : `${successCase.name} - ${
        language === "es" ? "captura del sistema" : "system screenshot"
      } ${imageIndex + 1}`;

  return (
    <>
      <article className={`success-card ${isLalcec ? "success-card--lalcec" : ""} ${isRh ? "success-card--rh" : ""} ${isLerna ? "success-card--lerna" : ""} ${isBalto ? "success-card--balto" : ""} ${isCooperadora ? "success-card--cooperadora" : ""} ${caseIndex % 2 !== 0 ? "success-card--reverse" : ""}`}>
        <div
          className={`success-card-media ${
            isLalcecWideImage ? "success-card-media--lalcec-wide" : ""
          } ${
            isLalcecCompactImage ? "success-card-media--lalcec-compact" : ""
          } ${
            isRhWideImage ? "success-card-media--rh-wide" : ""
          } ${
            isLernaWideImage ? "success-card-media--lerna-wide" : ""
          } ${
            isBaltoWideImage ? "success-card-media--balto-wide" : ""
          } ${
            isCooperadoraWideImage ? "success-card-media--cooperadora-wide" : ""
          }`}
          style={{
            "--success-image-ratio": imageAspectRatio,
            "--success-current-image":
              images.length > 0 && !imageFailed
                ? `url("${images[imageIndex]}")`
                : "none",
          }}
        >
          {(images.length === 0 || imageFailed) && (
            <div className="success-media-placeholder" aria-hidden="true">
              <span className="success-media-brand">3DEVS</span>
              <strong>{successCase.name}</strong>
              <small>
                {language === "es" ? "Captura no disponible" : "Screenshot unavailable"}
              </small>
            </div>
          )}

          {images.length > 0 && !imageFailed && (
            <>
              <img
                key={`${successCase.name}-screenshot-${imageIndex}`}
                src={images[imageIndex]}
                alt={imageAlt}
                className="success-system-image"
                loading="lazy"
                onLoad={(event) => {
                  const { naturalWidth, naturalHeight } = event.currentTarget;
                  if (naturalWidth && naturalHeight) {
                    setImageAspectRatio(naturalWidth / naturalHeight);
                  }
                }}
                onError={() => setImageFailed(true)}
              />

              <button
                type="button"
                className="success-image-expand"
                onClick={(event) => {
                  event.stopPropagation();
                  setIsImageModalOpen(true);
                }}
                aria-label={
                  language === "es"
                    ? "Ampliar imagen"
                    : "Expand image"
                }
                title={language === "es" ? "Ampliar imagen" : "Expand image"}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" />
                  <path d="M3 8l6-6M21 8l-6-6M3 16l6 6M21 16l-6 6" />
                </svg>
              </button>
            </>
          )}

          {images.length > 1 && (
            <>
              <button
                type="button"
                className="success-image-arrow success-image-arrow--left"
                onClick={(event) => {
                  event.stopPropagation();
                  changeImage("prev");
                }}
                aria-label={language === "es" ? "Imagen anterior" : "Previous image"}
              >
                <HiChevronLeft />
              </button>
              <button
                type="button"
                className="success-image-arrow success-image-arrow--right"
                onClick={(event) => {
                  event.stopPropagation();
                  changeImage("next");
                }}
                aria-label={language === "es" ? "Imagen siguiente" : "Next image"}
              >
                <HiChevronRight />
              </button>

              <div className="success-image-pagination" aria-label={language === "es" ? "Imágenes del sistema" : "System images"}>
                {images.map((_, index) => (
                  <button
                    type="button"
                    key={`${successCase.name}-image-dot-${index}`}
                    className={`success-image-dot ${index === imageIndex ? "active" : ""}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      setImageIndex(index);
                      setImageFailed(false);
                    }}
                    aria-label={`${language === "es" ? "Ver imagen" : "View image"} ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          <span className="success-case-number">
            {String(caseIndex + 1).padStart(2, "0")}
          </span>
        </div>

        <div
          className={`success-card-content ${
            isLalcec ? "success-card-content--lalcec" : ""
          } ${
            isRh ? "success-card-content--rh" : ""
          } ${
            isLerna ? "success-card-content--lerna" : ""
          } ${
            isBalto ? "success-card-content--balto" : ""
          } ${
            isCooperadora ? "success-card-content--cooperadora" : ""
          } ${
            isFeaturedDashboard ? "success-card-content--featured-dashboard" : ""
          } ${
            isFeaturedDetailView ? "success-card-content--image-only" : ""
          }`}
        >
          {isFeaturedInstitutionCase ? (
            <div className="success-card-fixed-header">
              <div className="success-card-topline">
                <span className="success-category">{successCase.category}</span>
                <span className="success-status">
                  <span className="success-status-dot"></span>
                  {language === "es" ? "EN FUNCIONAMIENTO" : "LIVE SYSTEM"}
                </span>
              </div>

              <div className="success-card-identity">
                <p className="success-client">{successCase.client}</p>
                <h3>{successCase.name}</h3>
              </div>
            </div>
          ) : (
            <>
              <div className="success-card-topline">
                <span className="success-category">{successCase.category}</span>
                <span className="success-status">
                  <span className="success-status-dot"></span>
                  {language === "es" ? "EN FUNCIONAMIENTO" : "LIVE SYSTEM"}
                </span>
              </div>

              <p className="success-client">{successCase.client}</p>
              <h3>{successCase.name}</h3>
            </>
          )}

          {showGeneralCaseInfo && !isFeaturedDashboard && (
            <p className="success-summary">{successCase.summary}</p>
          )}

          {currentImageDetail && !isFeaturedDashboard && (
            <div
              className={`success-image-context ${
                isFeaturedDetailView ? "success-image-context--focus" : ""
              }`}
              key={`${successCase.name}-context-${imageIndex}`}
            >
              <span className="success-image-context-kicker">
                {isLalcecDetailView
                  ? language === "es"
                    ? "QUÉ RESUELVE"
                    : "WHAT IT SOLVES"
                  : language === "es"
                    ? "EN ESTA CAPTURA"
                    : "IN THIS SCREENSHOT"}
              </span>
              <strong>{currentImageDetail.title}</strong>
              <p>{currentImageDetail.description}</p>
            </div>
          )}

          {showGeneralCaseInfo && (
            <>
              <div className={`success-story-grid ${isFeaturedDashboard ? "success-story-grid--dashboard" : ""}`}>
                <div className="success-story-item">
                  <span>{language === "es" ? "EL DESAFÍO" : "THE CHALLENGE"}</span>
                  <p>{successCase.challenge}</p>
                </div>

                {!isFeaturedDashboard && (
                  <div className="success-story-item">
                    <span>{language === "es" ? "LA SOLUCIÓN" : "THE SOLUTION"}</span>
                    <p>{successCase.solution}</p>
                  </div>
                )}

                <div className="success-story-item success-story-item--result">
                  <span>{language === "es" ? "EL RESULTADO" : "THE RESULT"}</span>
                  <p>{successCase.result}</p>
                </div>
              </div>

              {!isFeaturedDashboard && (
                <div className="success-tags">
                  {successCase.tags.map((tag) => (
                    <span key={`${successCase.name}-${tag}`}>{tag}</span>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </article>

      {isImageModalOpen && images.length > 0 && !imageFailed && (
        <div
          className="success-image-modal"
          role="dialog"
          aria-modal="true"
          aria-label={
            language === "es"
              ? `Vista ampliada de ${successCase.name}`
              : `Expanded view of ${successCase.name}`
          }
        >
          <div className="success-image-modal-panel">
            <div className="success-image-modal-header">
              <div className="success-image-modal-heading">
                <span className="success-image-modal-kicker">
                  {language === "es" ? "CASO DE ÉXITO" : "SUCCESS CASE"}
                </span>
                <div className="success-image-modal-title-row">
                  <strong>{successCase.name}</strong>
                  <span className="success-image-modal-counter">
                    {imageIndex + 1} / {images.length}
                  </span>
                </div>
                {currentImageDetail && (
                  <span className="success-image-modal-screen-name">
                    {currentImageDetail.title}
                  </span>
                )}
              </div>

              <button
                type="button"
                className="success-image-modal-close"
                onClick={() => setIsImageModalOpen(false)}
                aria-label={language === "es" ? "Cerrar imagen" : "Close image"}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div className="success-image-modal-stage">
              <img
                src={images[imageIndex]}
                alt={imageAlt}
                className="success-image-modal-image"
              />

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    className="success-modal-arrow success-modal-arrow--left"
                    onClick={() => changeImage("prev")}
                    aria-label={language === "es" ? "Imagen anterior" : "Previous image"}
                  >
                    <HiChevronLeft />
                  </button>
                  <button
                    type="button"
                    className="success-modal-arrow success-modal-arrow--right"
                    onClick={() => changeImage("next")}
                    aria-label={language === "es" ? "Imagen siguiente" : "Next image"}
                  >
                    <HiChevronRight />
                  </button>
                </>
              )}
            </div>

            <div
              className={`success-image-modal-footer ${
                currentImageDetail ? "success-image-modal-footer--with-copy" : ""
              }`}
            >
              <span>
                {language === "es" ? "Captura" : "Screenshot"} {imageIndex + 1} / {images.length}
              </span>

              {currentImageDetail && (
                <div
                  className="success-image-modal-copy"
                  key={`${successCase.name}-modal-copy-${imageIndex}`}
                >
                  <strong>{currentImageDetail.title}</strong>
                  <p>{currentImageDetail.description}</p>
                </div>
              )}

              {images.length > 1 && (
                <div className="success-image-modal-dots" aria-label={language === "es" ? "Imágenes del sistema" : "System images"}>
                  {images.map((_, index) => (
                    <button
                      type="button"
                      key={`${successCase.name}-modal-dot-${index}`}
                      className={`success-image-modal-dot ${index === imageIndex ? "active" : ""}`}
                      onClick={() => {
                        setImageIndex(index);
                        setImageFailed(false);
                      }}
                      aria-label={`${language === "es" ? "Ver imagen" : "View image"} ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
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
  const [activeSuccessCase, setActiveSuccessCase] = useState(0);
  const [successCaseDirection, setSuccessCaseDirection] = useState("next");
  const canvasRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const cursorIntervalRef = useRef(null);
  const sectionRefs = useRef([]);
  const [showAllTeam, setShowAllTeam] = useState(false);
  // ... (otros estados existentes)
  const teamSectionRef = useRef(null);
  const hiddenCardsRef = useRef([]);
  const cardsContainerRef = useRef(null);

  const toggleExpand = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const toggleShowAllTeam = () => {
    // Primero cerramos todas las tarjetas expandidas
    setExpandedCard(null);

    if (!showAllTeam) {
      setShowAllTeam(true);
    } else {
      setTimeout(() => setShowAllTeam(false), 300);
    }
  };

  const technologies = [
    {
      name: "HTML5",
      icon: "/img/html_logo.png",
      className: "html-style",
      category: "frontend",
      level: 90,
      description: {
        es: "HTML5 es el lenguaje de marcado estándar para crear y estructurar páginas web. Introduce nuevos elementos semánticos, soporte multimedia nativo y APIs para aplicaciones web complejas. Es la quinta y última versión principal de HTML, compatible con todos los navegadores modernos.",
        en: "HTML5 is the standard markup language for creating and structuring web pages. It introduces new semantic elements, native multimedia support, and APIs for complex web applications. It's the fifth and final major version of HTML, compatible with all modern browsers.",
      },
    },
    {
      name: "CSS3",
      icon: "/img/css_logo.png",
      className: "css-style",
      category: "frontend",
      description: {
        es: "CSS3 es la última evolución del lenguaje de hojas de estilo, que permite controlar el diseño y presentación de páginas web. Introduce características como animaciones, transiciones, gradientes, sombras y diseño responsive con media queries, permitiendo crear interfaces modernas y atractivas.",
        en: "CSS3 is the latest evolution of the style sheet language, allowing control over web page layout and presentation. It introduces features like animations, transitions, gradients, shadows, and responsive design with media queries, enabling modern and attractive interfaces.",
      },
    },
    {
      name: "JavaScript",
      icon: "/img/java_logo.png",
      className: "js-style",
      category: "frontend",
      description: {
        es: "JavaScript es un lenguaje de programación interpretado que permite agregar interactividad a sitios web. Como lenguaje del lado del cliente, se ejecuta en el navegador y permite manipular el DOM, gestionar eventos y comunicarse con servidores. Es fundamental para el desarrollo web moderno.",
        en: "JavaScript is an interpreted programming language that adds interactivity to websites. As a client-side language, it runs in the browser and allows DOM manipulation, event handling, and server communication. It's fundamental for modern web development.",
      },
    },
    {
      name: "React",
      icon: "/img/react_logo.png",
      className: "react-style",
      category: "frontend",
      level: 75,
      description: {
        es: "React es una biblioteca JavaScript desarrollada por Facebook para construir interfaces de usuario interactivas. Utiliza un enfoque basado en componentes y un DOM virtual para un rendimiento óptimo. Es ideal para aplicaciones de una sola página (SPA) y se puede combinar con otras bibliotecas o frameworks.",
        en: "React is a JavaScript library developed by Facebook for building interactive user interfaces. It uses a component-based approach and virtual DOM for optimal performance. It's ideal for single-page applications (SPA) and can be combined with other libraries or frameworks.",
      },
    },
    {
      name: "PHP",
      icon: "/img/php_logo.png",
      className: "php-style",
      category: "backend",
      level: 70,
      description: {
        es: "PHP es un lenguaje de scripting del lado del servidor ampliamente utilizado para el desarrollo web. Se integra fácilmente con HTML y es compatible con la mayoría de servidores y bases de datos. Es especialmente conocido por su uso en sistemas de gestión de contenidos como WordPress.",
        en: "PHP is a widely used server-side scripting language for web development. It integrates easily with HTML and is compatible with most servers and databases. It's especially known for its use in content management systems like WordPress.",
      },
    },
    {
      name: "Python",
      icon: "/img/py_logo.png",
      className: "python-style",
      category: "backend",
      level: 65,
      description: {
        es: "Python es un lenguaje de programación versátil y de alto nivel, conocido por su sintaxis clara y legible. Es ideal para desarrollo web (Django, Flask), análisis de datos, inteligencia artificial y automatización. Su amplia comunidad y ecosistema de librerías lo hacen muy popular.",
        en: "Python is a versatile, high-level programming language known for its clear and readable syntax. It's ideal for web development (Django, Flask), data analysis, artificial intelligence, and automation. Its large community and library ecosystem make it very popular.",
      },
    },
    {
      name: "Node JS",
      icon: "/img/node_logo.png",
      className: "node-style",
      category: "backend",
      level: 60,
      description: {
        es: "Node.js es un entorno de ejecución de JavaScript del lado del servidor basado en el motor V8 de Chrome. Permite desarrollar aplicaciones escalables y de alta performance usando JavaScript tanto en frontend como backend, facilitando el desarrollo full-stack con un solo lenguaje.",
        en: "Node.js is a server-side JavaScript runtime built on Chrome's V8 engine. It enables scalable, high-performance applications using JavaScript for both frontend and backend, facilitating full-stack development with a single language.",
      },
    },
    {
      name: "SQL",
      icon: "/img/database_lg.png",
      className: "sql-style",
      category: "database",
      level: 75,
      description: {
        es: "SQL (Structured Query Language) es el lenguaje estándar para gestionar y manipular bases de datos relacionales. Permite crear, leer, actualizar y eliminar datos (CRUD), así como definir estructuras de bases de datos y establecer relaciones entre tablas.",
        en: "SQL (Structured Query Language) is the standard language for managing and manipulating relational databases. It allows creating, reading, updating, and deleting data (CRUD), as well as defining database structures and establishing table relationships.",
      },
    },
    {
      name: "Visual Studio Code",
      icon: "/img/vs_studio.png",
      className: "visual-style",
      category: "tools",
      level: 80,
      description: {
        es: "Visual Studio Code es un editor de código fuente ligero pero potente desarrollado por Microsoft. Ofrece soporte para múltiples lenguajes, depuración integrada, control de versiones Git, extensiones personalizables y un terminal integrado, siendo uno de los editores más populares para desarrolladores.",
        en: "Visual Studio Code is a lightweight yet powerful source code editor developed by Microsoft. It offers multi-language support, built-in debugging, Git version control, customizable extensions, and an integrated terminal, being one of the most popular editors for developers.",
      },
    },
    {
      name: "GitHub",
      icon: "/img/github.png",
      className: "git-style",
      category: "tools",
      level: 70,
      description: {
        es: "GitHub es una plataforma de desarrollo colaborativo basada en Git que permite alojar y revisar código, gestionar proyectos y construir software en equipo. Ofrece características como pull requests, issues, GitHub Actions para CI/CD, y es el mayor host de código fuente del mundo.",
        en: "GitHub is a Git-based collaborative development platform for hosting and reviewing code, managing projects, and team software building. It offers features like pull requests, issues, GitHub Actions for CI/CD, and is the world's largest source code host.",
      },
    },
    {
      name: "Git",
      icon: "/img/gt_logo.png",
      className: "git-style",
      category: "tools",
      level: 70,
      description: {
        es: "Git es un sistema de control de versiones distribuido que permite gestionar el historial de cambios en proyectos de software. Facilita la colaboración entre desarrolladores, el manejo de ramas (branching) y la fusión de código (merging), siendo esencial en el desarrollo moderno.",
        en: "Git is a distributed version control system for managing change history in software projects. It facilitates developer collaboration, branching, and code merging, being essential in modern development.",
      },
    },
  ];

  // Función para manejar el scroll suave sin afectar el historial
  const smoothScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Efecto para manejar el historial del navegador
  useEffect(() => {
    // Verificar si estamos en un navegador in-app
    const isInAppBrowser = /Instagram|Facebook|Twitter/.test(navigator.userAgent);

    // Configuración inicial del historial
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = "manual";
    }

    let isFirstBack = true;

    const handlePopState = () => {
      if (isFirstBack) {
        // Primera vez: hacer scroll al inicio
        smoothScroll("inicio");
        isFirstBack = false;

        try {
          // Intentar modificar el historial (puede fallar en navegadores in-app)
          window.history.replaceState({ isFirstBack: false }, "");
          window.history.pushState({ isFirstBack: true }, "");
        } catch (e) {
          console.log("History API no soportada completamente");
          // Fallback: usar un timeout para resetear el flag
          setTimeout(() => {
            isFirstBack = true;
          }, 1000);
        }
      } else {
        // Segunda vez: salir de la página
        window.history.back();
      }
    };

    const resetBackCounter = () => {
      isFirstBack = true;
      try {
        window.history.replaceState({ isFirstBack: true }, "");
      } catch (e) {
        console.log("No se pudo actualizar el estado del historial");
      }
    };

    // Solo intentar modificar el historial si no estamos en un navegador in-app
    if (!isInAppBrowser) {
      try {
        window.history.pushState({ isFirstBack: true }, "");
      } catch (e) {
        console.log("No se pudo inicializar el estado del historial");
      }
    }

    // Event listeners con fallbacks
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("scroll", resetBackCounter);
    window.addEventListener("click", resetBackCounter);
    // Añadir evento touchstart para navegadores móviles
    window.addEventListener("touchstart", resetBackCounter);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("scroll", resetBackCounter);
      window.removeEventListener("click", resetBackCounter);
      window.removeEventListener("touchstart", resetBackCounter);
    };
  }, []);

  const filterTech = (category) => {
    setActiveCategory(category);
    setSelectedTech(null);
  };

  const showTechDetails = (tech) => {
    // Sincroniza la tecnología seleccionada con su pestaña/categoría.
    // De esta forma, al elegir un elemento desde el carrusel, también
    // queda resaltada la pestaña correspondiente en el panel inferior.
    setActiveCategory(tech.category);
    setSelectedTech(tech);
  };

  const filteredTechs =
    activeCategory === "all"
      ? technologies
      : technologies.filter((tech) => tech.category === activeCategory);

  useEffect(() => {
    const welcomeText = translations[language].welcome;
    setTypedText("");
    let currentIndex = 0;

    clearTimeout(typingTimeoutRef.current);
    clearInterval(cursorIntervalRef.current);

    setShowCursor(true);

    cursorIntervalRef.current = setInterval(() => {
      setShowCursor((prev) => !prev);
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
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
          const force = (this.gravity * this.mass * other.mass) / (distance * distance);
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
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(0.8, this.color.replace("50%)", "30%)"));
        gradient.addColorStop(1, this.color.replace("50%)", "10%)"));

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
            ctx.strokeStyle = particles[i].color.replace("50%)", `${opacity * 20}%)`);
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
      ctx.fillStyle = "rgba(10, 15, 25, 0.2)";
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

    const onResize = () => {
      resizeCanvas();
      init();
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "es" ? "en" : "es"));
  };

  useEffect(() => {
    document.title = "3 Devs Solutions";
  }, []);



  /* =========================================================
     ✅ ARREGLOS PEDIDOS:
     - Eliminar caja de "Joaquin Mullasano"
     - Bruno Ballarino -> "Desarrollador Backend"
     - Gaston Villalba -> "Desarrollador Frontend"
     (sin tocar translations.js)
  ========================================================= */
  const roleOverrideByName = {
    "Bruno Ballarino": language === "es" ? "Desarrollador Backend" : "Backend Developer",
    "Gaston Villalba": language === "es" ? "Desarrollador Frontend" : "Frontend Developer",
    "Gastón Villalba": language === "es" ? "Desarrollador Frontend" : "Frontend Developer",
  };

  const successCases = successCasesData[language];
  const currentSuccessCase = successCases[activeSuccessCase];

  const changeSuccessCase = (direction) => {
    setSuccessCaseDirection(direction);
    setActiveSuccessCase((currentIndex) => {
      if (direction === "next") {
        return (currentIndex + 1) % successCases.length;
      }

      return (currentIndex - 1 + successCases.length) % successCases.length;
    });
  };

  const selectSuccessCase = (index) => {
    if (index === activeSuccessCase) return;
    setSuccessCaseDirection(index > activeSuccessCase ? "next" : "prev");
    setActiveSuccessCase(index);
  };

  const teamDevs = developersData(language)
    // ✅ elimina la tarjeta de Joaquín (con y sin tilde por las dudas)
    .filter(
      (d) => d?.name !== "Joaquin Mullasano" && d?.name !== "Joaquín Mullasano"
    )
    // ✅ aplica override de rol a Bruno/Gastón
    .map((d) => ({
      ...d,
      role: roleOverrideByName[d?.name] ?? d?.role,
    }));

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
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
        />

        <div className="lottie-animation-container">
          <DotLottieReact
            src="/animations/3devs-hero.lottie"
            loop
            autoplay
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              height: "100%",
              maxWidth: "800px",
              zIndex: 2,
              opacity: 0.8,
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
                <li>
                  <a
                    href="#inicio"
                    onClick={(e) => {
                      e.preventDefault();
                      smoothScroll("inicio");
                      setIsMenuOpen(false);
                    }}
                    className="nav-link"
                  >
                    {language === "es" ? "Inicio" : "Home"}
                  </a>
                </li>
                <li>
                  <a
                    href="#nosotros"
                    onClick={(e) => {
                      e.preventDefault();
                      smoothScroll("nosotros");
                      setIsMenuOpen(false);
                    }}
                    className="nav-link"
                  >
                    {language === "es" ? "Nosotros" : "About Us"}
                  </a>
                </li>
                <li>
                  <a
                    href="#equipo"
                    onClick={(e) => {
                      e.preventDefault();
                      smoothScroll("equipo");
                      setIsMenuOpen(false);
                    }}
                    className="nav-link"
                  >
                    {language === "es" ? "Equipo" : "Team"}
                  </a>
                </li>
                <li>
                  <a
                    href="#stack"
                    onClick={(e) => {
                      e.preventDefault();
                      smoothScroll("stack");
                      setIsMenuOpen(false);
                    }}
                    className="nav-link"
                  >
                    {language === "es" ? "Stack Tecnológico" : "Tech Stack"}
                  </a>
                </li>
                <li>
                  <a
                    href="#servicios"
                    onClick={(e) => {
                      e.preventDefault();
                      smoothScroll("servicios");
                      setIsMenuOpen(false);
                    }}
                    className="nav-link"
                  >
                    {language === "es" ? "Servicios" : "Services"}
                  </a>
                </li>
                <li>
                  <a
                    href="#casos-exito"
                    onClick={(e) => {
                      e.preventDefault();
                      smoothScroll("casos-exito");
                      setIsMenuOpen(false);
                    }}
                    className="nav-link"
                  >
                    {language === "es" ? "Casos de éxito" : "Success Stories"}
                  </a>
                </li>
                <li>
                  <a
                    href="#contacto"
                    onClick={(e) => {
                      e.preventDefault();
                      smoothScroll("contacto");
                      setIsMenuOpen(false);
                    }}
                    className="nav-link"
                  >
                    {language === "es" ? "Contacto" : "Contact"}
                  </a>
                </li>
                <li className="language-switcher">
                  <button
                    onClick={toggleLanguage}
                    className="language-button"
                    aria-label="Change language"
                  >
                    <img
                      src={language === "es" ? usFlag : esFlag}
                      alt={language === "es" ? "English" : "Español"}
                      className="flag-icon"
                    />
                    <span className="language-text">
                      {language === "es" ? "EN" : "ES"}
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="hero-content">
          <div className="overlay">
            <h1 className="main-title">
              {typedText.split("").map((char, index) => (
                <span key={index} className="char">
                  {char === "\n" ? <br /> : char}
                  {index === typedText.length - 1 && showCursor && (
                    <span className="typing-cursor">|</span>
                  )}
                </span>
              ))}
              <p className="subtitle">{translations[language].subtitle}</p>
            </h1>

            <div className="cta-buttons">
              <a
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScroll("contacto");
                }}
                className="cta-button primary"
              >
                {language === "es" ? "Contáctanos" : "Contact Us"}
              </a>
              <a
                href="#servicios"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScroll("servicios");
                }}
                className="cta-button secondary"
              >
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
              <p
                dangerouslySetInnerHTML={{ __html: translations[language].aboutText1 }}
              />
            </div>

            <div className="info-card">
              <div className="info-icon-container">
                <FontAwesomeIcon icon={faCogs} className="info-icon" />
              </div>
              <p
                dangerouslySetInnerHTML={{ __html: translations[language].aboutText2 }}
              />
            </div>

            <div className="info-card">
              <div className="info-icon-container">
                <FontAwesomeIcon icon={faHandshake} className="info-icon" />
              </div>
              <p
                dangerouslySetInnerHTML={{ __html: translations[language].aboutText3 }}
              />
            </div>

            <div className="info-card">
              <div className="info-icon-container">
                <FontAwesomeIcon icon={faUsers} className="info-icon" />
              </div>
              <p
                dangerouslySetInnerHTML={{ __html: translations[language].aboutText4 }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="team-section" id="equipo" ref={teamSectionRef}>
        <h2>{translations[language].teamTitle}</h2>
        <p className="sub-title">{translations[language].teamSubtitle}</p>

        <div className="cards-container" ref={cardsContainerRef}>
          {teamDevs.map((dev, index) => (
            <div
              key={index}
              className={`card ${expandedCard === index ? "expanded" : ""} ${
                index >= 3 ? (showAllTeam ? "show" : "hidden") : ""
              }`}
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
                  aria-label={
                    expandedCard === index
                      ? language === "es"
                        ? "Contraer información"
                        : "Collapse info"
                      : language === "es"
                      ? "Expandir información"
                      : "Expand info"
                  }
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

        {teamDevs.length > 3 && (
          <button
            className="show-more-button"
            onClick={toggleShowAllTeam}
            aria-expanded={showAllTeam}
          >
            <FontAwesomeIcon icon={faUsers} className="team-icon" />
            {showAllTeam
              ? translations[language].showLessTeam
              : translations[language].showMoreTeam}
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`chevron-icon ${showAllTeam ? "expanded" : ""}`}
            />
          </button>
        )}
      </section>

      <section className="tech-sphere-section" id="stack">
        <div className="section-container Satack">
          <div className="section-header">
            <h2 className="section-title">
              <span className="title-gradient">{translations[language].stackTitle}</span>
            </h2>
            <div className="title-divider"></div>
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
                        transform: `rotateY(${angle}deg) translateZ(200px)`,
                      }}
                      onClick={() => showTechDetails(tech)}
                    >
                      <div className="tech-icon">
                        <img
                          src={tech.icon}
                          alt={tech.name}
                          style={{ filter: "brightness(0) invert(1)" }}
                        />
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
                    className={`category-btn ${activeCategory === "frontend" ? "active" : ""}`}
                    onClick={() => filterTech("frontend")}
                  >
                    Frontend
                  </button>
                  <button
                    className={`category-btn ${activeCategory === "backend" ? "active" : ""}`}
                    onClick={() => filterTech("backend")}
                  >
                    Backend
                  </button>
                  <button
                    className={`category-btn ${activeCategory === "database" ? "active" : ""}`}
                    onClick={() => filterTech("database")}
                  >
                    {language === "es" ? "Base de Datos" : "Database"}
                  </button>
                  <button
                    className={`category-btn ${activeCategory === "tools" ? "active" : ""}`}
                    onClick={() => filterTech("tools")}
                  >
                    {language === "es" ? "Herramientas" : "Tools"}
                  </button>
                </div>

                <div className="tech-details">
                  {!selectedTech ? (
                    <>
                      {filteredTechs.length === technologies.length ? (
                        <div className="initial-state">
                          <div className="initial-icon">
                            <svg
                              width="48"
                              height="48"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="12" y1="8" x2="12" y2="12"></line>
                              <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                          </div>
                          <h3 className="initial-title">
                            {language === "es"
                              ? "Explora mi stack tecnológico"
                              : "Explore my tech stack"}
                          </h3>
                          <p className="initial-description">
                            {language === "es"
                              ? "Selecciona una categoría o haz clic en cualquier tecnología para ver detalles"
                              : "Select a category or click on any technology to see details"}
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="tech-grid">
                            {filteredTechs.map((tech, i) => (
                              <div
                                key={`tech-${i}`}
                                className={`tech-grid-item ${tech.category}`}
                                style={{
                                  animation: `fadeInLeft 0.5s ease forwards`,
                                  animationDelay: `${i * 0.05}s`,
                                }}
                                onClick={() => showTechDetails(tech)}
                              >
                                <div className="tech-grid-icon">
                                  <img
                                    src={tech.icon}
                                    alt={tech.name}
                                    style={{ filter: "brightness(0) invert(1)" }}
                                  />
                                </div>
                                <div className="tech-grid-name">{tech.name}</div>
                              </div>
                            ))}
                          </div>
                          <div className="select-tech-prompt">
                            {language === "es"
                              ? "Selecciona una tecnología para ver detalles"
                              : "Select a technology to see details"}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="selected-tech-details">
                      <h3 className="tech-name">{selectedTech.name}</h3>
                      <p className="tech-description">
                        {selectedTech.description[language] ||
                          (language === "es"
                            ? "No hay descripción disponible"
                            : "No description available")}
                      </p>

                      <button className="back-button" onClick={() => setSelectedTech(null)}>
                        <HiChevronLeft className="back-icon" />
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
                <path d="M12 7l5 5-5 5-5-5 5-5z" />
              </svg>
              {translations[language].frontendTitle || "Frontend"}
              <span className="tech-category-count">
                {technologies.filter((t) => t.category === "frontend").length}
              </span>
            </div>

            <div className="tech-category-pill backend">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12 6v12c3.31 0 6-2.69 6-6s-2.69-6-6-6z" />
              </svg>
              {translations[language].backendTitle || "Backend"}
              <span className="tech-category-count">
                {technologies.filter((t) => t.category === "backend").length}
              </span>
            </div>

            <div className="tech-category-pill database">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M4 7v6c0 2.21 3.58 4 8 4s8-1.79 8-4V7" />
              </svg>
              {translations[language].databaseTitle || "Database"}
              <span className="tech-category-count">
                {technologies.filter((t) => t.category === "database").length}
              </span>
            </div>

            <div className="tech-category-pill tools">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              </svg>
              {translations[language].toolsTitle || "Tools"}
              <span className="tech-category-count">
                {technologies.filter((t) => t.category === "tools").length}
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
                "--size": `${Math.random() * 6 + 2}px`,
                "--x": `${Math.random() * 100}%`,
                "--y": `${Math.random() * 100}%`,
                "--delay": `${Math.random() * 5}s`,
                "--duration": `${Math.random() * 10 + 10}s`,
              }}
            ></div>
          ))}
        </div>
      </section>

      <section className="services-section services-section--refined" id="servicios" ref={(el) => (sectionRefs.current[4] = el)}>
        <div className="section-container services-container">
          <div className="section-header services-header">
            <h2 className="section-title">
              <span className="title-gradient">{translations[language].servicios}</span>
            </h2>
            <p className="section-subtitle">{translations[language].servicios_subtitle}</p>
          </div>

          <div className="services-tabs services-shell">
            <div className="tab-buttons services-nav" role="tablist" aria-label={language === "es" ? "Tipos de servicio" : "Service types"}>
              {serviciosData[language].map((service, index) => (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={activeService === index}
                  className={`tab-button service-tab ${activeService === index ? "active" : ""}`}
                  onClick={() => setActiveService(index)}
                >
                  <span className="service-tab-icon" aria-hidden="true">
                    <FontAwesomeIcon icon={index === 0 ? faCode : index === 1 ? faDesktop : faMobileAlt} />
                  </span>
                  <span className="service-tab-label">{service.title}</span>
                  <span className="service-tab-line" aria-hidden="true"></span>
                </button>
              ))}
            </div>

            <div className="tab-content services-panel">
              <div
                className="service-details service-details--refined"
                key={`${language}-${activeService}`}
              >
                <div className="service-image service-visual">
                  <div className="service-visual-glow" aria-hidden="true"></div>
                  <div className="service-visual-frame">
                    <img
                      src={serviciosData[language][activeService].image}
                      alt={serviciosData[language][activeService].title}
                    />
                  </div>
                  <span className="service-visual-index" aria-hidden="true">
                    {String(activeService + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="service-info service-copy">
                  <div className="service-copy-heading">
                    <span className="service-eyebrow">
                      {language === "es" ? "SOLUCIÓN 3DEVS" : "3DEVS SOLUTION"}
                    </span>
                    <h3>{serviciosData[language][activeService].title}</h3>
                    <p className="service-description">
                      {serviciosData[language][activeService].subtitle}
                    </p>
                  </div>

                  <div className="pros-cons service-benefit-grid">
                    <div className="pros service-benefit-card service-benefit-card--pros">
                      <div className="service-benefit-title">
                        <span className="service-benefit-icon service-benefit-icon--pros">
                          <FontAwesomeIcon icon={faCheckCircle} />
                        </span>
                        <h4>{language === "es" ? "Ventajas" : "Pros"}</h4>
                      </div>
                      <ul>
                        {serviciosData[language][activeService].pros.map((pro, idx) => (
                          <li key={`pro-${idx}`}>
                            <FontAwesomeIcon icon={faCheckCircle} className="pro-icon" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="cons service-benefit-card service-benefit-card--cons">
                      <div className="service-benefit-title">
                        <span className="service-benefit-icon service-benefit-icon--cons">
                          <FontAwesomeIcon icon={faExclamationTriangle} />
                        </span>
                        <h4>{language === "es" ? "Consideraciones" : "Considerations"}</h4>
                      </div>
                      <ul>
                        {serviciosData[language][activeService].contras.map((contra, idx) => (
                          <li key={`contra-${idx}`}>
                            <FontAwesomeIcon icon={faExclamationTriangle} className="con-icon" />
                            <span>{contra}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="service-actions">
                    <a
                      href={`https://api.whatsapp.com/send?phone=3564672341&text=¡Hola!%20Estoy%20interesado%20en%20el%20servicio%20de%20${serviciosData[language][activeService].title}.%20¿Podrían%20darme%20más%20información?`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="service-cta service-cta--refined"
                    >
                      <span>{translations[language].consultar_servicio}</span>
                      <FontAwesomeIcon icon={faArrowRight} className="service-cta-icon" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="success-section" id="casos-exito">
        <div className="success-container">
          <div className="section-header success-header">
            <h2 className="section-title">
              <span className="title-gradient">
                {language === "es" ? "Casos de éxito" : "Success stories"}
              </span>
            </h2>
            <p className="section-subtitle success-section-subtitle">
              {language === "es"
                ? "Soluciones que ya están trabajando. Sistemas desarrollados por 3devs que acompañan procesos reales de organizaciones, instituciones y empresas."
                : "Solutions already at work. Systems developed by 3devs supporting real processes across organizations, institutions and businesses."}
            </p>
          </div>

          <div className="success-carousel">
            <button
              type="button"
              className="success-project-arrow success-project-arrow--left"
              onClick={() => changeSuccessCase("prev")}
              aria-label={language === "es" ? "Proyecto anterior" : "Previous project"}
            >
              <HiChevronLeft />
            </button>

            <div className={`success-list success-list--${successCaseDirection}`}>
              {currentSuccessCase && (
                <SuccessCaseCard
                  key={currentSuccessCase.name}
                  successCase={currentSuccessCase}
                  caseIndex={activeSuccessCase}
                  language={language}
                />
              )}
            </div>

            <button
              type="button"
              className="success-project-arrow success-project-arrow--right"
              onClick={() => changeSuccessCase("next")}
              aria-label={language === "es" ? "Proyecto siguiente" : "Next project"}
            >
              <HiChevronRight />
            </button>
          </div>

          <div className="success-project-pagination" aria-label={language === "es" ? "Proyectos" : "Projects"}>
            {successCases.map((successCase, index) => (
              <button
                type="button"
                key={`${successCase.name}-project-dot`}
                className={`success-project-dot ${index === activeSuccessCase ? "active" : ""}`}
                onClick={() => selectSuccessCase(index)}
                aria-label={`${language === "es" ? "Ver proyecto" : "View project"} ${successCase.name}`}
              />
            ))}
          </div>

          <div className="success-cta">
            <div>
              <span className="success-cta-kicker">3DEVS SOLUTIONS</span>
              <h3>
                {language === "es"
                  ? "¿Tu organización necesita una solución similar?"
                  : "Does your organization need a similar solution?"}
              </h3>
              <p>
                {language === "es"
                  ? "Desarrollamos software adaptado a la forma en que trabaja tu empresa o institución."
                  : "We build software tailored to the way your company or institution works."}
              </p>
            </div>
            <button
              type="button"
              className="success-cta-button"
              onClick={() => smoothScroll("contacto")}
            >
              {language === "es" ? "Hablemos de tu proyecto" : "Let's talk about your project"}
              <FontAwesomeIcon
                icon={faArrowRight}
                className="success-cta-button-icon"
                aria-hidden="true"
              />
            </button>
          </div>
          <div className="clients-strip" aria-label={language === "es" ? "Clientes de 3devs" : "3devs clients"}>
            <div className="clients-strip-label">
              <span aria-hidden="true"></span>
              {language === "es" ? "Clientes que confían en 3devs" : "Clients who trust 3devs"}
            </div>

            <div className="clients-marquee">
              <div className="clients-track">
                {[0, 1].map((groupIndex) => (
                  <div
                    className="clients-group"
                    key={`clients-group-${groupIndex}`}
                    aria-hidden={groupIndex === 1 ? "true" : undefined}
                  >
                    {clientsData.map((client) => (
                      <div className="client-logo-item" key={`${groupIndex}-${client.id}`}>
                        <div className="client-logo-placeholder">
                          <strong>{language === "es" ? "Cliente" : "Client"} {String(client.id).padStart(2, "0")}</strong>
                        </div>
                        <img
                          src={client.image}
                          alt={`${language === "es" ? "Logo de" : "Logo of"} ${client.name}`}
                          className="client-logo-image"
                          loading="lazy"
                          onLoad={(event) => {
                            const placeholder = event.currentTarget.previousElementSibling;
                            if (placeholder) placeholder.style.display = "none";
                          }}
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-section" id="contacto">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/img/lg_blanco_horizontal.png" alt="Logo" className="footer-logo-img" />
            <p className="footer-slogan">{translations[language].footerText}</p>
          </div>
          <div className="footer-contact">
            <h3>{translations[language].contactTitle}</h3>
            <p>Email: 3devs.solutions@gmail.com</p>
            <p>Teléfono: +54 3564-672341</p>
            <p>Dirección: San Francisco/Rafaela, Argentina</p>
          </div>
          <div className="footer-social">
            <h3>{translations[language].followTitle}</h3>
            <ul>
              <li>
                <a
                  href="https://www.linkedin.com/search/results/all/?heroEntityKey=urn%3Ali%3Aorganization%3A106893326&keywords=3devs%20solutions&origin=ENTITY_SEARCH_HOME_HISTORY&sid=ZMS"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/3devs.solutions/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} 3 Devs Solutions. {translations[language].copyright}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Desarrolladores;
