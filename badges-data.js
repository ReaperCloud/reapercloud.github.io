"use strict";

/*
========================================================
INSIGNIAS DEL PORTAFOLIO
========================================================*/

window.PORTFOLIO_BADGES = [
    {
        id: "swift-mobile-development",
        title: {
            es: "Desarrollo de aplicaciones móviles con Swift",
            en: "Mobile App Development with Swift"
        },
        issuer: "Universidad Tecmilenio",
        image: "./assets/images/badges/desarrollo-de-aplicaciones-moviles-con-swift-sobres.png",
        category: "development",
        featured: true,
        distinction: {
            es: "Sobresaliente",
            en: "Outstanding"
        },
        url: "https://www.credly.com/badges/e001247c-e218-49e8-85ee-684ad2ba3a89/public_url"
    },

    {
        id: "software-engineering",
        title: {
            es: "Ingeniería de Software",
            en: "Software Engineering"
        },
        issuer: "Universidad Tecmilenio",
        image: "./assets/images/badges/ingenieria-de-software-sobresaliente.png",
        category: "software",
        featured: true,
        distinction: {
            es: "Sobresaliente",
            en: "Outstanding"
        },
        url: "https://www.credly.com/badges/1c85c82b-1fdf-4ab0-acda-80a598d38bf6/public_url"
    },

    {
        id: "full-stack-development",
        title: {
            es: "Desarrollo Full Stack",
            en: "Full-Stack Development"
        },
        issuer: "Universidad Tecmilenio",
        image: "./assets/images/badges/desarrollo-full-stack.png",
        category: "development",
        featured: true,
        distinction: null,
        url: "https://www.credly.com/badges/bdb65bb9-bb02-4e8f-b39c-35c069206585/public_url"
    },

    {
        id: "software-design-architecture",
        title: {
            es: "Diseño y arquitecturas de software",
            en: "Software Design and Architecture"
        },
        issuer: "Universidad Tecmilenio",
        image: "./assets/images/badges/diseno-y-arquitecturas-de-software.png",
        category: "software",
        featured: true,
        distinction: null,
        url: "https://www.credly.com/badges/3218f6b0-5b2c-4dbf-afe2-69f04793ac40/public_url"
    },

    {
        id: "data-structures",
        title: {
            es: "Estructuras de Datos",
            en: "Data Structures"
        },
        issuer: "Universidad Tecmilenio",
        image: "./assets/images/badges/estructura-de-datos.png",
        category: "development",
        featured: true,
        distinction: null,
        url: "https://www.credly.com/badges/6fecede5-cef2-41a6-a2b0-c0d00e24a452/public_url"
    },

    {
        id: "databases",
        title: {
            es: "Bases de Datos",
            en: "Databases"
        },
        issuer: "Universidad Tecmilenio",
        image: "./assets/images/badges/bases-de-datos.2.png",
        category: "data",
        featured: true,
        distinction: null,
        url: "https://www.credly.com/badges/78dcf387-df4d-4bad-b4c4-70ef018ca69a/public_url"
    },

    {
        id: "devops-fundamentals",
        title: {
            es: "Fundamentos de DevOps",
            en: "DevOps Fundamentals"
        },
        issuer: "Universidad Tecmilenio",
        image: "./assets/images/badges/fundamentos-de-devops-sobresaliente.png",
        category: "cloud",
        featured: true,
        distinction: {
            es: "Sobresaliente",
            en: "Outstanding"
        },
        url: "https://www.credly.com/badges/6f2a5c96-9109-4e10-8219-1bac6f6b7564/public_url"
    },

    {
        id: "aws-cloud-operations",
        title: {
            es: "AWS Academy Cloud Operations",
            en: "AWS Academy Cloud Operations"
        },
        issuer: "AWS Academy",
        image: "./assets/images/badges/aws-academy-graduate-cloud-operations-training-badg.png",
        category: "cloud",
        featured: true,
        distinction: {
            es: "Formación completada",
            en: "Training completed"
        },
        url: "https://www.credly.com/badges/ed1ca0da-bf78-4723-8652-ff5eb38dfdf9/public_url"
    },

    {
        id: "object-oriented-programming",
        title: {
            es: "Programación Orientada a Objetos",
            en: "Object-Oriented Programming"
        },
        issuer: "Universidad Tecmilenio",
        image: "./assets/images/badges/programacion-orientada-a-objetos-sobresaliente.png",
        category: "development",
        featured: false,
        distinction: {
            es: "Sobresaliente",
            en: "Outstanding"
        },
        url: "https://www.credly.com/badges/3595902c-3633-4144-8c74-c2220445044f/public_url"
    },

    {
        id: "programming-fundamentals",
        title: {
            es: "Fundamentos de Programación",
            en: "Programming Fundamentals"
        },
        issuer: "Universidad Tecmilenio",
        image: "./assets/images/badges/fundamentos-de-programacion-sobresaliente.png",
        category: "development",
        featured: false,
        distinction: {
            es: "Sobresaliente",
            en: "Outstanding"
        },
        url: "https://www.credly.com/badges/43edfc40-89b3-43f8-adc4-43d3f63b9af0/public_url"
    },

    {
        id: "web-development-fundamentals",
        title: {
            es: "Fundamentos de Desarrollo Web",
            en: "Web Development Fundamentals"
        },
        issuer: "IBM SkillsBuild",
        image: "./assets/images/badges/web-development-fundamentals.png",
        category: "development",
        featured: false,
        distinction: null,
        url: "https://www.credly.com/badges/3e864fa5-e224-46ff-9758-e955ec9b6ba8/public_url"
    },

    {
        id: "ux-design-fundamentals",
        title: {
            es: "Fundamentos de Diseño de Experiencia de Usuario",
            en: "User Experience Design Fundamentals"
        },
        issuer: "IBM SkillsBuild",
        image: "./assets/images/badges/user-experience-design-fundamentals.png",
        category: "software",
        featured: false,
        distinction: null,
        url: "https://www.credly.com/badges/78254c7c-11c8-4e39-b523-cffe1e44cc0e/public_url"
    },

    {
        id: "agile-methodologies",
        title: {
            es: "Metodologías Ágiles",
            en: "Agile Methodologies"
        },
        issuer: "Universidad Tecmilenio",
        image: "./assets/images/badges/metodologias-agiles-sobresaliente.png",
        category: "methodology",
        featured: false,
        distinction: {
            es: "Sobresaliente",
            en: "Outstanding"
        },
        url: "https://www.credly.com/badges/d9e263a7-d6a3-4fba-873b-1a5e6d989979/public_url"
    },

    {
        id: "agile-explorer",
        title: {
            es: "Agile Explorer",
            en: "Agile Explorer"
        },
        issuer: "IBM SkillsBuild",
        image: "./assets/images/badges/agile-explorer.png",
        category: "methodology",
        featured: false,
        distinction: null,
        url: "https://www.credly.com/badges/40bfd91d-685a-4074-8de6-1ba5956f2832/public_url"
    },

    {
        id: "operating-systems",
        title: {
            es: "Sistemas Operativos",
            en: "Operating Systems"
        },
        issuer: "Universidad Tecmilenio",
        image: "./assets/images/badges/sistemas-operativos-sobresaliente.png",
        category: "software",
        featured: false,
        distinction: {
            es: "Sobresaliente",
            en: "Outstanding"
        },
        url: "https://www.credly.com/badges/6b9bee81-edc2-409e-abd6-4f173a875b15/public_url"
    },

    {
        id: "python-essentials-1",
        title: {
            es: "Python Essentials 1",
            en: "Python Essentials 1"
        },
        issuer: "Cisco Networking Academy",
        image: "./assets/images/badges/python-essentials-1.1.png",
        category: "development",
        featured: false,
        distinction: {
            es: "Verificada",
            en: "Verified"
        },
        url: "https://www.credly.com/badges/a7a9e825-1d9f-44ad-aa88-0791f44fde58/public_url"
    },

    {
        id: "cloud-computing",
        title: {
            es: "Computación en la Nube",
            en: "Cloud Computing"
        },
        issuer: "Universidad Tecmilenio",
        image: "./assets/images/badges/computacion-en-la-nube.png",
        category: "cloud",
        featured: false,
        distinction: null,
        url: "https://www.credly.com/badges/3e76ad00-ecac-4724-86ff-59c37c6506cd/public_url"
    },

    {
        id: "information-technology-management",
        title: {
            es: "Gestión de Tecnologías de Información",
            en: "Information Technology Management"
        },
        issuer: "Universidad Tecmilenio",
        image: "./assets/images/badges/gestion-de-tecnologias-de-informacion.png",
        category: "networking",
        featured: false,
        distinction: {
            es: "Certificado",
            en: "Certified"
        },
        url: "https://www.credly.com/badges/76d8c603-6917-4d6e-b541-1f9c0516851c/public_url"
    },

    {
        id: "network-management",
        title: {
            es: "Gestión de Redes",
            en: "Network Management"
        },
        issuer: "Universidad Tecmilenio",
        image: "./assets/images/badges/gestion-de-redes.png",
        category: "networking",
        featured: false,
        distinction: null,
        url: "https://www.credly.com/badges/20c1ad20-43b1-4c71-90b1-d43989a9e39e/public_url"
    },

    {
        id: "networking-basics",
        title: {
            es: "Fundamentos de Redes",
            en: "Networking Basics"
        },
        issuer: "Cisco Networking Academy",
        image: "./assets/images/badges/networking-basics.png",
        category: "networking",
        featured: false,
        distinction: {
            es: "Verificada",
            en: "Verified"
        },
        url: "https://www.credly.com/badges/2a855faa-9530-4580-b7cd-f78d4647042a/public_url"
    },

    {
        id: "cybersecurity",
        title: {
            es: "Ciberseguridad",
            en: "Cybersecurity"
        },
        issuer: "Instituto Profesional Tecmilenio",
        image: "./assets/images/badges/ciberseguridad.png",
        category: "cybersecurity",
        featured: false,
        distinction: {
            es: "Certificado",
            en: "Certified"
        },
        url: "https://www.credly.com/badges/2e34ca6c-de54-4754-8ada-613d7d8c84ed/public_url"
    },

    {
        id: "ethical-hacker",
        title: {
            es: "Ethical Hacker",
            en: "Ethical Hacker"
        },
        issuer: "Cisco Networking Academy",
        image: "./assets/images/badges/ethical-hacker.png",
        category: "cybersecurity",
        featured: false,
        distinction: {
            es: "Verificada",
            en: "Verified"
        },
        url: "https://www.credly.com/badges/25319c1a-496f-477b-a3d7-4295b2be09e7/public_url"
    },

    {
        id: "introduction-cybersecurity",
        title: {
            es: "Introducción a la Ciberseguridad",
            en: "Introduction to Cybersecurity"
        },
        issuer: "Cisco Networking Academy",
        image: "./assets/images/badges/introduction-to-cybersecurity.png",
        category: "cybersecurity",
        featured: false,
        distinction: {
            es: "Verificada",
            en: "Verified"
        },
        url: "https://www.credly.com/badges/8b36de41-795f-4fd3-be6d-9dc8060df14c/public_url"
    },

    {
        id: "cyber-threat-intelligence",
        title: {
            es: "Inteligencia de Amenazas Cibernéticas",
            en: "Cyber Threat Intelligence"
        },
        issuer: "Universidad Tecmilenio",
        image: "./assets/images/badges/inteligencias-de-amenazas-ciberneticas-sobresalient.png",
        category: "cybersecurity",
        featured: false,
        distinction: {
            es: "Sobresaliente",
            en: "Outstanding"
        },
        url: "https://www.credly.com/badges/447bb46f-c0e5-4c9d-a17b-d31f0ee46825/public_url"
    },

    {
        id: "data-science",
        title: {
            es: "Ciencia de Datos",
            en: "Data Science"
        },
        issuer: "Universidad Tecmilenio",
        image: "./assets/images/badges/ciencia-de-datos.1.png",
        category: "data",
        featured: false,
        distinction: null,
        url: "https://www.credly.com/badges/ad68b330-c133-467d-a9f9-9fc337803c79/public_url"
    },

    {
        id: "introduction-data-science",
        title: {
            es: "Introducción a la Ciencia de Datos",
            en: "Introduction to Data Science"
        },
        issuer: "Cisco Networking Academy",
        image: "./assets/images/badges/introduction-to-data-science.png",
        category: "data",
        featured: false,
        distinction: {
            es: "Verificada",
            en: "Verified"
        },
        url: "https://www.credly.com/badges/bd2e57ff-6d7d-4ebc-a8c8-27ed5caa9cb4/public_url"
    },

    {
        id: "probability-statistics-data-science",
        title: {
            es: "Probabilidad y Estadística para Ciencia de Datos",
            en: "Probability and Statistics for Data Science"
        },
        issuer: "Universidad Tecmilenio",
        image: "./assets/images/badges/probabilidad-y-estadistica-para-la-ciencia-de-datos.2.png",
        category: "data",
        featured: false,
        distinction: {
            es: "Sobresaliente",
            en: "Outstanding"
        },
        url: "https://www.credly.com/badges/a40eafd9-28fc-4758-9e92-e617ce140c66/public_url"
    },

    {
        id: "upper-intermediate-english",
        title: {
            es: "Inglés Intermedio Alto",
            en: "Upper-Intermediate English"
        },
        issuer: "Universidad Tecmilenio",
        image: "./assets/images/badges/ingles-intermedio-alto-sobresaliente.png",
        category: "language",
        featured: false,
        distinction: {
            es: "Sobresaliente",
            en: "Outstanding"
        },
        url: "https://www.credly.com/badges/b979d3cd-f2af-4617-af1c-ef3bb8f5d943/public_url"
    }
];
