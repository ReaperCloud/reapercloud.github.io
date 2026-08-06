"use strict";

const root = document.documentElement;

const siteHeader = document.getElementById("site-header");
const themeButton = document.getElementById("theme-button");
const themeOverlay = document.getElementById("theme-transition-overlay");

const languageSwitch = document.getElementById("language-switch");
const languageOptions = document.querySelectorAll(".language-option[data-language]");
const metaDescription = document.getElementById("meta-description");

const menuButton = document.getElementById("menu-button");
const mobileNav = document.getElementById("mobile-nav");

const statusMessage = document.getElementById("status-message");
const currentYear = document.getElementById("current-year");

const revealElements = document.querySelectorAll(".reveal");
const projectsCarousel = document.getElementById("projects-carousel");
const projectsCarouselToolbar = document.getElementById(
    "projects-carousel-toolbar"
);
const projectsViewport = document.getElementById("projects-viewport");
const projectsTrack = document.getElementById("projects-track");
const projectsPagination = document.getElementById("projects-pagination");
const projectsPreviousButton = document.getElementById("projects-previous");
const projectsNextButton = document.getElementById("projects-next");

const projectDialog = document.getElementById("project-dialog");
const projectDialogClose = document.getElementById("project-dialog-close");
const projectDialogMeta = document.getElementById("project-dialog-meta");
const projectDialogTitle = document.getElementById("project-dialog-title");
const projectDialogDescription = document.getElementById(
    "project-dialog-description"
);
const projectDialogTags = document.getElementById("project-dialog-tags");
const projectShowcaseDescription = document.querySelector(
    ".project-showcase-description"
);

function createProjectDescriptionScrollArea() {
    if (!projectShowcaseDescription) {
        return null;
    }

    const existingScrollArea =
        projectShowcaseDescription.querySelector(
            ".project-description-scroll"
        );

    if (existingScrollArea) {
        return existingScrollArea;
    }

    const scrollArea = document.createElement("div");

    scrollArea.className =
        "project-description-scroll";

    /*
        Se conservan exactamente los mismos elementos:
        título, descripción y tecnologías.
        Únicamente se colocan dentro de un área desplazable.
    */

    const currentContent = [
        ...projectShowcaseDescription.childNodes
    ];

    currentContent.forEach((node) => {
        scrollArea.append(node);
    });

    projectShowcaseDescription.append(scrollArea);

    return scrollArea;
}

const projectDescriptionScrollArea =
    createProjectDescriptionScrollArea();

const projectGallery = document.getElementById("project-gallery");
const projectGalleryTrack = document.getElementById("project-gallery-track");
const projectGalleryPagination = document.getElementById(
    "project-gallery-pagination"
);
const projectImagePrevious = document.getElementById(
    "project-image-previous"
);
const projectImageNext = document.getElementById("project-image-next");

const PROJECT_DIALOG_OPEN_DURATION = 280;
const PROJECT_DIALOG_CLOSE_DURATION = 220;

let projectDialogOpenTimer = null;
let projectDialogCloseTimer = null;

const heroPhotoFrame = document.getElementById("hero-photo-frame");
const heroPhoto = document.getElementById("hero-photo");
const temporaryLinks = document.querySelectorAll('a[href="#"]');

const pageSections = [...document.querySelectorAll("main .page-section[id]")];
const sectionNavigationLinks = document.querySelectorAll(
    '.desktop-nav a[href^="#"], .mobile-nav a[href^="#"]'
);
const internalSectionLinks = document.querySelectorAll('a[href^="#"]');

const reducedMotionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

