"use strict";

(() => {
    const badges = Array.isArray(window.PORTFOLIO_BADGES)
        ? window.PORTFOLIO_BADGES
        : [];

/*
    =========================================================
    COMPATIBILIDAD DE NOMBRES DE IMÁGENES

    Prueba automáticamente:
    - nombres limpios incluidos en el módulo;
    - nombres originales descargados;
    - distintas ubicaciones comunes de la carpeta badges.
    =========================================================
    */

    const badgeFilenameAliases = {
        "programming-fundamentals.png": "fundamentos-de-programacion-sobresaliente(1).png",
        "network-management.png": "gestion-de-redes(1).png",
        "information-technology-management.png": "gestion-de-tecnologias-de-informacion(1).png",
        "agile-explorer.png": "agile-explorer.png",
        "aws-cloud-operations.png": "aws-academy-graduate-cloud-operations-training-badg(1).png",
        "databases.png": "bases-de-datos.2(1).png",
        "cybersecurity.png": "ciberseguridad(1).png",
        "data-science.png": "ciencia-de-datos.1(1).png",
        "cloud-computing.png": "computacion-en-la-nube(1).png",
        "swift-mobile-development.png": "desarrollo-de-aplicaciones-moviles-con-swift-sobres(1).png",
        "full-stack-development.png": "desarrollo-full-stack(1).png",
        "software-design-architecture.png": "diseno-y-arquitecturas-de-software(1).png",
        "data-structures.png": "estructura-de-datos(1).png",
        "ethical-hacker.png": "ethical-hacker(1).png",
        "devops-fundamentals.png": "fundamentos-de-devops-sobresaliente(1).png",
        "agile-methodologies.png": "metodologias-agiles-sobresaliente(1).png",
        "networking-basics.png": "networking-basics.png",
        "probability-statistics-data-science.png": "probabilidad-y-estadistica-para-la-ciencia-de-datos.2.png",
        "object-oriented-programming.png": "programacion-orientada-a-objetos-sobresaliente.png",
        "python-essentials-1.png": "python-essentials-1.1.png",
        "operating-systems.png": "sistemas-operativos-sobresaliente.png",
        "ux-design-fundamentals.png": "user-experience-design-fundamentals.png",
        "web-development-fundamentals.png": "web-development-fundamentals.png",
        "software-engineering.png": "ingenieria-de-software-sobresaliente(1).png",
        "upper-intermediate-english.png": "ingles-intermedio-alto-sobresaliente(1).png",
        "cyber-threat-intelligence.png": "inteligencias-de-amenazas-ciberneticas-sobresalient(1).png",
        "introduction-cybersecurity.png": "introduction-to-cybersecurity(1).png",
        "introduction-data-science.png": "introduction-to-data-science(1).png"
    };


    function uniqueValues(values) {
        return [...new Set(values.filter(Boolean))];
    }


    function badgeImageCandidates(imagePath) {
        const cleanPath = String(imagePath ?? "").trim();

        if (!cleanPath) {
            return [];
        }

        const cleanFilename =
            cleanPath.split("/").pop();

        const originalFilename =
            badgeFilenameAliases[cleanFilename];

        return uniqueValues([
            cleanPath,

            `./assets/images/badges/${cleanFilename}`,
            `assets/images/badges/${cleanFilename}`,
            `./assets/badges/${cleanFilename}`,
            `./images/badges/${cleanFilename}`,
            `./badges/${cleanFilename}`,

            originalFilename
                ? `./assets/images/badges/${originalFilename}`
                : "",

            originalFilename
                ? `assets/images/badges/${originalFilename}`
                : "",

            originalFilename
                ? `./assets/badges/${originalFilename}`
                : "",

            originalFilename
                ? `./images/badges/${originalFilename}`
                : "",

            originalFilename
                ? `./badges/${originalFilename}`
                : ""
        ]);
    }


    function loadBadgeImageWithFallback(
        image,
        imagePath
    ) {
        const candidates =
            badgeImageCandidates(imagePath);

        let candidateIndex = 0;

        function tryNextCandidate() {
            if (candidateIndex >= candidates.length) {
                image.removeAttribute("src");
                image.classList.add(
                    "badge-image-missing"
                );

                return;
            }

            const candidate =
                candidates[candidateIndex];

            candidateIndex += 1;
            image.src = candidate;
        }

        image.addEventListener(
            "error",
            tryNextCandidate
        );

        image.addEventListener("load", () => {
            image.classList.remove(
                "badge-image-missing"
            );
        });

        tryNextCandidate();
    }

    const featuredGrid = document.getElementById(
        "featured-badges-grid"
    );

    const allGrid = document.getElementById(
        "all-badges-grid"
    );

    const openButton = document.getElementById(
        "badges-open-button"
    );

    const dialog = document.getElementById(
        "badges-dialog"
    );

    const closeButton = document.getElementById(
        "badges-dialog-close"
    );

    const countLabel = document.getElementById(
        "badges-dialog-count"
    );

    const copy = {
        es: {
            eyebrow: "Certificaciones",
            titleMain: "Formación que respalda",
            titleAccent: "mi perfil técnico.",
            description:
                "Una selección de las certificaciones más alineadas con mi perfil de desarrollo de software.",
            viewAll: `Ver las ${badges.length} insignias`,
            dialogEyebrow: "Credenciales",
            dialogTitle: "Todas mis insignias",
            dialogDescription:
                "Cursos, certificaciones y reconocimientos obtenidos durante mi formación.",
            count: `${badges.length} credenciales`,
            close: "Cerrar la galería de insignias",
            openCredential: "Ver credencial en Credly",
            imageAltPrefix: "Insignia",
            linkHint: "Credencial verificable"
        },

        en: {
            eyebrow: "Certifications",
            titleMain: "Education that supports",
            titleAccent: "my technical profile.",
            description:
                "A selection of the certifications most closely aligned with my software development profile.",
            viewAll: `View all ${badges.length} badges`,
            dialogEyebrow: "Credentials",
            dialogTitle: "All my badges",
            dialogDescription:
                "Courses, certifications and recognitions earned throughout my education.",
            count: `${badges.length} credentials`,
            close: "Close badge gallery",
            openCredential: "View credential on Credly",
            imageAltPrefix: "Badge",
            linkHint: "Verifiable credential"
        }
    };


    function currentLanguage() {
        return document.documentElement.lang === "en"
            ? "en"
            : "es";
    }


    function localizedValue(value, language) {
        if (typeof value === "string") {
            return value;
        }

        if (!value || typeof value !== "object") {
            return "";
        }

        return (
            value[language]
            ?? value.es
            ?? value.en
            ?? ""
        );
    }


    function createBadgeCard(
        badge,
        language,
        compact = false
    ) {
        const hasUrl =
            typeof badge.url === "string"
            && badge.url.trim().length > 0;

        const card = document.createElement(
            hasUrl ? "a" : "article"
        );

        card.className =
            "badge-card badge-card-real"
            + (compact ? " badge-card-compact" : "");

        if (hasUrl) {
            card.href = badge.url;
            card.target = "_blank";
            card.rel = "noopener noreferrer";

            card.setAttribute(
                "aria-label",
                `${copy[language].openCredential}: `
                + localizedValue(badge.title, language)
            );
        }

        const media = document.createElement("div");
        media.className = "badge-image-frame";

        const image = document.createElement("img");
        image.className = "badge-image";
        image.loading = "lazy";
        image.decoding = "async";

        loadBadgeImageWithFallback(
            image,
            badge.image
        );
        image.alt =
            `${copy[language].imageAltPrefix}: `
            + localizedValue(badge.title, language);

        media.append(image);

        const content = document.createElement("div");
        content.className = "badge-card-content";

        const issuer = document.createElement("span");
        issuer.className = "badge-issuer";
        issuer.textContent = badge.issuer;

        const title = document.createElement("h3");
        title.textContent = localizedValue(
            badge.title,
            language
        );

        content.append(issuer, title);

        const distinction = localizedValue(
            badge.distinction,
            language
        );

        if (distinction) {
            const distinctionElement =
                document.createElement("span");

            distinctionElement.className =
                "badge-distinction";

            distinctionElement.textContent =
                distinction;

            content.append(distinctionElement);
        }

        if (hasUrl) {
            const linkHint = document.createElement("span");
            linkHint.className = "badge-link-hint";

            const hintText = document.createElement("span");
            hintText.textContent = copy[language].linkHint;

            const arrow = document.createElement("span");
            arrow.setAttribute("aria-hidden", "true");
            arrow.textContent = "↗";

            linkHint.append(hintText, arrow);
            content.append(linkHint);
        }

        card.append(media, content);

        return card;
    }


    function renderBadges() {
        if (!featuredGrid || !allGrid) {
            return;
        }

        const language = currentLanguage();

        const featured = badges.filter(
            (badge) => badge.featured
        );

        featuredGrid.replaceChildren();
        allGrid.replaceChildren();

        featured.forEach((badge) => {
            featuredGrid.append(
                createBadgeCard(
                    badge,
                    language,
                    false
                )
            );
        });

        badges.forEach((badge) => {
            allGrid.append(
                createBadgeCard(
                    badge,
                    language,
                    true
                )
            );
        });

        document
            .querySelectorAll("[data-badges-copy]")
            .forEach((element) => {
                const key =
                    element.dataset.badgesCopy;

                if (copy[language][key] !== undefined) {
                    element.textContent =
                        copy[language][key];
                }
            });

        document
            .querySelectorAll("[data-badges-aria]")
            .forEach((element) => {
                const key =
                    element.dataset.badgesAria;

                if (copy[language][key] !== undefined) {
                    element.setAttribute(
                        "aria-label",
                        copy[language][key]
                    );
                }
            });

        if (countLabel) {
            countLabel.textContent =
                copy[language].count;
        }
    }


    function openDialog() {
        if (!dialog) {
            return;
        }

        if (typeof dialog.showModal === "function") {
            dialog.showModal();
        } else {
            dialog.setAttribute("open", "");
        }

        document.body.classList.add(
            "badges-dialog-open"
        );
    }


    function closeDialog() {
        if (!dialog) {
            return;
        }

        if (
            typeof dialog.close === "function"
            && dialog.open
        ) {
            dialog.close();
        } else {
            dialog.removeAttribute("open");
        }

        document.body.classList.remove(
            "badges-dialog-open"
        );
    }


    openButton?.addEventListener(
        "click",
        openDialog
    );

    closeButton?.addEventListener(
        "click",
        closeDialog
    );

    dialog?.addEventListener("click", (event) => {
        if (event.target === dialog) {
            closeDialog();
        }
    });

    dialog?.addEventListener("close", () => {
        document.body.classList.remove(
            "badges-dialog-open"
        );
    });

    const languageObserver = new MutationObserver(
        (mutations) => {
            const languageChanged = mutations.some(
                (mutation) =>
                    mutation.type === "attributes"
                    && mutation.attributeName === "lang"
            );

            if (languageChanged) {
                renderBadges();
            }
        }
    );

    languageObserver.observe(
        document.documentElement,
        {
            attributes: true,
            attributeFilter: ["lang"]
        }
    );

    renderBadges();
}
)();


