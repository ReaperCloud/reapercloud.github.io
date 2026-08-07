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


    /* =====================================================
       NAVEGACIÓN MÓVIL DE INSIGNIAS DESTACADAS
       Dos credenciales por página, con el mismo lenguaje
       visual de la navegación móvil de Proyectos.
    ===================================================== */

    const featuredMobileQuery = window.matchMedia(
        "(max-width: 680px)"
    );

    let featuredNavigation = null;
    let featuredCounter = null;
    let featuredProgress = null;
    let featuredPreviousButton = null;
    let featuredNextButton = null;
    let featuredScrollUpdatePending = false;

    const featuredNavigationCopy = {
        es: {
            previous: "Insignias anteriores",
            next: "Siguientes insignias",
            page: "Ir al grupo de insignias"
        },
        en: {
            previous: "Previous badges",
            next: "Next badges",
            page: "Go to badge group"
        }
    };


    function featuredCards() {
        return [
            ...(featuredGrid?.querySelectorAll(
                ".badge-card-real"
            ) ?? [])
        ];
    }


    function featuredPageCards() {
        const cards = featuredCards();
        const pageCards = [];

        for (let index = 0; index < cards.length; index += 2) {
            pageCards.push(cards[index]);
        }

        return pageCards;
    }


    function ensureFeaturedMobileNavigation() {
        if (!featuredGrid || featuredNavigation) {
            return;
        }

        featuredNavigation = document.createElement("div");
        featuredNavigation.className = "badges-mobile-navigation";
        featuredNavigation.hidden = true;

        featuredCounter = document.createElement("span");
        featuredCounter.className = "badges-mobile-counter";
        featuredCounter.setAttribute("aria-live", "polite");

        featuredProgress = document.createElement("div");
        featuredProgress.className = "badges-mobile-progress";

        const controls = document.createElement("div");
        controls.className = "badges-mobile-controls";

        featuredPreviousButton = document.createElement("button");
        featuredPreviousButton.className =
            "badges-mobile-button badges-mobile-previous";
        featuredPreviousButton.type = "button";
        featuredPreviousButton.innerHTML =
            '<span aria-hidden="true">←</span>';

        featuredNextButton = document.createElement("button");
        featuredNextButton.className =
            "badges-mobile-button badges-mobile-next";
        featuredNextButton.type = "button";
        featuredNextButton.innerHTML =
            '<span aria-hidden="true">→</span>';

        controls.append(
            featuredPreviousButton,
            featuredNextButton
        );

        featuredNavigation.append(
            featuredCounter,
            featuredProgress,
            controls
        );

        featuredGrid.insertAdjacentElement(
            "afterend",
            featuredNavigation
        );

        featuredPreviousButton.addEventListener(
            "click",
            () => scrollFeaturedBadges(-1)
        );

        featuredNextButton.addEventListener(
            "click",
            () => scrollFeaturedBadges(1)
        );

        featuredGrid.addEventListener(
            "scroll",
            () => {
                if (featuredScrollUpdatePending) {
                    return;
                }

                featuredScrollUpdatePending = true;

                window.requestAnimationFrame(() => {
                    updateFeaturedMobileNavigation();
                    featuredScrollUpdatePending = false;
                });
            },
            { passive: true }
        );
    }


    function featuredPageIndex() {
        if (!featuredGrid) {
            return 0;
        }

        const pageCards = featuredPageCards();

        if (pageCards.length === 0) {
            return 0;
        }

        const gridLeft =
            featuredGrid.getBoundingClientRect().left;

        let nearestIndex = 0;
        let nearestDistance = Infinity;

        pageCards.forEach((card, index) => {
            const distance = Math.abs(
                card.getBoundingClientRect().left - gridLeft
            );

            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestIndex = index;
            }
        });

        return nearestIndex;
    }


    function featuredPageScrollLeft(pageIndex) {
        if (!featuredGrid) {
            return 0;
        }

        const targetCard =
            featuredPageCards()[pageIndex];

        if (!targetCard) {
            return 0;
        }

        const gridBounds =
            featuredGrid.getBoundingClientRect();

        const cardBounds =
            targetCard.getBoundingClientRect();

        return (
            featuredGrid.scrollLeft +
            cardBounds.left -
            gridBounds.left
        );
    }


    function scrollFeaturedBadgesToPage(pageIndex) {
        if (!featuredGrid) {
            return;
        }

        const pageCount = featuredPageCards().length;

        if (pageCount === 0) {
            return;
        }

        const safeIndex = Math.min(
            Math.max(pageIndex, 0),
            pageCount - 1
        );

        featuredGrid.scrollTo({
            left: featuredPageScrollLeft(safeIndex),
            behavior: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
                ? "auto"
                : "smooth"
        });
    }


    function scrollFeaturedBadges(direction) {
        scrollFeaturedBadgesToPage(
            featuredPageIndex() + direction
        );
    }


    function renderFeaturedProgress(pageCount, language) {
        if (!featuredProgress) {
            return;
        }

        featuredProgress.replaceChildren();

        for (let index = 0; index < pageCount; index += 1) {
            const indicator = document.createElement("span");

            indicator.className =
                "badges-mobile-progress-button";
            indicator.dataset.badgePage = String(index);
            indicator.setAttribute("aria-hidden", "true");

            featuredProgress.append(indicator);
        }
    }


    function updateFeaturedMobileNavigation(
        resetPosition = false
    ) {
        ensureFeaturedMobileNavigation();

        if (
            !featuredGrid ||
            !featuredNavigation ||
            !featuredCounter ||
            !featuredProgress ||
            !featuredPreviousButton ||
            !featuredNextButton
        ) {
            return;
        }

        const language = currentLanguage();
        const pageCount = featuredPageCards().length;
        const isMobile = featuredMobileQuery.matches;
        const shouldShow = isMobile && pageCount > 1;

        featuredNavigation.hidden = !shouldShow;

        featuredPreviousButton.setAttribute(
            "aria-label",
            featuredNavigationCopy[language].previous
        );

        featuredNextButton.setAttribute(
            "aria-label",
            featuredNavigationCopy[language].next
        );

        if (!shouldShow) {
            return;
        }

        if (
            featuredProgress.children.length !== pageCount
        ) {
            renderFeaturedProgress(pageCount, language);
        }

        if (resetPosition) {
            featuredGrid.scrollLeft = 0;
        }

        const activeIndex = featuredPageIndex();

        featuredCounter.textContent =
            `${String(activeIndex + 1).padStart(2, "0")} / ` +
            `${String(pageCount).padStart(2, "0")}`;

        featuredPreviousButton.disabled = activeIndex <= 0;
        featuredNextButton.disabled =
            activeIndex >= pageCount - 1;

        featuredProgress
            .querySelectorAll("[data-badge-page]")
            .forEach((button, index) => {
                const isActive = index === activeIndex;

                button.classList.toggle(
                    "active",
                    isActive
                );

                button.classList.toggle(
                    "completed",
                    index < activeIndex
                );

                button.setAttribute(
                    "aria-current",
                    isActive ? "true" : "false"
                );
            });
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

        window.requestAnimationFrame(() => {
            updateFeaturedMobileNavigation(true);
        });
    }


    const badgesReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    const BADGES_DIALOG_OPEN_DURATION = 320;
    const BADGES_DIALOG_CLOSE_DURATION = 220;

    let badgesDialogOpenTimer = null;
    let badgesDialogCloseTimer = null;


    function clearBadgesDialogTimers() {
        window.clearTimeout(badgesDialogOpenTimer);
        window.clearTimeout(badgesDialogCloseTimer);

        badgesDialogOpenTimer = null;
        badgesDialogCloseTimer = null;
    }


    function finishBadgesDialogClose() {
        if (!dialog) {
            return;
        }

        clearBadgesDialogTimers();

        dialog.classList.remove(
            "is-opening",
            "is-closing"
        );

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


    function openDialog() {
        if (!dialog) {
            return;
        }

        clearBadgesDialogTimers();

        if (!dialog.open) {
            if (typeof dialog.showModal === "function") {
                dialog.showModal();
            } else {
                dialog.setAttribute("open", "");
            }
        }

        document.body.classList.add(
            "badges-dialog-open"
        );

        const layout = dialog.querySelector(
            ".badges-dialog-layout"
        );

        if (layout) {
            layout.scrollTop = 0;
        }

        dialog.classList.remove(
            "is-opening",
            "is-closing"
        );

        if (badgesReducedMotion.matches) {
            return;
        }

        /* Register the visible dialog before starting the entrance motion. */
        void dialog.offsetWidth;

        dialog.classList.add("is-opening");

        badgesDialogOpenTimer = window.setTimeout(
            () => {
                dialog?.classList.remove("is-opening");
                badgesDialogOpenTimer = null;
            },
            BADGES_DIALOG_OPEN_DURATION
        );
    }


    function closeDialog() {
        if (
            !dialog
            || (
                !dialog.open
                && !dialog.hasAttribute("open")
            )
            || dialog.classList.contains("is-closing")
        ) {
            return;
        }

        if (badgesDialogOpenTimer) {
            window.clearTimeout(badgesDialogOpenTimer);
            badgesDialogOpenTimer = null;
        }

        dialog.classList.remove("is-opening");

        if (badgesReducedMotion.matches) {
            finishBadgesDialogClose();
            return;
        }

        dialog.classList.add("is-closing");

        badgesDialogCloseTimer = window.setTimeout(
            finishBadgesDialogClose,
            BADGES_DIALOG_CLOSE_DURATION
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

    dialog?.addEventListener("cancel", (event) => {
        event.preventDefault();
        closeDialog();
    });

    dialog?.addEventListener("close", () => {
        clearBadgesDialogTimers();

        dialog.classList.remove(
            "is-opening",
            "is-closing"
        );

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


    featuredMobileQuery.addEventListener?.(
        "change",
        () => {
            window.requestAnimationFrame(() => {
                updateFeaturedMobileNavigation(true);
            });
        }
    );

    window.addEventListener(
        "resize",
        () => {
            window.requestAnimationFrame(() => {
                updateFeaturedMobileNavigation(false);
            });
        },
        { passive: true }
    );

    renderBadges();
}
)();