const translations = {
    es: {
        documentTitle: "Alejandro Lira | Desarrollo de Software",
        metaDescription: "Portafolio de Alejandro Lira, estudiante de Desarrollo de Software.",

        "accessibility.skip": "Saltar al contenido",
        "accessibility.goHome": "Ir al inicio",
        "accessibility.mainNav": "Navegación principal",
        "accessibility.mobileNav": "Navegación móvil",
        "accessibility.languageGroup": "Idioma del sitio",
        "accessibility.heroPlaceholder": "Espacio reservado para la imagen principal",
        "accessibility.heroPhoto": "Alejandro Lira, desarrollador de software",
        "accessibility.projectsCarousel": "Carrusel de proyectos",
        "accessibility.previousProjects": "Ver proyectos anteriores",
        "accessibility.nextProjects": "Ver más proyectos",
        "accessibility.projectGallery": "Galería de imágenes del proyecto",
        "accessibility.previousProjectImage": "Imagen anterior",
        "accessibility.nextProjectImage": "Imagen siguiente",
        "accessibility.projectOneImage": "Espacio reservado para la imagen del proyecto TaskFlow",
        "accessibility.projectTwoImage": "Espacio reservado para la imagen del sistema de restaurante",
        "accessibility.projectThreeImage": "Espacio reservado para la imagen del proyecto en Roblox",
        "accessibility.technologies": "Tecnologías utilizadas",
        "accessibility.badgeOne": "Placeholder para la insignia uno",
        "accessibility.badgeTwo": "Placeholder para la insignia dos",
        "accessibility.badgeThree": "Placeholder para la insignia tres",
        "accessibility.cvPreview": "Vista previa del currículum de Alejandro Lira",
        "accessibility.previewCv": "Abrir el currículum",
        "accessibility.closeCvPreview": "Cerrar el currículum",
        "accessibility.openCvNewTab": "Abrir el CV en una pestaña nueva",
        "accessibility.downloadCv": "Descargar el CV",
        "accessibility.closeProject": "Cerrar detalles del proyecto",

        "nav.home": "Inicio",
        "nav.projects": "Proyectos",
        "nav.badges": "Insignias",
        "nav.profile": "Perfil",
        "nav.cv": "CV",
        "nav.contact": "Contacto",

        "hero.availability": "Disponible para prácticas",
        "hero.greeting": "Hola, soy Alejandro",
        "hero.titleMain": "Desarrollador",
        "hero.titleAccent": "de Software.",
        "hero.summary": "Estudiante de Desarrollo de Software enfocado en crear experiencias claras, modernas y bien pensadas.",

        "placeholders.mainImage": "Imagen principal",
        "placeholders.placeholder": "Placeholder",
        "placeholders.photoPath": "Add assets/images/profile/alejandro.jpg",
        "placeholders.projectCapture": "Captura del proyecto",

        "actions.viewProjects": "Ver proyectos",
        "actions.viewCv": "Ver CV",
        "actions.previewCv": "Ver currículum",
        "actions.openCv": "Abrir CV",
        "actions.downloadCv": "Descargar CV",
        "actions.email": "Correo",
        "actions.viewProject": "Ver proyecto",
        "actions.viewDemo": "Ver demostración",
        "actions.viewCode": "Ver código",
        "actions.viewCaseStudy": "Ver caso de estudio",
        "actions.viewDetails": "Ver detalles",
        "actions.sendEmail": "Enviar correo",
        "actions.contactMe": "Contactarme",
        "actions.backToTop": "Volver arriba",

        "projects.eyebrow": "Proyectos destacados",
        "projects.titleMain": "Ideas que convertí",
        "projects.titleAccent": "en experiencias reales.",
        "projects.introduction": "Explora los proyectos y abre cada uno para ver sus imágenes y descripción.",
        "projects.aboutProject": "Sobre el proyecto",
        "projects.technologiesLabel": "Tecnologías",
        "projects.projectLabel": "Proyecto",
        "projects.imageUnavailable": "Imagen no disponible",
        "projects.goToProject": "Ir al proyecto",
        "projects.goToImage": "Ir a la imagen",
        "projects.projectOneNumber": "Proyecto 01",
        "projects.projectOneType": "Aplicación web",
        "projects.projectOneSummary": "Organización de tareas con interfaz limpia y clara.",
        "projects.projectTwoNumber": "Proyecto 02",
        "projects.projectTwoType": "Software académico",
        "projects.projectTwoName": "Sistema de restaurante",
        "projects.projectTwoSummary": "Simulación con prioridades, pedidos y procesos.",
        "projects.projectThreeNumber": "Proyecto 03",
        "projects.projectThreeType": "Experiencia interactiva",
        "projects.projectThreeName": "Proyecto en Roblox",
        "projects.projectThreeSummary": "Sistemas, UI y controles pensados para varios dispositivos.",
        "projects.oop": "POO",
        "projects.threads": "Hilos",

        "badges.titleMain": "Insignias",
        "badges.titleAccent": "y certificaciones.",
        "badges.viewAll": "Ver todas en Credly",
        "badges.placeholderName": "Nombre de la insignia",
        "badges.issuer": "Organización emisora",
        "badges.more": "Más insignias",
        "badges.moreDescription": "Agrega aquí otras credenciales o cursos.",

        "profile.eyebrow": "Perfil",
        "profile.titleMain": "Un poco sobre mí",
        "profile.titleAccent": "y cómo trabajo.",
        "profile.introduction": "Aquí puedes conocer un poco más sobre mí, las herramientas con las que trabajo y algunas experiencias que han formado mi camino como desarrollador.",
        "profile.about": "Sobre mí",
        "profile.learning": "Aprendo creando.",
        "profile.summary": "Me interesa construir soluciones útiles, bien estructuradas y agradables de usar. Busco una oportunidad donde pueda seguir creciendo en desarrollo de software y aportar con proyectos reales.",
        "profile.mexico": "Monterrey, Nuevo León, México",
        "profile.student": "Estudiante",
        "profile.internships": "Prácticas profesionales",
        "profile.tools": "Herramientas",
        "profile.events": "Eventos",
        "profile.eventOne": "Nombre del evento",
        "profile.eventTwo": "Taller de tecnología",
        "profile.eventThree": "Conferencia de software",
        "profile.available": "Disponible para prácticas",
        "profile.role": "Desarrollo de Software",
        "profile.locationLabel": "Ubicación",
        "profile.educationLabel": "Formación",
        "profile.educationValue": "Desarrollo de Software",
        "profile.educationInstitution": "Universidad Tecmilenio",
        "profile.educationStatus": "En curso",
        "profile.focusLabel": "Enfoque",
        "profile.focusValue": "Aplicaciones accesibles y multiplataforma",
        "profile.crossPlatform": "Multiplataforma",
        "profile.detailsTitle": "Información profesional",
        "profile.tabsAria": "Información del perfil",
        "profile.languages": "Idiomas",
        "profile.highlights": "Logros",
        "profile.stackEyebrow": "Stack técnico",
        "profile.stackTitle": "Herramientas con las que construyo.",
        "profile.stackDescription": "Tecnologías que he utilizado en aplicaciones móviles, proyectos web, bases de datos y experiencias interactivas.",
        "profile.mobile": "Desarrollo móvil",
        "profile.interfaces": "Interfaces",
        "profile.development": "Desarrollo",
        "profile.backend": "Backend y datos",
        "profile.web": "Desarrollo web",
        "profile.software": "Software",
        "profile.logic": "Lógica y datos",
        "profile.databases": "Bases de datos",
        "profile.versionControl": "Control de versiones",
        "profile.design": "Diseño de interfaz",
        "profile.creation3d": "Creación 3D",
        "profile.communication": "Comunicación",
        "profile.languagesTitle": "Idiomas que utilizo.",
        "profile.languagesDescription": "Me comunico de forma nativa en español y utilizo inglés para documentación, cursos y contenido técnico.",
        "profile.native": "Nativo",
        "profile.spanish": "Español",
        "profile.spanishUse": "Comunicación diaria, presentaciones y documentación de proyectos.",
        "profile.upperIntermediate": "Intermedio alto",
        "profile.english": "Inglés",
        "profile.englishUse": "Lectura técnica, cursos, investigación y comunicación profesional.",
        "profile.highlightsEyebrow": "Logros",
        "profile.highlightsTitle": "Experiencias que respaldan mi perfil.",
        "profile.highlightsDescription": "Una selección breve de resultados académicos y proyectos relevantes dentro de mi formación.",
        "profile.firstPlace": "1er lugar",
        "profile.inclusiveClassroom": "Aula Inclusiva",
        "profile.inclusiveDescription": "Reconocimiento de Tecmilenio por KiPP, una aplicación educativa accesible.",
        "profile.multiPlatformTitle": "Desarrollo multiplataforma",
        "profile.multiPlatformDescription": "Experiencia creando productos para iPhone, iPad, Mac y dispositivos Android.",
        "profile.certifications": "Insignias y certificaciones",
        "profile.certificationsDescription": "Formación complementaria en desarrollo, datos, nube, redes y ciberseguridad.",
        "profile.previousTools": "Herramientas anteriores",
        "profile.nextTools": "Siguientes herramientas",

        "cv.eyebrow": "Currículum",
        "cv.titleMain": "Conoce mi trayectoria",
        "cv.titleAccent": "profesional.",
        "cv.introduction": "Consulta mi formación, proyectos, tecnologías y certificaciones en un currículum claro y directo.",
        "cv.quickView": "Sobre mi CV",
        "cv.cardTitle": "Mi trayectoria en un solo documento.",
        "cv.cardDescription": "Conoce mi formación en Desarrollo de Software, los proyectos que he desarrollado y las tecnologías y certificaciones que respaldan mi perfil.",
        "cv.summaryEducation": "Formación",
        "cv.summaryProjects": "Proyectos",
        "cv.summarySkills": "Tecnologías",
        "cv.summaryCertifications": "Certificaciones",
        "cv.summaryLanguages": "Idiomas",
        "cv.previewPage": "Perfil profesional",
        "cv.previewHint": "Haz clic para abrir el currículum",
        "cv.documentLabel": "Currículum",
        "cv.profileLabel": "Perfil profesional",
        "cv.profileName": "Alejandro Lira",
        "cv.profileRole": "Desarrollo de Software",
        "cv.compactDescription": "Estudiante enfocado en crear soluciones accesibles, multiplataforma y bien estructuradas.",
        "cv.highlightMobile": "Aplicaciones móviles y multiplataforma",
        "cv.highlightWeb": "Desarrollo web y bases de datos",
        "cv.highlightAccessibility": "Accesibilidad y experiencia de usuario",
        "cv.formatLabel": "Trayectoria profesional",
        "cv.previewAvailable": "Disponible para consulta",
        "cv.viewerEyebrow": "Currículum profesional",
        "cv.viewerTitle": "Alejandro Lira · Currículum",
        "cv.viewerHelp": "También puedes abrirlo en una pestaña nueva o descargar una copia.",
        "cv.coverName": "Alejandro Lira",
        "cv.coverRole": "Desarrollo de Software",
        "cv.previewError": "No se pudo cargar la vista del currículum",
        "cv.fileName": "Alejandro-Lira-CV.pdf",
        "cv.fallbackTitle": "La vista previa no está disponible en este navegador.",
        "cv.fallbackDescription": "Puedes abrir el PDF en una pestaña nueva sin descargarlo.",
        "cv.contactTitle": "¿Te interesa mi perfil?",
        "cv.contactDescription": "Escríbeme después de revisar el CV y conversemos sobre la oportunidad.",

        "contact.eyebrow": "Contacto",
        "contact.titleMain": "Estoy listo para una",
        "contact.titleAccent": "oportunidad profesional.",
        "contact.summary": "Si buscas a alguien con ganas de aprender y construir buenas experiencias, me encantará hablar contigo.",
        "contact.emailLabel": "Correo directo",
        "contact.linkedinAction": "Conectar",
        "contact.githubAction": "Ver código",

        "dialogs.problem": "Problema",
        "dialogs.contribution": "Mi aporte",
        "dialogs.accessibility": "Accesibilidad",
        "dialogs.result": "Resultado",
        "dialogs.taskflowIntroduction": "Aplicación para administrar tareas con una interfaz limpia, clara y accesible.",
        "dialogs.taskflowProblem": "Organizar tareas y prioridades de manera simple sin confundir al usuario.",
        "dialogs.taskflowContribution": "Diseñé la estructura, la interfaz y la lógica principal.",
        "dialogs.taskflowAccessibility": "Cuidé foco visible, navegación por teclado y jerarquía clara.",
        "dialogs.restaurantIntroduction": "Proyecto académico enfocado en estructuras de datos y concurrencia.",
        "dialogs.restaurantProblem": "Coordinar pedidos, cocineros y prioridades dentro del mismo flujo.",
        "dialogs.restaurantContribution": "Implementé la lógica con listas, colas, prioridades y procesos.",
        "dialogs.restaurantResult": "Una simulación clara y modular del flujo de atención.",
        "dialogs.robloxIntroduction": "Experiencia interactiva con sistemas conectados y soporte para varios dispositivos.",
        "dialogs.robloxProblem": "Mantener una experiencia consistente entre teclado, ratón y control.",
        "dialogs.robloxContribution": "Programé sistemas, UI, guardado y flujo de interacción.",
        "dialogs.robloxAccessibility": "Incluí alternativas de control y señales visuales más claras.",

        themeDark: "Activar modo oscuro",
        themeLight: "Activar modo claro",
        languageSwitch: "Cambiar a inglés",
        menuOpen: "Abrir menú",
        menuClose: "Cerrar menú",
        themeDarkAnnouncement: "Modo oscuro activado.",
        themeLightAnnouncement: "Modo claro activado.",
        languageAnnouncement: "Idioma cambiado a español.",
        placeholderAnnouncement: "Este enlace todavía es un placeholder. Agrega la URL real."
    },

    en: {
        documentTitle: "Alejandro Lira | Software Development",
        metaDescription: "Portfolio of Alejandro Lira, a Software Development student.",

        "accessibility.skip": "Skip to content",
        "accessibility.goHome": "Go to home",
        "accessibility.mainNav": "Main navigation",
        "accessibility.mobileNav": "Mobile navigation",
        "accessibility.languageGroup": "Site language",
        "accessibility.heroPlaceholder": "Reserved space for the main image",
        "accessibility.heroPhoto": "Alejandro Lira, software developer",
        "accessibility.projectsCarousel": "Projects carousel",
        "accessibility.previousProjects": "View previous projects",
        "accessibility.nextProjects": "View more projects",
        "accessibility.projectGallery": "Project image gallery",
        "accessibility.previousProjectImage": "Previous image",
        "accessibility.nextProjectImage": "Next image",
        "accessibility.projectOneImage": "Reserved space for the TaskFlow project image",
        "accessibility.projectTwoImage": "Reserved space for the restaurant system image",
        "accessibility.projectThreeImage": "Reserved space for the Roblox project image",
        "accessibility.technologies": "Technologies used",
        "accessibility.badgeOne": "Placeholder for badge one",
        "accessibility.badgeTwo": "Placeholder for badge two",
        "accessibility.badgeThree": "Placeholder for badge three",
        "accessibility.cvPreview": "Preview of Alejandro Lira's resume",
        "accessibility.previewCv": "Open the resume",
        "accessibility.closeCvPreview": "Close the resume",
        "accessibility.openCvNewTab": "Open the resume in a new tab",
        "accessibility.downloadCv": "Download the resume",
        "accessibility.closeProject": "Close project details",

        "nav.home": "Home",
        "nav.projects": "Projects",
        "nav.badges": "Badges",
        "nav.profile": "Profile",
        "nav.cv": "Resume",
        "nav.contact": "Contact",

        "hero.availability": "Available for internships",
        "hero.greeting": "Hi, I'm Alejandro",
        "hero.titleMain": "Software",
        "hero.titleAccent": "Developer.",
        "hero.summary": "Software Development student focused on creating clear, modern and thoughtfully designed experiences.",

        "placeholders.mainImage": "Main image",
        "placeholders.placeholder": "Placeholder",
        "placeholders.projectCapture": "Project screenshot",

        "actions.viewProjects": "View projects",
        "actions.viewCv": "View resume",
        "actions.previewCv": "View resume",
        "actions.openCv": "Open resume",
        "actions.downloadCv": "Download resume",
        "actions.email": "Email",
        "actions.viewProject": "View project",
        "actions.viewDemo": "View demo",
        "actions.viewCode": "View code",
        "actions.viewCaseStudy": "View case study",
        "actions.viewDetails": "View details",
        "actions.sendEmail": "Send email",
        "actions.contactMe": "Contact me",
        "actions.backToTop": "Back to top",

        "projects.eyebrow": "Featured projects",
        "projects.titleMain": "Ideas I turned",
        "projects.titleAccent": "into real experiences.",
        "projects.introduction": "Explore the projects and open each one to view its images and description.",
        "projects.aboutProject": "About the project",
        "projects.technologiesLabel": "Technologies",
        "projects.projectLabel": "Project",
        "projects.imageUnavailable": "Image unavailable",
        "projects.goToProject": "Go to project",
        "projects.goToImage": "Go to image",
        "projects.projectOneNumber": "Project 01",
        "projects.projectOneType": "Web application",
        "projects.projectOneSummary": "Task organization with a clean and clear interface.",
        "projects.projectTwoNumber": "Project 02",
        "projects.projectTwoType": "Academic software",
        "projects.projectTwoName": "Restaurant system",
        "projects.projectTwoSummary": "A simulation with priorities, orders and processes.",
        "projects.projectThreeNumber": "Project 03",
        "projects.projectThreeType": "Interactive experience",
        "projects.projectThreeName": "Roblox project",
        "projects.projectThreeSummary": "Systems, UI and controls designed for multiple devices.",
        "projects.oop": "OOP",
        "projects.threads": "Threads",

        "badges.titleMain": "Badges",
        "badges.titleAccent": "and certifications.",
        "badges.viewAll": "View all on Credly",
        "badges.placeholderName": "Badge name",
        "badges.issuer": "Issuing organization",
        "badges.more": "More badges",
        "badges.moreDescription": "Add other credentials or courses here.",

        "profile.eyebrow": "Profile",
        "profile.titleMain": "A little about me",
        "profile.titleAccent": "and how I work.",
        "profile.introduction": "Here you can learn a little more about me, the tools I work with, and some of the experiences that have shaped my path as a developer.",
        "profile.about": "About me",
        "profile.learning": "I learn by building.",
        "profile.summary": "I enjoy building useful, well-structured and pleasant-to-use solutions. I am looking for an opportunity where I can keep growing as a software developer and contribute to real projects.",
        "profile.mexico": "Monterrey, Nuevo León, Mexico",
        "profile.student": "Student",
        "profile.internships": "Professional internships",
        "profile.tools": "Tools",
        "profile.events": "Events",
        "profile.eventOne": "Event name",
        "profile.eventTwo": "Technology workshop",
        "profile.eventThree": "Software conference",
        "profile.available": "Available for internships",
        "profile.role": "Software Development",
        "profile.locationLabel": "Location",
        "profile.educationLabel": "Education",
        "profile.educationValue": "Software Development",
        "profile.educationInstitution": "Universidad Tecmilenio",
        "profile.educationStatus": "Currently enrolled",
        "profile.focusLabel": "Focus",
        "profile.focusValue": "Accessible and cross-platform applications",
        "profile.crossPlatform": "Cross-platform",
        "profile.detailsTitle": "Professional information",
        "profile.tabsAria": "Profile information",
        "profile.languages": "Languages",
        "profile.highlights": "Highlights",
        "profile.stackEyebrow": "Technical stack",
        "profile.stackTitle": "Tools I use to build products.",
        "profile.stackDescription": "Technologies I have used in mobile applications, web projects, databases, and interactive experiences.",
        "profile.mobile": "Mobile development",
        "profile.interfaces": "Interfaces",
        "profile.development": "Development",
        "profile.backend": "Backend and data",
        "profile.web": "Web development",
        "profile.software": "Software",
        "profile.logic": "Logic and data",
        "profile.databases": "Databases",
        "profile.versionControl": "Version control",
        "profile.design": "Interface design",
        "profile.creation3d": "3D creation",
        "profile.communication": "Communication",
        "profile.languagesTitle": "Languages I use.",
        "profile.languagesDescription": "I communicate natively in Spanish and use English for documentation, courses, and technical content.",
        "profile.native": "Native",
        "profile.spanish": "Spanish",
        "profile.spanishUse": "Daily communication, presentations, and project documentation.",
        "profile.upperIntermediate": "Upper-intermediate",
        "profile.english": "English",
        "profile.englishUse": "Technical reading, courses, research, and professional communication.",
        "profile.highlightsEyebrow": "Highlights",
        "profile.highlightsTitle": "Experiences that support my profile.",
        "profile.highlightsDescription": "A brief selection of academic results and relevant projects from my education.",
        "profile.firstPlace": "1st place",
        "profile.inclusiveClassroom": "Inclusive Classroom",
        "profile.inclusiveDescription": "Tecmilenio recognition for KiPP, an accessible educational application.",
        "profile.multiPlatformTitle": "Cross-platform development",
        "profile.multiPlatformDescription": "Experience building products for iPhone, iPad, Mac, and Android devices.",
        "profile.certifications": "Badges and certifications",
        "profile.certificationsDescription": "Additional education in development, data, cloud, networking, and cybersecurity.",
        "profile.previousTools": "Previous tools",
        "profile.nextTools": "Next tools",

        "cv.eyebrow": "Resume",
        "cv.titleMain": "Explore my professional",
        "cv.titleAccent": "background.",
        "cv.introduction": "Review my education, projects, technologies and certifications in a clear and focused resume.",
        "cv.quickView": "About my resume",
        "cv.cardTitle": "My background in one clear document.",
        "cv.cardDescription": "Explore my Software Development education, the projects I have built, and the technologies and certifications that support my profile.",
        "cv.summaryEducation": "Education",
        "cv.summaryProjects": "Projects",
        "cv.summarySkills": "Technologies",
        "cv.summaryCertifications": "Certifications",
        "cv.summaryLanguages": "Languages",
        "cv.previewPage": "Professional profile",
        "cv.previewHint": "Click to open the resume",
        "cv.documentLabel": "Resume",
        "cv.profileLabel": "Professional profile",
        "cv.profileName": "Alejandro Lira",
        "cv.profileRole": "Software Development",
        "cv.compactDescription": "A student focused on building accessible, cross-platform and well-structured solutions.",
        "cv.highlightMobile": "Mobile and cross-platform applications",
        "cv.highlightWeb": "Web development and databases",
        "cv.highlightAccessibility": "Accessibility and user experience",
        "cv.formatLabel": "Professional background",
        "cv.previewAvailable": "Available to review",
        "cv.viewerEyebrow": "Professional resume",
        "cv.viewerTitle": "Alejandro Lira · Resume",
        "cv.viewerHelp": "You can also open it in a new tab or download a copy.",
        "cv.coverName": "Alejandro Lira",
        "cv.coverRole": "Software Development",
        "cv.previewError": "The resume preview could not be loaded",
        "cv.fileName": "Alejandro-Lira-CV.pdf",
        "cv.fallbackTitle": "The preview is not available in this browser.",
        "cv.fallbackDescription": "You can open the PDF in a new tab without downloading it.",
        "cv.contactTitle": "Interested in my profile?",
        "cv.contactDescription": "Send me a message after reviewing the resume and let's discuss the opportunity.",

        "contact.eyebrow": "Contact",
        "contact.titleMain": "I am ready for a",
        "contact.titleAccent": "professional opportunity.",
        "contact.summary": "If you are looking for someone eager to learn and build thoughtful experiences, I would be happy to talk.",
        "contact.emailLabel": "Direct email",
        "contact.linkedinAction": "Connect",
        "contact.githubAction": "View code",

        "dialogs.problem": "Problem",
        "dialogs.contribution": "My contribution",
        "dialogs.accessibility": "Accessibility",
        "dialogs.result": "Outcome",
        "dialogs.taskflowIntroduction": "A task management application with a clean, clear and accessible interface.",
        "dialogs.taskflowProblem": "Organize tasks and priorities simply without confusing the user.",
        "dialogs.taskflowContribution": "I designed the structure, interface and main logic.",
        "dialogs.taskflowAccessibility": "I included visible focus, keyboard navigation and a clear hierarchy.",
        "dialogs.restaurantIntroduction": "An academic project focused on data structures and concurrency.",
        "dialogs.restaurantProblem": "Coordinate orders, cooks and priorities within the same workflow.",
        "dialogs.restaurantContribution": "I implemented the logic using lists, queues, priorities and concurrent processes.",
        "dialogs.restaurantResult": "A clear and modular simulation of the service workflow.",
        "dialogs.robloxIntroduction": "An interactive experience with connected systems and support for multiple devices.",
        "dialogs.robloxProblem": "Keep the experience consistent across keyboard, mouse and gamepad.",
        "dialogs.robloxContribution": "I programmed systems, UI, data saving and interaction flows.",
        "dialogs.robloxAccessibility": "I included alternative controls and clearer visual feedback.",

        themeDark: "Enable dark mode",
        themeLight: "Enable light mode",
        languageSwitch: "Cambiar a español",
        menuOpen: "Open menu",
        menuClose: "Close menu",
        themeDarkAnnouncement: "Dark mode enabled.",
        themeLightAnnouncement: "Light mode enabled.",
        languageAnnouncement: "Language changed to English.",
        placeholderAnnouncement: "This link is still a placeholder. Add the real URL."
    }
};

