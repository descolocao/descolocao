// Selección de elementos del carrusel
const carouselContainer = document.querySelector('.carousel-container');
const slides = document.querySelectorAll('.carousel-slide');
let currentIndex = 1; // Comenzamos en el índice 1 (ya que clonaremos slides)

// Clonar el primer y último slide para continuidad
const firstSlideClone = slides[0].cloneNode(true);
const lastSlideClone = slides[slides.length - 1].cloneNode(true);
carouselContainer.appendChild(firstSlideClone); // Clonar al final
carouselContainer.insertBefore(lastSlideClone, slides[0]); // Clonar al inicio

// Ajustar posición inicial para mostrar el primer slide
carouselContainer.style.transform = `translateX(-${currentIndex * slides[0].clientWidth}px)`;

// Función para mostrar el slide actual
function showSlide(index) {
    const slideWidth = slides[0].clientWidth; // Ancho de cada slide
    carouselContainer.style.transition = 'transform 1s ease-in-out'; // Transición suave
    carouselContainer.style.transform = `translateX(-${index * slideWidth}px)`;
}

// Reiniciar la posición si se llega a los clones
carouselContainer.addEventListener('transitionend', () => {
    const slideWidth = slides[0].clientWidth;
    if (currentIndex === 0) {
        currentIndex = slides.length; // Mover al último slide real
        carouselContainer.style.transition = 'none'; // Deshabilitar transición temporalmente
        carouselContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    } else if (currentIndex === slides.length + 1) {
        currentIndex = 1; // Mover al primer slide real
        carouselContainer.style.transition = 'none';
        carouselContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
});

// Configurar deslizamiento automático
function startCarousel() {
    setInterval(() => {
        currentIndex++;
        showSlide(currentIndex);
    }, 5000); // Cambia cada 5 segundos
}

// Inicia el carrusel automáticamente
startCarousel();
