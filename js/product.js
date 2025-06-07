// Simple script to add interactivity
document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault()

            const targetId = this.getAttribute("href")
            if (targetId === "#") return

            const targetElement = document.querySelector(targetId)
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: "smooth",
                })
            }
        })
    })

    // Product image carousels
    document.querySelectorAll(".product-image").forEach((productImage) => {
        // Obtener todas las imágenes dentro del contenedor
        const allImages = Array.from(productImage.querySelectorAll("img"))

        // Solo crear carrusel si hay imágenes
        if (allImages.length === 0) return

        // Obtener las URLs de todas las imágenes
        const imageUrls = allImages.map((img) => img.src)
        const imageAlts = allImages.map((img) => img.alt)

        // Mantener solo la primera imagen visible
        const mainImage = allImages[0]
        // Remover las demás imágenes del DOM
        allImages.slice(1).forEach((img) => img.remove())

        // Solo crear carrusel si hay más de una imagen
        if (imageUrls.length > 1) {
            // Crear indicadores del carrusel
            const indicatorsContainer = document.createElement("div")
            indicatorsContainer.className = "carousel-indicators"
            productImage.appendChild(indicatorsContainer)

            // Añadir indicadores
            imageUrls.forEach((_, index) => {
                const indicator = document.createElement("span")
                indicator.className = "carousel-dot" + (index === 0 ? " active" : "")
                indicator.dataset.index = index
                indicatorsContainer.appendChild(indicator)

                // Añadir evento de clic a los indicadores
                indicator.addEventListener("click", function () {
                    currentIndex = Number.parseInt(this.dataset.index)
                    updateImage()
                    updateIndicators()
                    resetInterval()
                })
            })

            // Variables del carrusel
            let currentIndex = 0
            let intervalId

            function updateImage() {
                mainImage.src = imageUrls[currentIndex]
                mainImage.alt = imageAlts[currentIndex]
            }

            function updateIndicators() {
                indicatorsContainer.querySelectorAll(".carousel-dot").forEach((dot, index) => {
                    dot.className = "carousel-dot" + (index === currentIndex ? " active" : "")
                })
            }

            function nextImage() {
                currentIndex = (currentIndex + 1) % imageUrls.length
                updateImage()
                updateIndicators()
            }

            function resetInterval() {
                clearInterval(intervalId)
                intervalId = setInterval(nextImage, 4000) // Cambio cada 4 segundos
            }

            // Iniciar carrusel automático
            resetInterval()

            // Pausar al pasar el ratón
            productImage.addEventListener("mouseenter", () => clearInterval(intervalId))
            productImage.addEventListener("mouseleave", resetInterval)

            // Crear flechas de navegación
            const prevArrow = document.createElement("div")
            prevArrow.className = "carousel-arrow carousel-prev"
            prevArrow.innerHTML = '<i class="fas fa-chevron-left"></i>'
            productImage.appendChild(prevArrow)

            const nextArrow = document.createElement("div")
            nextArrow.className = "carousel-arrow carousel-next"
            nextArrow.innerHTML = '<i class="fas fa-chevron-right"></i>'
            productImage.appendChild(nextArrow)

            // Eventos de las flechas
            prevArrow.addEventListener("click", (e) => {
                e.stopPropagation()
                currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length
                updateImage()
                updateIndicators()
                resetInterval()
            })

            nextArrow.addEventListener("click", (e) => {
                e.stopPropagation()
                currentIndex = (currentIndex + 1) % imageUrls.length
                updateImage()
                updateIndicators()
                resetInterval()
            })
        }
    })

    // Función para desplazar el slider de productos
    window.scrollSlider = (direction) => {
        const slider = document.querySelector(".product-slider")
        const scrollAmount = slider.clientWidth / 2
        slider.scrollBy({ left: scrollAmount * direction, behavior: "smooth" })
    }
})