function announce(message) {
    if (!statusMessage) {
        return;
    }

    statusMessage.textContent = "";

    window.setTimeout(() => {
        statusMessage.textContent = message;
    }, 50);
}


function currentLanguage() {
    return root.dataset.language === "en" ? "en" : "es";
}


function currentCopy() {
    return translations[currentLanguage()];
}


function saveLanguage(language) {
    try {
        localStorage.setItem("portfolio-language", language);
    } catch {
        // La página continúa aunque el navegador no permita guardar preferencias.
    }
}


function updateLanguageControl(language) {
    languageOptions.forEach((option) => {
        const isSelected = option.dataset.language === language;

        option.classList.toggle("active", isSelected);
        option.setAttribute("aria-pressed", String(isSelected));
    });
}


function applyLanguage(language, shouldAnnounce = false) {
    const safeLanguage = language === "en" ? "en" : "es";
    const copy = translations[safeLanguage];

    root.dataset.language = safeLanguage;
    root.lang = safeLanguage;
    saveLanguage(safeLanguage);

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.dataset.i18n;

        if (copy[key] !== undefined) {
            element.textContent = copy[key];
        }
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
        const key = element.dataset.i18nAria;

        if (copy[key] !== undefined) {
            element.setAttribute("aria-label", copy[key]);
        }
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
        const key = element.dataset.i18nAlt;

        if (copy[key] !== undefined) {
            element.setAttribute("alt", copy[key]);
        }
    });

    renderProjects(safeLanguage);
    refreshOpenProjectDialog(safeLanguage);

    document.title = copy.documentTitle;

    if (metaDescription) {
        metaDescription.setAttribute("content", copy.metaDescription);
    }

    updateLanguageControl(safeLanguage);
    updateThemeButton(currentTheme());
    updateMenuButtonLabel();

    if (shouldAnnounce) {
        announce(copy.languageAnnouncement);
    }
}


let languageTransitionInProgress = false;
let languageApplyTimer = null;
let languageFinishTimer = null;


