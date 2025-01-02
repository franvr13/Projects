document.addEventListener('DOMContentLoaded', () => {
    console.log('Archivo script.js cargado correctamente');

    // Selección de elementos
    const menuIcon = document.querySelector('.menu-icon');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('section');
    const video = document.querySelector('video');
    const typingElement = document.getElementById("typing-effect");
    const languageToggle = document.getElementById('languagetoggle');
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');
    const rejectCookies = document.getElementById('rejectCookies');

    // Funcionalidad: Icono de menú
    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });
    }

    // Funcionalidad: Enlaces del navbar
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.forEach(nav => nav.classList.remove('active'));
                link.classList.add('active');
                navbar?.classList.remove('active'); // Ocultar el menú
            });
        });
    }

    // Funcionalidad: Scroll y cambio de enlaces activos
    if (sections.length > 0) {
        const changeActiveLink = () => {
            const scrollPosition = window.scrollY || document.documentElement.scrollTop;
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollPosition >= sectionTop - sectionHeight / 3 &&
                    scrollPosition < sectionTop + sectionHeight - sectionHeight / 3) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${section.id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        };
        window.addEventListener('scroll', changeActiveLink);
    }

    // Funcionalidad: Reproducir video
    if (video) {
        video.addEventListener('loadeddata', () => {
            video.play().catch(error => {
                console.error('Error al reproducir el vídeo:', error);
            });
        });
    }

    // Funcionalidad: Efecto de escritura
    if (typingElement) {
        const text = "Tu mensaje aquí...";
        let index = 0;
        const typingInterval = setInterval(() => {
            typingElement.textContent += text.charAt(index);
            index++;
            if (index >= text.length) clearInterval(typingInterval);
        }, 100);
    }

    // Funcionalidad: Manejo de cookies
    const setCookie = (name, value, days) => {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
    };

    const getCookie = (name) => {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [key, value] = cookie.trim().split('=');
            if (key === name) return value;
        }
        return null;
    };

    if (cookieConsent && acceptCookies && rejectCookies) {
        if (!getCookie('cookiesAccepted')) {
            cookieConsent.style.display = 'block';
        }
        acceptCookies.addEventListener('click', () => {
            setCookie('cookiesAccepted', 'true', 365);
            cookieConsent.style.display = 'none';
        });
        rejectCookies.addEventListener('click', () => {
            setCookie('cookiesAccepted', 'false', 365);
            cookieConsent.style.display = 'none';
        });
    }

    // Funcionalidad: Traducciones
    const translations = { en: {}, es: {} };
    let currentLang = 'en'; // Idioma inicial por defecto

    const loadTranslations = () => {
        return Promise.all([
            fetch('en.json').then(res => res.json()).then(data => translations.en = data),
            fetch('es.json').then(res => res.json()).then(data => translations.es = data)
        ]);
    };

    const updateLanguage = (lang) => {
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            const translation = translations[lang]?.[key];
            if (translation) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translation;
                } else {
                    el.textContent = translation;
                }
            }
        });
    };

    if (languageToggle) {
        loadTranslations().then(() => {
            // Establecer el idioma inicial
            updateLanguage(currentLang);

            // Evento de clic para cambiar el idioma
            languageToggle.addEventListener('click', () => {
                currentLang = currentLang === 'en' ? 'es' : 'en'; // Alternar idioma

                // Actualizar atributos y estilos
                languageToggle.setAttribute('data-language', currentLang);
                languageToggle.textContent = currentLang === 'es' ? 'Español' : 'English';
                document.body.classList.toggle('es', currentLang === 'es');
                document.body.classList.toggle('en', currentLang === 'en');

                // Actualizar traducciones
                updateLanguage(currentLang);
            });
        }).catch(error => {
            console.error('Error al cargar las traducciones:', error);
        });
    }
});