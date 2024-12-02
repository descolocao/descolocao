document.addEventListener("DOMContentLoaded", () => {
    // Seleccionar todas las galerías y banners
    const galleries = document.querySelectorAll(".gallery");
    const banners = document.querySelectorAll(".horizontal-banner");

    // Mostrar/Ocultar galerías al hacer clic en los banners
    banners.forEach((banner, index) => {
        banner.addEventListener("click", () => {
            const currentGallery = galleries[index];

            if (!currentGallery.classList.contains("show")) {
                // Cerrar todas las demás galerías
                galleries.forEach((gallery) => {
                    gallery.classList.remove("show");
                    gallery.classList.add("hide");
                });

                // Mostrar la galería seleccionada
                currentGallery.classList.add("show");
                currentGallery.classList.remove("hide");
            } else {
                // Ocultar la galería seleccionada
                currentGallery.classList.remove("show");
                currentGallery.classList.add("hide");
            }
        });
    });

    // Configuración del Lightbox
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    lightbox.className = "lightbox";
    document.body.appendChild(lightbox);

    const lightboxContent = document.createElement("img");
    lightboxContent.className = "lightbox-content";
    lightbox.appendChild(lightboxContent);

    const closeButton = document.createElement("span");
    closeButton.className = "close";
    closeButton.textContent = "×";
    lightbox.appendChild(closeButton);

    const prevButton = document.createElement("span");
    prevButton.className = "prev";
    prevButton.textContent = "❮";
    lightbox.appendChild(prevButton);

    const nextButton = document.createElement("span");
    nextButton.className = "next";
    nextButton.textContent = "❯";
    lightbox.appendChild(nextButton);

    let currentGalleryImages = [];
    let currentIndex = 0;

    // Seleccionar imágenes dentro de las galerías
    galleries.forEach((gallery) => {
        const images = gallery.querySelectorAll("a");
        images.forEach((image, index) => {
            image.addEventListener("click", (e) => {
                e.preventDefault(); // Evitar comportamiento predeterminado
                currentGalleryImages = Array.from(images);
                currentIndex = index;
                openLightbox(image.href);
            });
        });
    });

    // Funciones del Lightbox
    function openLightbox(src) {
        lightboxContent.src = src;
        lightbox.classList.add("show");

        // Ajustar la posición del Lightbox al scroll actual
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        lightbox.style.top = `${scrollTop}px`;

        document.body.style.overflow = "hidden"; // Desactiva el scroll de la página
    }

    function closeLightbox() {
        lightbox.classList.remove("show");
        document.body.style.overflow = "auto"; // Restaura el scroll
    }

    closeButton.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox || e.target === closeButton) {
            closeLightbox();
        }
    });

    // Navegar imágenes en el Lightbox
    prevButton.addEventListener("click", () => navigateLightbox(-1));
    nextButton.addEventListener("click", () => navigateLightbox(1));

    function navigateLightbox(direction) {
        currentIndex = (currentIndex + direction + currentGalleryImages.length) % currentGalleryImages.length;
        lightboxContent.src = currentGalleryImages[currentIndex].href;
    }

    // Navegación con teclas
    document.addEventListener("keydown", (e) => {
        if (lightbox.classList.contains("show")) {
            if (e.key === "ArrowLeft") navigateLightbox(-1); // Flecha izquierda
            if (e.key === "ArrowRight") navigateLightbox(1); // Flecha derecha
            if (e.key === "Escape") closeLightbox(); // Escape para cerrar
        }
    });
});