function changeLanguage(language) {
    const safeLanguage = language === "en" ? "en" : "es";

    if (
        safeLanguage === currentLanguage() ||
        languageTransitionInProgress
    ) {
        return;
    }

    const announceLanguageChange = () => {
        announce(translations[safeLanguage].languageAnnouncement);
    };

    if (reducedMotionQuery.matches) {
        applyLanguage(safeLanguage, false);
        announceLanguageChange();
        return;
    }

    languageTransitionInProgress = true;

    languageSwitch?.setAttribute(
        "data-pending-language",
        safeLanguage
    );

    window.clearTimeout(languageApplyTimer);
    window.clearTimeout(languageFinishTimer);

    /*
        La pastilla comienza a deslizarse y el contenido cambia
        a mitad del recorrido. No se anima ni se captura la página.
    */
    languageApplyTimer = window.setTimeout(() => {
        applyLanguage(safeLanguage, false);
    }, 105);

    languageFinishTimer = window.setTimeout(() => {
        languageSwitch?.removeAttribute(
            "data-pending-language"
        );

        languageTransitionInProgress = false;
        announceLanguageChange();
    }, 285);
}

function currentTheme() {
    return root.dataset.theme === "dark" ? "dark" : "light";
}


function saveTheme(theme) {
    try {
        localStorage.setItem("portfolio-theme", theme);
    } catch {
        // La página continúa aunque localStorage no esté disponible.
    }
}


function updateThemeButton(theme) {
    const isDark = theme === "dark";
    const copy = currentCopy();

    if (!themeButton) {
        return;
    }

    themeButton.setAttribute("aria-pressed", String(isDark));
    themeButton.setAttribute(
        "aria-label",
        isDark ? copy.themeLight : copy.themeDark
    );

    themeButton.dataset.currentTheme = theme;
}


function setTheme(theme, shouldAnnounce = true) {
    const safeTheme = theme === "dark" ? "dark" : "light";

    root.dataset.theme = safeTheme;
    saveTheme(safeTheme);
    updateThemeButton(safeTheme);

    if (shouldAnnounce) {
        const copy = currentCopy();

        announce(
            safeTheme === "dark"
                ? copy.themeDarkAnnouncement
                : copy.themeLightAnnouncement
        );
    }
}


function getEventPosition(event) {
    /*
        El origen visual siempre se obtiene del centro real del botón,
        no de clientX/clientY. En algunas combinaciones de Chrome,
        escalado de pantalla y View Transition, el clic y el snapshot
        pueden terminar usando espacios de coordenadas distintos.

        También guardamos porcentajes relativos al viewport. El clip
        circular usa esos porcentajes para permanecer alineado aunque
        Chrome escale internamente la captura.
    */
    const buttonBounds = themeButton?.getBoundingClientRect();

    const viewportWidth =
        document.documentElement.clientWidth ||
        window.innerWidth ||
        1;

    const viewportHeight =
        document.documentElement.clientHeight ||
        window.innerHeight ||
        1;

    let x = buttonBounds
        ? buttonBounds.left + buttonBounds.width / 2
        : Number.isFinite(event?.clientX)
            ? event.clientX
            : viewportWidth * 0.88;

    let y = buttonBounds
        ? buttonBounds.top + buttonBounds.height / 2
        : Number.isFinite(event?.clientY)
            ? event.clientY
            : 44;

    x = Math.min(Math.max(x, 0), viewportWidth);
    y = Math.min(Math.max(y, 0), viewportHeight);

    return {
        x,
        y,
        xPercent: (x / viewportWidth) * 100,
        yPercent: (y / viewportHeight) * 100,
        viewportWidth,
        viewportHeight
    };
}


let themeTransitionInProgress = false;
let activeThemeTransition = null;
let activeThemeAnimation = null;

let themeDebounceTimer = null;
let themeSafetyTimer = null;
let themeDebounceUntil = 0;
let themeTransitionRunId = 0;

const THEME_TRANSITION_DURATION = 560;
const THEME_CLICK_DEBOUNCE = 240;
const THEME_SAFETY_TIMEOUT = 1800;


function setThemeButtonBusy(isBusy) {
    if (!themeButton) {
        return;
    }

    /*
        No se deshabilita físicamente. Las pulsaciones repetidas
        siguen llegando para reiniciar el mismo debounce fijo.
    */
    themeButton.setAttribute(
        "aria-busy",
        isBusy ? "true" : "false"
    );

    themeButton.dataset.themeBusy =
        isBusy ? "true" : "false";
}


function clearThemeSafetyTimer() {
    window.clearTimeout(themeSafetyTimer);
    themeSafetyTimer = null;
}


function resetThemeDebounce() {
    themeDebounceUntil =
        performance.now() + THEME_CLICK_DEBOUNCE;

    window.clearTimeout(themeDebounceTimer);

    themeDebounceTimer = window.setTimeout(() => {
        if (!themeTransitionInProgress) {
            setThemeButtonBusy(false);
        }
    }, THEME_CLICK_DEBOUNCE);
}


function releaseThemeButtonWhenReady() {
    const remaining =
        themeDebounceUntil - performance.now();

    window.clearTimeout(themeDebounceTimer);

    if (remaining > 0) {
        themeDebounceTimer = window.setTimeout(() => {
            if (!themeTransitionInProgress) {
                setThemeButtonBusy(false);
            }
        }, remaining);

        return;
    }

    setThemeButtonBusy(false);
}


function cancelActiveThemeAnimation() {
    try {
        activeThemeAnimation?.cancel();
    } catch {
        /* La animación ya pudo haber terminado. */
    }

    activeThemeAnimation = null;
}


function safelySkipThemeTransition(
    transition = activeThemeTransition
) {
    try {
        transition?.skipTransition();
    } catch {
        /* La transición ya pudo haber terminado. */
    }
}


function finishThemeTransition(nextTheme, runId) {
    if (
        runId !== themeTransitionRunId ||
        !themeTransitionInProgress
    ) {
        return;
    }

    clearThemeSafetyTimer();
    cancelActiveThemeAnimation();

    root.classList.remove("theme-transition");
    document.body.classList.remove("theme-animating");

    activeThemeTransition = null;
    themeTransitionInProgress = false;

    releaseThemeButtonWhenReady();

    const copy = currentCopy();

    announce(
        nextTheme === "dark"
            ? copy.themeDarkAnnouncement
            : copy.themeLightAnnouncement
    );
}


function playFallbackThemeAnimation(event, nextTheme, runId) {
    if (!themeOverlay) {
        setTheme(nextTheme, false);
        finishThemeTransition(nextTheme, runId);
        return;
    }

    const { x, y } = getEventPosition(event);

    themeOverlay.style.setProperty(
        "--theme-x",
        `${Math.round((x / window.innerWidth) * 100)}%`
    );

    themeOverlay.style.setProperty(
        "--theme-y",
        `${Math.round((y / window.innerHeight) * 100)}%`
    );

    document.body.classList.remove("theme-animating");
    void document.body.offsetWidth;
    document.body.classList.add("theme-animating");

    window.setTimeout(() => {
        if (runId !== themeTransitionRunId) {
            return;
        }

        setTheme(nextTheme, false);
    }, 80);

    window.setTimeout(() => {
        finishThemeTransition(nextTheme, runId);
    }, 650);
}


function toggleTheme(event) {
    /*
        Cada pulsación reinicia exactamente el mismo debounce.
        El tiempo nunca se acumula ni aumenta.
    */
    resetThemeDebounce();

    /*
        Mientras una transición está activa, las pulsaciones nuevas
        se descartan. No forman cola y no crean otra captura.
    */
    if (
        themeTransitionInProgress ||
        activeThemeTransition ||
        document.activeViewTransition
    ) {
        return;
    }

    const nextTheme =
        currentTheme() === "dark" ? "light" : "dark";

    themeTransitionInProgress = true;
    const runId = ++themeTransitionRunId;

    setThemeButtonBusy(true);

    if (reducedMotionQuery.matches) {
        setTheme(nextTheme, false);
        finishThemeTransition(nextTheme, runId);
        return;
    }

    if (!document.startViewTransition) {
        playFallbackThemeAnimation(
            event,
            nextTheme,
            runId
        );

        return;
    }

    const {
        xPercent,
        yPercent
    } = getEventPosition(event);

    /*
        El porcentaje de circle() se calcula usando la caja real del
        snapshot de View Transition, no el viewport que reporta JavaScript.

        Desde cualquier punto dentro de un rectángulo, 150% supera la
        distancia máxima posible hasta la esquina opuesta. Por eso cubre
        completamente el snapshot aunque Chrome use escalado, zoom,
        scrollbars o una relación de aspecto diferente.
    */
    const endRadius = "150%";

    root.classList.add("theme-transition");

    let transition;

    try {
        /*
            Este es el comportamiento original: Chrome captura el
            estado anterior, cambia el tema y revela la nueva captura.
            No hay warm-up ni procesamiento adicional.
        */
        transition = document.startViewTransition(() => {
            setTheme(nextTheme, false);
        });
    } catch {
        setTheme(nextTheme, false);
        finishThemeTransition(nextTheme, runId);
        return;
    }

    activeThemeTransition = transition;

    clearThemeSafetyTimer();

    themeSafetyTimer = window.setTimeout(() => {
        if (
            runId !== themeTransitionRunId ||
            transition !== activeThemeTransition
        ) {
            return;
        }

        safelySkipThemeTransition(transition);
    }, THEME_SAFETY_TIMEOUT);

    transition.ready
        .then(() => {
            if (
                runId !== themeTransitionRunId ||
                transition !== activeThemeTransition
            ) {
                return;
            }

            activeThemeAnimation = root.animate(
                {
                    clipPath: [
                        `circle(0px at ${xPercent}% ${yPercent}%)`,
                        `circle(${endRadius} at ${xPercent}% ${yPercent}%)`
                    ]
                },
                {
                    duration: THEME_TRANSITION_DURATION,
                    easing: "cubic-bezier(.22, 1, .36, 1)",
                    fill: "both",
                    pseudoElement:
                        "::view-transition-new(root)"
                }
            );
        })
        .catch(() => {});

    transition.updateCallbackDone
        .catch(() => {
            if (runId === themeTransitionRunId) {
                setTheme(nextTheme, false);
            }
        });

    transition.finished
        .catch(() => {
            if (runId === themeTransitionRunId) {
                setTheme(nextTheme, false);
            }
        })
        .finally(() => {
            if (
                runId === themeTransitionRunId &&
                transition === activeThemeTransition
            ) {
                finishThemeTransition(nextTheme, runId);
            }
        });
}


document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
        safelySkipThemeTransition(activeThemeTransition);
    }
});


window.addEventListener("pagehide", () => {
    safelySkipThemeTransition(activeThemeTransition);
});

function updateHeader() {
    siteHeader?.classList.toggle("scrolled", window.scrollY > 16);
}


