console.log('Archivo script.js cargado correctamente');

document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.menu-icon');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('section');
    const video = document.querySelector('video');
    const typingElement = document.getElementById("typing-effect");
    const text = "Coming soon...";

    // Funcionalidad para el icono del menú
    menuIcon?.addEventListener('click', () => {
        navbar?.classList.toggle('active');
    });

    // Agrega evento a los enlaces del nav para activar/desactivar la clase 'active'
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Elimina la clase 'active' de todos los enlaces y oculta el menú
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
            navbar?.classList.remove('active'); // Ocultar el menú en dispositivos móviles
        });
    });

    // Función para manejar el cambio de clase 'active' en la navbar según el scroll
    function changeActiveLink() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // Verifica si la sección está visible en el viewport
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
    }

    // Añade el evento de scroll
    window.addEventListener('scroll', changeActiveLink);

    // Reproduce automáticamente el vídeo si está presente
    if (video) {
        video.addEventListener('loadeddata', () => {
            video.play().catch(error => {
                console.error('Error al reproducir el vídeo:', error);
            });
        });
    }

    // Efecto de escritura en el elemento con ID 'typing-effect'
    function typeEffect() {
        if (typingElement) {
            typingElement.textContent = text;
            typingElement.classList.add("typing"); // Añade la clase para iniciar la animación
        }
    }

    typeEffect(); // Inicia el efecto de escritura
});

document.addEventListener('DOMContentLoaded', () => {
    // Elementos del aviso de cookies
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');
    const rejectCookies = document.getElementById('rejectCookies');

    // Función para establecer cookies
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
    }

    // Función para obtener una cookie
    function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [key, value] = cookie.trim().split('=');
            if (key === name) {
                return value;
            }
        }
        return null;
    }

    // Mostrar el aviso de cookies si no hay preferencia guardada
    if (!getCookie('cookiesAccepted')) {
        cookieConsent.style.display = 'block';
    }

    // Eventos para aceptar o rechazar cookies
    acceptCookies.addEventListener('click', () => {
        setCookie('cookiesAccepted', 'true', 365);
        cookieConsent.style.display = 'none';
    });

    rejectCookies.addEventListener('click', () => {
        setCookie('cookiesAccepted', 'false', 365);
        cookieConsent.style.display = 'none';
    });
});