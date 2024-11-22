document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.menu-icon');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');

    // Funcionalidad para el icono del menú
    menuIcon.addEventListener('click', function () {
        navbar.classList.toggle('active');
    });

    // Agrega un evento de clic a cada enlace del nav
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            // Elimina la clase 'active' de todos los enlaces
            navLinks.forEach(nav => nav.classList.remove('active'));
            // Añade la clase 'active' al enlace que fue clicado
            this.classList.add('active');
        });
    });

    // Añadir evento de clic a cada enlace de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navbar.classList.remove('active'); // Ocultar el menú
        });
    });

    // Selecciona todos los enlaces de la navbar y las secciones
    const navbarLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('section');

    // Función para manejar el cambio de clase 'active' en la navbar
    function changeActiveLink() {
        let scrollPosition = window.scrollY || document.documentElement.scrollTop;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // Verifica si la sección está en el viewport
            if (scrollPosition >= sectionTop - sectionHeight / 3 && scrollPosition < sectionTop + sectionHeight - sectionHeight / 3) {
                navbarLinks.forEach(link => {
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

    // Reproduce los vídeos de manera automática
    const video = document.querySelector('video');

    video.addEventListener('load', function () {
        video.play();
    });

    const text = "Coming soon...";
    const typingElement = document.getElementById("typing-effect");

    function type() {
        typingElement.textContent = text;
        typingElement.classList.add("typing"); // Añade la clase para iniciar la animación
    }

    document.addEventListener("DOMContentLoaded", type); // Inicia la animación cuando el DOM esté cargado
});