function updateMenuButtonLabel() {
    if (!menuButton || !mobileNav) {
        return;
    }

    const copy = currentCopy();
    const isOpen = !mobileNav.hidden;

    menuButton.setAttribute(
        "aria-label",
        isOpen ? copy.menuClose : copy.menuOpen
    );
}


function openMenu() {
    if (!menuButton || !mobileNav) {
        return;
    }

    mobileNav.hidden = false;
    menuButton.classList.add("active");
    menuButton.setAttribute("aria-expanded", "true");
    updateMenuButtonLabel();

    document.body.classList.add("menu-open");
    mobileNav.querySelector("a")?.focus();
}


function closeMenu(returnFocus = false) {
    if (!menuButton || !mobileNav) {
        return;
    }

    mobileNav.hidden = true;
    menuButton.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
    updateMenuButtonLabel();

    document.body.classList.remove("menu-open");

    if (returnFocus) {
        menuButton.focus();
    }
}


function setActiveNavigation(sectionId) {
    sectionNavigationLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${sectionId}`;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}


function getNavigationOffset() {
    return (siteHeader?.offsetHeight || 78) + 18;
}


function getNavigationActivationMarker() {
    /*
        El enlace activo no se calcula justo debajo del header.
        Se utiliza una línea situada aproximadamente al primer
        tercio de la pantalla, donde el usuario ya percibe que
        entró visualmente a la siguiente sección.
    */

    const headerMarker =
        getNavigationOffset() + 2;

    const viewportMarker =
        window.innerHeight * 0.32;

    const maximumMarker =
        getNavigationOffset() + 220;

    return Math.max(
        headerMarker,
        Math.min(
            viewportMarker,
            maximumMarker
        )
    );
}


function calculateActiveSection() {
    const marker =
        getNavigationActivationMarker();

    let activeSectionId =
        pageSections[0]?.id || "inicio";

    for (const section of pageSections) {
        const bounds =
            section.getBoundingClientRect();

        /*
            La última sección cuyo inicio haya cruzado la línea
            de activación se considera la sección actual.
        */

        if (bounds.top <= marker) {
            activeSectionId = section.id;
        } else {
            break;
        }
    }

    /*
        Al llegar al final de la página se fuerza la última sección,
        incluso cuando su altura es menor que el viewport.
    */

    const nearPageBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 24;

    if (nearPageBottom) {
        return (
            pageSections.at(-1)?.id ||
            activeSectionId
        );
    }

    return activeSectionId;
}


let navigationLockId = null;
let navigationLockTimer = null;
let navigationArrivalTimer = null;
let scrollUpdatePending = false;


function clearNavigationLock(updateAfterClear = true) {
    navigationLockId = null;

    window.clearTimeout(navigationLockTimer);
    window.clearTimeout(navigationArrivalTimer);

    if (updateAfterClear) {
        updateActiveNavigation(true);
    }
}


function updateActiveNavigation(force = false) {
    if (navigationLockId && !force) {
        setActiveNavigation(navigationLockId);
        return;
    }

    setActiveNavigation(calculateActiveSection());
}


function targetScrollPosition(section) {
    return Math.max(
        0,
        section.getBoundingClientRect().top +
            window.scrollY -
            getNavigationOffset()
    );
}


function navigationHasArrived(section) {
    const targetPosition = targetScrollPosition(section);

    return Math.abs(window.scrollY - targetPosition) <= 6;
}


function navigateToSection(sectionId) {
    const section = document.getElementById(sectionId);

    if (!section) {
        return;
    }

    navigationLockId = sectionId;
    setActiveNavigation(sectionId);

    window.clearTimeout(navigationLockTimer);
    window.clearTimeout(navigationArrivalTimer);

    const url = new URL(window.location.href);
    url.hash = sectionId;
    window.history.pushState(null, "", url);

    window.scrollTo({
        top: targetScrollPosition(section),
        behavior: reducedMotionQuery.matches ? "auto" : "smooth"
    });

    navigationLockTimer = window.setTimeout(() => {
        clearNavigationLock(true);
    }, 3500);
}


function requestScrollUpdate() {
    if (scrollUpdatePending) {
        return;
    }

    scrollUpdatePending = true;

    window.requestAnimationFrame(() => {
        updateHeader();

        if (navigationLockId) {
            const targetSection = document.getElementById(navigationLockId);

            setActiveNavigation(navigationLockId);

            if (targetSection && navigationHasArrived(targetSection)) {
                window.clearTimeout(navigationArrivalTimer);

                navigationArrivalTimer = window.setTimeout(() => {
                    clearNavigationLock(false);
                    setActiveNavigation(targetSection.id);
                }, 140);
            }
        } else {
            updateActiveNavigation();
        }

        scrollUpdatePending = false;
    });
}


languageOptions.forEach((option) => {
    option.addEventListener("click", () => {
        changeLanguage(option.dataset.language);
    });
});

themeButton?.addEventListener("click", toggleTheme);

internalSectionLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        const sectionId = link.getAttribute("href")?.slice(1);

        if (
            sectionId &&
            pageSections.some((section) => section.id === sectionId)
        ) {
            event.preventDefault();
            navigateToSection(sectionId);
        }
    });
});

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

window.addEventListener("scroll", requestScrollUpdate, { passive: true });

window.addEventListener(
    "wheel",
    () => {
        if (navigationLockId) {
            clearNavigationLock(false);
        }
    },
    { passive: true }
);

window.addEventListener(
    "touchstart",
    () => {
        if (navigationLockId) {
            clearNavigationLock(false);
        }
    },
    { passive: true }
);

window.addEventListener("popstate", () => {
    clearNavigationLock(false);
    updateActiveNavigation(true);
});

window.addEventListener("resize", () => {
    clearNavigationLock(false);
    updateActiveNavigation(true);

    if (window.innerWidth > 980) {
        closeMenu();
    }
});

menuButton?.addEventListener("click", () => {
    if (mobileNav?.hidden) {
        openMenu();
    } else {
        closeMenu(true);
    }
});

mobileNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeMenu());
});

document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        mobileNav &&
        !mobileNav.hidden
    ) {
        closeMenu(true);
    }
});



/* =========================================================
   FOTO PRINCIPAL
========================================================= */

function updateHeroPhotoState() {
    if (!heroPhoto || !heroPhotoFrame) {
        return;
    }

    const imageIsReady =
        heroPhoto.complete &&
        heroPhoto.naturalWidth > 0;

    heroPhotoFrame.classList.toggle(
        "photo-loaded",
        imageIsReady
    );
}

heroPhoto?.addEventListener(
    "load",
    updateHeroPhotoState
);

heroPhoto?.addEventListener("error", () => {
    heroPhotoFrame?.classList.remove("photo-loaded");
});

updateHeroPhotoState();


/* =========================================================
   PROYECTOS DEFINIDOS EN projects-data.js
========================================================= */

let activeProjectId = null;
let activeProjectImageIndex = 0;
let projectCarouselUpdatePending = false;
let activeProjectImageResizeObserver = null;

/*
    Cambiar este valor obliga al navegador a solicitar nuevamente
    las capturas de los proyectos. Evita que una respuesta 404
    antigua quede guardada en caché después de publicar cambios.
*/
const PORTFOLIO_ASSET_VERSION = "__BUILD_VERSION__";

function versionedPortfolioAsset(source) {
    if (
        !source ||
        /^(?:data:|blob:)/i.test(source)
    ) {
        return source;
    }

    const separator = source.includes("?")
        ? "&"
        : "?";

    return `${source}${separator}v=${PORTFOLIO_ASSET_VERSION}`;
}

function portfolioProjects() {
    return Array.isArray(window.PORTFOLIO_PROJECTS)
        ? window.PORTFOLIO_PROJECTS
        : [];
}


function localizedProjectValue(value, language = currentLanguage()) {
    if (typeof value === "string") {
        return value;
    }

    if (!value || typeof value !== "object") {
        return "";
    }

    return (
        value[language] ??
        value.es ??
        value.en ??
        ""
    );
}


function projectById(projectId) {
    return portfolioProjects().find(
        (project) => project.id === projectId
    );
}


function projectImageFallback(container, label) {
    container.classList.add("image-missing");
    container.replaceChildren();

    const symbol = document.createElement("span");
    symbol.className = "project-image-fallback-symbol";
    symbol.textContent = "</>";

    const text = document.createElement("small");
    text.textContent = label;

    container.append(symbol, text);
}


function applyProjectImageOrientation(image) {
    if (
        !image.naturalWidth ||
        !image.naturalHeight
    ) {
        return;
    }

    const container = image.closest(
        ".project-card-media, .project-gallery-media"
    );

    if (!container) {
        requestAnimationFrame(() => {
            applyProjectImageOrientation(image);
        });

        return;
    }

    const isPortrait =
        image.naturalHeight >= image.naturalWidth;

    const imageRatio =
        `${image.naturalWidth} / ${image.naturalHeight}`;

    container.classList.toggle(
        "project-image-portrait",
        isPortrait
    );

    container.classList.toggle(
        "project-image-landscape",
        !isPortrait
    );

    container.style.setProperty(
        "--project-image-ratio",
        imageRatio
    );

    const imageSource =
        image.currentSrc || image.src;

    const safeImageSource =
        imageSource
            .replace(/\\/g, "\\\\")
            .replace(/"/g, '\\"');

    container.style.setProperty(
        "--project-image-background",
        `url("${safeImageSource}")`
    );

    /*
        En las tarjetas horizontales, el marco adopta la
        proporción exacta de la portada.
    */

    if (
        container.classList.contains(
            "project-card-media"
        )
    ) {
        return;
    }

    /*
        En la galería solo se modifica el marco cuando esta
        imagen corresponde a la diapositiva activa.
    */

    const slide = container.closest(
        ".project-gallery-slide"
    );

    const viewport = projectGallery?.querySelector(
        ".project-gallery-viewport"
    );

    if (
        !slide ||
        !viewport ||
        !projectGalleryTrack
    ) {
        return;
    }

    const slides = [
        ...projectGalleryTrack.children
    ];

    const slideIndex =
        slides.indexOf(slide);

    if (slideIndex !== activeProjectImageIndex) {
        return;
    }

    viewport.style.setProperty(
        "--project-image-ratio",
        imageRatio
    );

    viewport.classList.toggle(
        "project-frame-portrait",
        isPortrait
    );

    viewport.classList.toggle(
        "project-frame-landscape",
        !isPortrait
    );
}


function createProjectImage(
    source,
    alternativeText,
    fallbackLabel
) {
    const image = document.createElement("img");

    image.src = versionedPortfolioAsset(source);
    image.alt = alternativeText;
    image.loading = "lazy";
    image.decoding = "async";

    image.addEventListener("load", () => {
        requestAnimationFrame(() => {
            applyProjectImageOrientation(image);
        });
    });

    image.addEventListener("error", () => {
        const parent = image.parentElement;

        if (parent) {
            projectImageFallback(parent, fallbackLabel);
        }
    });

    if (image.complete) {
        requestAnimationFrame(() => {
            applyProjectImageOrientation(image);
        });
    }

    return image;
}


function createProjectCard(project, language) {
    const copy = translations[language];
    const article = document.createElement("article");

    article.className = "project-card project-card-dynamic";
    article.dataset.projectId = project.id;
    article.dataset.openProject = project.id;
    article.tabIndex = 0;
    article.setAttribute("role", "button");
    article.setAttribute("aria-haspopup", "dialog");
    article.setAttribute("aria-controls", "project-dialog");
    article.setAttribute(
        "aria-label",
        `${copy["actions.viewProject"]}: ${localizedProjectValue(
            project.title,
            language
        )}`
    );

    const media = document.createElement("div");
    media.className = "project-card-media";

    const coverSource =
        project.cover?.src ??
        project.images?.[0]?.src ??
        "";

    const coverAlt = localizedProjectValue(
        project.cover?.alt ??
        project.images?.[0]?.alt,
        language
    );

    if (coverSource) {
        media.append(
            createProjectImage(
                coverSource,
                coverAlt,
                copy["projects.imageUnavailable"]
            )
        );
    } else {
        projectImageFallback(
            media,
            copy["projects.imageUnavailable"]
        );
    }

    const content = document.createElement("div");
    content.className = "project-content";

    const type = document.createElement("p");
    type.className = "project-type";
    type.textContent = localizedProjectValue(
        project.type,
        language
    );

    const title = document.createElement("h3");
    title.textContent = localizedProjectValue(
        project.title,
        language
    );

    const summary = document.createElement("p");
    summary.textContent = localizedProjectValue(
        project.summary,
        language
    );

    const tags = document.createElement("ul");
    tags.className = "tag-list";
    tags.setAttribute(
        "aria-label",
        copy["accessibility.technologies"]
    );

    (project.technologies ?? []).forEach((technology) => {
        const tag = document.createElement("li");
        tag.textContent = technology;
        tags.append(tag);
    });

    content.append(type, title, summary, tags);
    article.append(media, content);

    return article;
}


function renderProjectPagination() {
    if (!projectsPagination) {
        return;
    }

    projectsPagination.replaceChildren();
    projectsPagination.hidden = true;
    projectsPagination.setAttribute(
        "aria-hidden",
        "true"
    );
}


function renderProjects(language = currentLanguage()) {
    if (!projectsTrack) {
        return;
    }

    const projects = portfolioProjects();

    projectsTrack.replaceChildren();

    projects.forEach((project, index) => {
        projectsTrack.append(
            createProjectCard(project, language)
        );
    });

    renderProjectPagination(projects, language);

    window.requestAnimationFrame(() => {
        if (projectsViewport) {
            projectsViewport.scrollLeft = 0;
        }

        updateProjectsCarouselState();
    });
}


function projectCards() {
    return [
        ...(projectsTrack?.querySelectorAll(
            ".project-card-dynamic"
        ) ?? [])
    ];
}


function nearestProjectCardIndex() {
    if (!projectsViewport) {
        return 0;
    }

    const cards = projectCards();
    const viewportLeft =
        projectsViewport.getBoundingClientRect().left;

    let nearestIndex = 0;
    let nearestDistance = Infinity;

    cards.forEach((card, index) => {
        const distance = Math.abs(
            card.getBoundingClientRect().left -
            viewportLeft
        );

        if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestIndex = index;
        }
    });

    return nearestIndex;
}


function updateProjectsCarouselState() {
    if (
        !projectsViewport ||
        !projectsCarousel
    ) {
        return;
    }

    const maximumScroll =
        projectsViewport.scrollWidth -
        projectsViewport.clientWidth;

    const hasOverflow = maximumScroll > 4;
    const atStart = projectsViewport.scrollLeft <= 4;
    const atEnd =
        projectsViewport.scrollLeft >=
        maximumScroll - 4;

    const canMovePrevious =
        hasOverflow && !atStart;

    const canMoveNext =
        hasOverflow && !atEnd;

    projectsCarousel.classList.toggle(
        "has-overflow",
        hasOverflow
    );

    if (projectsCarouselToolbar) {
        projectsCarouselToolbar.hidden = !hasOverflow;
    }

    if (projectsPagination) {
        projectsPagination.hidden = true;
        projectsPagination.setAttribute(
            "aria-hidden",
            "true"
        );
    }

    if (projectsPreviousButton) {
        projectsPreviousButton.hidden =
            !canMovePrevious;

        projectsPreviousButton.disabled =
            !canMovePrevious;

        projectsPreviousButton.setAttribute(
            "aria-hidden",
            canMovePrevious ? "false" : "true"
        );
    }

    if (projectsNextButton) {
        projectsNextButton.hidden =
            !canMoveNext;

        projectsNextButton.disabled =
            !canMoveNext;

        projectsNextButton.setAttribute(
            "aria-hidden",
            canMoveNext ? "false" : "true"
        );
    }
}


function scrollProjectCarousel(direction) {
    const cards = projectCards();

    if (
        !projectsViewport ||
        cards.length === 0
    ) {
        return;
    }

    const currentIndex = nearestProjectCardIndex();
    const nextIndex = Math.min(
        Math.max(currentIndex + direction, 0),
        cards.length - 1
    );

    cards[nextIndex].scrollIntoView({
        behavior: reducedMotionQuery.matches
            ? "auto"
            : "smooth",
        block: "nearest",
        inline: "start"
    });
}


projectsPreviousButton?.addEventListener(
    "click",
    () => scrollProjectCarousel(-1)
);

projectsNextButton?.addEventListener(
    "click",
    () => scrollProjectCarousel(1)
);

projectsViewport?.addEventListener(
    "scroll",
    () => {
        if (projectCarouselUpdatePending) {
            return;
        }

        projectCarouselUpdatePending = true;

        window.requestAnimationFrame(() => {
            updateProjectsCarouselState();
            projectCarouselUpdatePending = false;
        });
    },
    { passive: true }
);

projectsPagination?.addEventListener("click", (event) => {
    const button = event.target.closest(
        "[data-project-carousel-index]"
    );

    if (!button) {
        return;
    }

    const index = Number(
        button.dataset.projectCarouselIndex
    );

    const card = projectCards()[index];

    card?.scrollIntoView({
        behavior: reducedMotionQuery.matches
            ? "auto"
            : "smooth",
        block: "nearest",
        inline: "start"
    });
});

projectsTrack?.addEventListener("click", (event) => {
    const card = event.target.closest(
        ".project-card-dynamic[data-open-project]"
    );

    if (!card || !projectsTrack.contains(card)) {
        return;
    }

    openProjectDialog(card.dataset.openProject);
});


projectsTrack?.addEventListener("keydown", (event) => {
    if (
        event.key !== "Enter" &&
        event.key !== " "
    ) {
        return;
    }

    const card = event.target.closest(
        ".project-card-dynamic[data-open-project]"
    );

    if (!card || !projectsTrack.contains(card)) {
        return;
    }

    event.preventDefault();
    openProjectDialog(card.dataset.openProject);
});

const projectsResizeObserver =
    "ResizeObserver" in window
        ? new ResizeObserver(
            updateProjectsCarouselState
        )
        : null;

if (projectsViewport) {
    projectsResizeObserver?.observe(projectsViewport);
}


/* =========================================================
   VENTANA Y SLIDER DE IMÁGENES DEL PROYECTO
========================================================= */

function currentProject() {
    return activeProjectId
        ? projectById(activeProjectId)
        : null;
}


function createGallerySlide(imageData, language) {
    const slide = document.createElement("figure");
    slide.className = "project-gallery-slide";

    const media = document.createElement("div");
    media.className = "project-gallery-media";

    const source = imageData?.src ?? "";
    const alt = localizedProjectValue(
        imageData?.alt,
        language
    );

    if (source) {
        media.append(
            createProjectImage(
                source,
                alt,
                translations[language][
                    "projects.imageUnavailable"
                ]
            )
        );
    } else {
        projectImageFallback(
            media,
            translations[language][
                "projects.imageUnavailable"
            ]
        );
    }

    slide.append(media);
    return slide;
}


function renderGalleryPagination(images, language) {
    if (!projectGalleryPagination) {
        return;
    }

    projectGalleryPagination.replaceChildren();

    const hasMultipleImages =
        images.length > 1;

    projectGalleryPagination.hidden =
        !hasMultipleImages;

    projectGalleryPagination.setAttribute(
        "aria-hidden",
        hasMultipleImages ? "false" : "true"
    );

    if (!hasMultipleImages) {
        return;
    }

    const dots = document.createElement("span");
    dots.className = "project-gallery-dots";

    images.forEach((image, index) => {
        const button = document.createElement(
            "button"
        );

        button.type = "button";
        button.className =
            "project-gallery-pagination-dot";

        button.dataset.galleryIndex =
            String(index);

        button.setAttribute(
            "aria-label",
            `${translations[language]["projects.goToImage"]} ${index + 1}`
        );

        dots.append(button);
    });

    projectGalleryPagination.append(dots);
}


function renderProjectGallery(project, language) {
    if (!projectGalleryTrack) {
        return;
    }

    const images =
        Array.isArray(project.images) &&
        project.images.length > 0
            ? project.images
            : [project.cover].filter(Boolean);

    projectGalleryTrack.replaceChildren();

    images.forEach((image) => {
        projectGalleryTrack.append(
            createGallerySlide(image, language)
        );
    });

    renderGalleryPagination(images, language);

    projectGallery?.classList.toggle(
        "single-image",
        images.length <= 1
    );

    activeProjectImageIndex = Math.min(
        activeProjectImageIndex,
        Math.max(images.length - 1, 0)
    );

    showProjectImage(activeProjectImageIndex, false);
}


/* =========================================================
   ALTURA DE INFORMACIÓN SEGÚN LA IMAGEN ACTIVA
========================================================= */

function observeActiveProjectImage(image) {
    activeProjectImageResizeObserver?.disconnect();

    activeProjectImageResizeObserver = null;

    if (
        !image ||
        typeof ResizeObserver !== "function"
    ) {
        return;
    }

    activeProjectImageResizeObserver =
        new ResizeObserver(() => {
            requestAnimationFrame(
                syncProjectDescriptionHeight
            );
        });

    /*
        Se observa la captura visible. Este elemento contiene
        el borde real que el usuario ve en pantalla.
    */

    activeProjectImageResizeObserver.observe(image);
}


function syncProjectDescriptionHeight() {
    if (!projectShowcaseDescription) {
        return;
    }

    /*
        En móvil el modal utiliza un flujo vertical y no necesita
        una altura sincronizada.
    */

    if (window.innerWidth <= 680) {
        projectShowcaseDescription.style.removeProperty(
            "--project-active-image-height"
        );

        return;
    }

    const slides = [
        ...(projectGalleryTrack?.children ?? [])
    ];

    const activeSlide =
        slides[activeProjectImageIndex];

    const activeImage =
        activeSlide?.querySelector(
            ".project-gallery-media img"
        );

    if (
        !activeImage ||
        !activeImage.complete ||
        activeImage.naturalWidth <= 0
    ) {
        return;
    }

    /*
        offsetHeight representa exactamente el rectángulo visible
        de la captura, incluyendo su borde. No incluye el espacio
        transparente del área de galería ni la animación del modal.
    */

    const imageHeight =
        Math.ceil(activeImage.offsetHeight);

    if (imageHeight <= 0) {
        return;
    }

    projectShowcaseDescription.style.setProperty(
        "--project-active-image-height",
        `${imageHeight}px`
    );
}


function showProjectImage(index, animate = true) {
    const slides = [
        ...(projectGalleryTrack?.children ?? [])
    ];

    if (slides.length === 0) {
        return;
    }

    const safeIndex =
        (index + slides.length) % slides.length;

    activeProjectImageIndex = safeIndex;

    projectGalleryTrack.style.transition =
        animate && !reducedMotionQuery.matches
            ? "transform 320ms cubic-bezier(.22,1,.36,1)"
            : "none";

    projectGalleryTrack.style.transform =
        `translateX(-${safeIndex * 100}%)`;

    const activeSlide =
        slides[safeIndex];

    const activeImage =
        activeSlide.querySelector(
            ".project-gallery-media img"
        );

    observeActiveProjectImage(activeImage);

    if (activeImage) {
        if (
            activeImage.complete &&
            activeImage.naturalWidth > 0
        ) {
            applyProjectImageOrientation(
                activeImage
            );

            requestAnimationFrame(
                syncProjectDescriptionHeight
            );
        } else {
            activeImage.addEventListener(
                "load",
                () => {
                    applyProjectImageOrientation(
                        activeImage
                    );

                    requestAnimationFrame(
                        syncProjectDescriptionHeight
                    );
                },
                {
                    once: true
                }
            );
        }
    }

    requestAnimationFrame(
        syncProjectDescriptionHeight
    );

    projectGalleryPagination
        ?.querySelectorAll(
            ".project-gallery-pagination-dot"
        )
        .forEach((dot, dotIndex) => {
            const isCurrent =
                dotIndex === safeIndex;

            dot.classList.toggle(
                "active",
                isCurrent
            );

            dot.setAttribute(
                "aria-current",
                isCurrent ? "true" : "false"
            );
        });

}


function fillProjectDialog(project, language) {
    if (projectDialogMeta) {
        projectDialogMeta.textContent =
            localizedProjectValue(
                project.type,
                language
            );
    }

    if (projectDialogTitle) {
        projectDialogTitle.textContent =
            localizedProjectValue(
                project.title,
                language
            );
    }

    if (projectDialogDescription) {
        projectDialogDescription.textContent =
            localizedProjectValue(
                project.description,
                language
            );
    }

    if (projectDialogTags) {
        projectDialogTags.replaceChildren();

        (project.technologies ?? []).forEach(
            (technology) => {
                const tag = document.createElement("li");
                tag.textContent = technology;
                projectDialogTags.append(tag);
            }
        );
    }

    renderProjectGallery(project, language);
}


function clearProjectDialogAnimationTimers() {
    if (projectDialogOpenTimer) {
        window.clearTimeout(
            projectDialogOpenTimer
        );

        projectDialogOpenTimer = null;
    }

    if (projectDialogCloseTimer) {
        window.clearTimeout(
            projectDialogCloseTimer
        );

        projectDialogCloseTimer = null;
    }
}


function finishProjectDialogClose() {
    if (!projectDialog) {
        return;
    }

    clearProjectDialogAnimationTimers();

    projectDialog.classList.remove(
        "is-opening",
        "is-closing"
    );

    if (
        typeof projectDialog.close === "function" &&
        projectDialog.open
    ) {
        projectDialog.close();
    } else {
        projectDialog.removeAttribute("open");
    }

    document.body.classList.remove(
        "project-dialog-open"
    );

    activeProjectImageResizeObserver?.disconnect();
    activeProjectImageResizeObserver = null;

    activeProjectId = null;
}


function openProjectDialog(projectId) {
    const project = projectById(projectId);

    if (!project || !projectDialog) {
        return;
    }

    clearProjectDialogAnimationTimers();

    activeProjectId = projectId;
    activeProjectImageIndex = 0;

    fillProjectDialog(
        project,
        currentLanguage()
    );

    if (projectDescriptionScrollArea) {
        projectDescriptionScrollArea.scrollTop = 0;
    }

    if (!projectDialog.open) {
        if (
            typeof projectDialog.showModal ===
            "function"
        ) {
            projectDialog.showModal();
        } else {
            projectDialog.setAttribute(
                "open",
                ""
            );
        }
    }

    document.body.classList.add(
        "project-dialog-open"
    );

    requestAnimationFrame(() => {
        if (projectDescriptionScrollArea) {
            projectDescriptionScrollArea.scrollTop = 0;
        }

        requestAnimationFrame(
            syncProjectDescriptionHeight
        );

        /*
            Se repite después de finalizar la animación del dialog
            para cubrir cualquier ajuste tardío del navegador.
        */

        window.setTimeout(
            syncProjectDescriptionHeight,
            460
        );
    });

    projectDialog.classList.remove(
        "is-opening",
        "is-closing"
    );

    /*
        Fuerza al navegador a registrar el estado inicial
        antes de reproducir la animación de entrada.
    */

    void projectDialog.offsetWidth;

    if (reducedMotionQuery.matches) {
        return;
    }

    projectDialog.classList.add(
        "is-opening"
    );

    projectDialogOpenTimer = window.setTimeout(
        () => {
            projectDialog?.classList.remove(
                "is-opening"
            );

            projectDialogOpenTimer = null;
        },
        PROJECT_DIALOG_OPEN_DURATION
    );
}


function closeProjectDialog() {
    if (
        !projectDialog ||
        (
            !projectDialog.open &&
            !projectDialog.hasAttribute("open")
        ) ||
        projectDialog.classList.contains(
            "is-closing"
        )
    ) {
        return;
    }

    if (projectDialogOpenTimer) {
        window.clearTimeout(
            projectDialogOpenTimer
        );

        projectDialogOpenTimer = null;
    }

    projectDialog.classList.remove(
        "is-opening"
    );

    if (reducedMotionQuery.matches) {
        finishProjectDialogClose();
        return;
    }

    projectDialog.classList.add(
        "is-closing"
    );

    projectDialogCloseTimer = window.setTimeout(
        finishProjectDialogClose,
        PROJECT_DIALOG_CLOSE_DURATION
    );
}


function refreshOpenProjectDialog(
    language = currentLanguage()
) {
    if (!projectDialog?.open) {
        return;
    }

    const project = currentProject();

    if (project) {
        fillProjectDialog(project, language);
    }
}


projectDialogClose?.addEventListener(
    "click",
    closeProjectDialog
);

projectDialog?.addEventListener("click", (event) => {
    if (event.target === projectDialog) {
        closeProjectDialog();
    }
});

projectDialog?.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeProjectDialog();
});

projectDialog?.addEventListener("close", () => {
    clearProjectDialogAnimationTimers();

    projectDialog.classList.remove(
        "is-opening",
        "is-closing"
    );

    document.body.classList.remove(
        "project-dialog-open"
    );

    activeProjectId = null;
});

projectImagePrevious?.addEventListener(
    "click",
    () => showProjectImage(
        activeProjectImageIndex - 1
    )
);

projectImageNext?.addEventListener(
    "click",
    () => showProjectImage(
        activeProjectImageIndex + 1
    )
);

projectGalleryPagination?.addEventListener(
    "click",
    (event) => {
        const button = event.target.closest(
            "[data-gallery-index]"
        );

        if (!button) {
            return;
        }

        showProjectImage(
            Number(button.dataset.galleryIndex)
        );
    }
);


if (reducedMotionQuery.matches || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
} else {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -55px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
}


temporaryLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        announce(currentCopy().placeholderAnnouncement);
    });
});


applyLanguage(currentLanguage());
updateThemeButton(currentTheme());
updateMenuButtonLabel();
updateHeader();
updateActiveNavigation(true);


/* =========================================================
   VISOR DEL CV
   No depende de librerías externas ni de módulos adicionales.
========================================================= */

(() => {
    const cvDialog = document.getElementById("cv-viewer-dialog");
    const cvCloseButton = document.getElementById("cv-viewer-close");
    const cvViewerPdf = document.getElementById("cv-viewer-pdf");

    const cvOpenButtons = [
        document.getElementById("cv-open-preview"),
        document.getElementById("cv-open-preview-secondary")
    ].filter(Boolean);

    function loadCvInsideViewer() {
        if (!cvViewerPdf || cvViewerPdf.src) {
            return;
        }

        const source = cvViewerPdf.dataset.src;

        if (source) {
            cvViewerPdf.src = source;
        }
    }

    function openCvViewer() {
        if (!cvDialog) {
            return;
        }

        loadCvInsideViewer();

        if (typeof cvDialog.showModal === "function") {
            if (!cvDialog.open) {
                cvDialog.showModal();
            }
        } else {
            cvDialog.setAttribute("open", "");
        }

        document.body.classList.add("cv-dialog-open");
    }

    function closeCvViewer() {
        if (!cvDialog) {
            return;
        }

        if (
            typeof cvDialog.close === "function" &&
            cvDialog.open
        ) {
            cvDialog.close();
        } else {
            cvDialog.removeAttribute("open");
        }

        document.body.classList.remove("cv-dialog-open");
    }

    cvOpenButtons.forEach((button) => {
        button.addEventListener("click", openCvViewer);
    });

    cvCloseButton?.addEventListener(
        "click",
        closeCvViewer
    );

    cvDialog?.addEventListener("click", (event) => {
        if (event.target === cvDialog) {
            closeCvViewer();
        }
    });

    cvDialog?.addEventListener("close", () => {
        document.body.classList.remove("cv-dialog-open");
    });
})();

/* =========================================================
   PROFILE TOOLS PAGINATION
   Navegación animada de Herramientas.
========================================================= */

(() => {
    const carousel = document.querySelector(
        "[data-profile-tools-carousel]"
    );

    if (!carousel) {
        return;
    }

    const grid = carousel.querySelector(
        ".profile-rework-tools-grid"
    );

    const previousButton = carousel.querySelector(
        "[data-profile-tools-previous]"
    );

    const nextButton = carousel.querySelector(
        "[data-profile-tools-next]"
    );

    if (
        !grid ||
        !previousButton ||
        !nextButton
    ) {
        return;
    }

    const tools = [
        ...grid.querySelectorAll(
            ".profile-rework-tool"
        )
    ];

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    let currentPage = 0;
    let previousPageSize = 0;
    let resizeTimer = null;
    let isAnimating = false;


    function profileToolsPageSize() {
        /*
            En móvil se conservan páginas más pequeñas para evitar
            una sección excesivamente larga.

            En tableta y escritorio se muestran nueve herramientas:
            tres columnas por tres filas cuando el ancho lo permite.
        */

        if (window.innerWidth <= 560) {
            return 4;
        }

        return 9;
    }


    function totalProfileToolPages() {
        return Math.max(
            1,
            Math.ceil(
                tools.length /
                profileToolsPageSize()
            )
        );
    }


    function visibleProfileTools() {
        return tools.filter(
            (tool) => !tool.hidden
        );
    }


    function updateProfileToolButtons() {
        const totalPages =
            totalProfileToolPages();

        const hasPrevious =
            totalPages > 1 &&
            currentPage > 0;

        const hasNext =
            totalPages > 1 &&
            currentPage < totalPages - 1;

        previousButton.hidden =
            !hasPrevious;

        previousButton.disabled =
            !hasPrevious ||
            isAnimating;

        nextButton.hidden =
            !hasNext;

        nextButton.disabled =
            !hasNext ||
            isAnimating;

        carousel.classList.toggle(
            "has-multiple-pages",
            totalPages > 1
        );
    }


    function renderProfileTools() {
        const pageSize =
            profileToolsPageSize();

        const totalPages =
            totalProfileToolPages();

        if (pageSize !== previousPageSize) {
            currentPage = 0;
            previousPageSize = pageSize;
        }

        currentPage = Math.min(
            currentPage,
            totalPages - 1
        );

        const firstVisible =
            currentPage * pageSize;

        const lastVisible =
            firstVisible + pageSize;

        tools.forEach((tool, index) => {
            tool.hidden =
                index < firstVisible ||
                index >= lastVisible;
        });

        updateProfileToolButtons();
    }


    function animateElements(
        elements,
        keyframes,
        options
    ) {
        return Promise.all(
            elements.map(
                (element, index) =>
                    element.animate(
                        keyframes,
                        {
                            ...options,
                            delay:
                                index *
                                (options.stagger || 0)
                        }
                    ).finished.catch(
                        () => undefined
                    )
            )
        );
    }


    async function changeProfileToolsPage(
        nextPage,
        direction
    ) {
        const totalPages =
            totalProfileToolPages();

        if (
            isAnimating ||
            nextPage < 0 ||
            nextPage >= totalPages ||
            nextPage === currentPage
        ) {
            return;
        }

        if (reduceMotion.matches) {
            currentPage = nextPage;
            renderProfileTools();
            return;
        }

        isAnimating = true;

        carousel.classList.add(
            "is-changing"
        );

        updateProfileToolButtons();

        const leavingTools =
            visibleProfileTools();

        await animateElements(
            leavingTools,
            [
                {
                    opacity: 1,
                    transform:
                        "translateX(0) scale(1)"
                },
                {
                    opacity: 0,
                    transform:
                        `translateX(${
                            direction > 0
                                ? "-22px"
                                : "22px"
                        }) scale(0.985)`
                }
            ],
            {
                duration: 150,
                easing: "ease-in",
                fill: "both",
                stagger: 12
            }
        );

        currentPage = nextPage;
        renderProfileTools();

        const enteringTools =
            visibleProfileTools();

        await animateElements(
            enteringTools,
            [
                {
                    opacity: 0,
                    transform:
                        `translateX(${
                            direction > 0
                                ? "24px"
                                : "-24px"
                        }) scale(0.985)`
                },
                {
                    opacity: 1,
                    transform:
                        "translateX(0) scale(1)"
                }
            ],
            {
                duration: 260,
                easing:
                    "cubic-bezier(.22, 1, .36, 1)",
                fill: "both",
                stagger: 24
            }
        );

        isAnimating = false;

        carousel.classList.remove(
            "is-changing"
        );

        updateProfileToolButtons();
    }


    previousButton.addEventListener(
        "click",
        () => {
            changeProfileToolsPage(
                currentPage - 1,
                -1
            );
        }
    );


    nextButton.addEventListener(
        "click",
        () => {
            changeProfileToolsPage(
                currentPage + 1,
                1
            );
        }
    );


    window.addEventListener(
        "resize",
        () => {
            window.clearTimeout(
                resizeTimer
            );

            resizeTimer = window.setTimeout(
                () => {
                    if (isAnimating) {
                        return;
                    }

                    renderProfileTools();
                },
                120
            );
        }
    );


    renderProfileTools();
})();


window.addEventListener(
    "resize",
    () => {
        if (!projectDialog?.open) {
            return;
        }

        requestAnimationFrame(
            syncProjectDescriptionHeight
        );
    },
    {
        passive: true
    }
);

/* =========================================================
   CARRUSEL DE PROYECTOS — NAVEGACIÓN SOLO CON BOTONES

   No se intercepta la rueda ni el trackpad. El desplazamiento
   vertical permanece completamente nativo y las tarjetas solo
   avanzan mediante las flechas del carrusel.
========================================================= */

/* =========================================================
   SELECTOR DE CORREO

   Movido desde index.html para mantener la lógica del sitio
   dentro de script.js. El comportamiento no fue alterado.
========================================================= */

(() => {
            const email = "contacto@alejandrolira.dev";
            const dialog = document.getElementById("email-choice-dialog");
            const gmailButton = document.getElementById("email-choice-gmail");
            const appButton = document.getElementById("email-choice-app");
            const closeButton = document.getElementById("email-choice-close");

            if (!dialog || !gmailButton || !appButton || !closeButton) {
                return;
            }

            const copy = {
                es: {
                    titleMain: "Contáctame",
                    titleAccent: "Estoy listo para aprender, crear y aportar.",
                    gmailTitle: "Abrir Gmail",
                    gmailCopy: "Se abrirá en una pestaña nueva",
                    appTitle: "Usar una app de correo",
                    appCopy: "Outlook, Mail u otra aplicación instalada",
                    close: "Cerrar",
                    subject: "Oportunidad profesional para Alejandro Lira"
                },
                en: {
                    titleMain: "Contact me",
                    titleAccent: "I'm ready to learn, create, and contribute.",
                    gmailTitle: "Open Gmail",
                    gmailCopy: "Opens in a new browser tab",
                    appTitle: "Use an email app",
                    appCopy: "Outlook, Mail, or another installed application",
                    close: "Close",
                    subject: "Professional opportunity for Alejandro Lira"
                }
            };

            let gmailUrl = "";
            let mailtoUrl = "";
            let isClosing = false;

            const setDialogLanguage = () => {
                const language =
                    document.documentElement.lang === "en" ? "en" : "es";
                const text = copy[language];

                document.getElementById("email-choice-title-main").textContent =
                    text.titleMain;
                document.getElementById("email-choice-title-accent").textContent =
                    text.titleAccent;
                document.getElementById("email-choice-gmail-title").textContent =
                    text.gmailTitle;
                document.getElementById("email-choice-gmail-copy").textContent =
                    text.gmailCopy;
                document.getElementById("email-choice-app-title").textContent =
                    text.appTitle;
                document.getElementById("email-choice-app-copy").textContent =
                    text.appCopy;
                closeButton.setAttribute("aria-label", text.close);

                const encodedEmail = encodeURIComponent(email);
                const encodedSubject = encodeURIComponent(text.subject);

                gmailUrl =
                    `https://mail.google.com/mail/u/0/?view=cm&fs=1` +
                    `&to=${encodedEmail}&su=${encodedSubject}`;

                mailtoUrl =
                    `mailto:${email}?subject=${encodedSubject}`;
            };

            const closeDialog = (afterClose) => {
                if (!dialog.open || isClosing) {
                    return;
                }

                isClosing = true;
                dialog.classList.add("is-closing");

                const finishClose = () => {
                    dialog.classList.remove("is-closing");
                    dialog.close();
                    isClosing = false;

                    if (typeof afterClose === "function") {
                        afterClose();
                    }
                };

                const reducedMotion = window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches;

                if (reducedMotion) {
                    finishClose();
                    return;
                }

                window.setTimeout(finishClose, 180);
            };

            const openGmail = () => {
                const newTab = window.open(gmailUrl, "_blank");

                if (newTab) {
                    try {
                        newTab.opener = null;
                    } catch {
                        // Algunos navegadores restringen opener.
                    }

                    closeDialog();
                    return;
                }

                closeDialog(() => {
                    window.location.assign(gmailUrl);
                });
            };

            const openMailApp = () => {
                closeDialog(() => {
                    window.location.href = mailtoUrl;
                });
            };

            document.querySelectorAll(".email-choice-trigger").forEach((link) => {
                link.addEventListener("click", (event) => {
                    event.preventDefault();
                    setDialogLanguage();

                    if (dialog.open || isClosing) {
                        return;
                    }

                    if (typeof dialog.showModal === "function") {
                        dialog.showModal();
                    } else {
                        openGmail();
                    }
                });
            });

            gmailButton.addEventListener("click", openGmail);
            appButton.addEventListener("click", openMailApp);
            closeButton.addEventListener("click", () => closeDialog());

            dialog.addEventListener("click", (event) => {
                const bounds = dialog.getBoundingClientRect();
                const clickedOutside =
                    event.clientX < bounds.left ||
                    event.clientX > bounds.right ||
                    event.clientY < bounds.top ||
                    event.clientY > bounds.bottom;

                if (clickedOutside) {
                    closeDialog();
                }
            });

            dialog.addEventListener("cancel", (event) => {
                event.preventDefault();
                closeDialog();
            });
        })();
