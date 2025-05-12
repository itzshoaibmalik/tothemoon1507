// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true
    });

    // Background Music
    const musicToggle = document.querySelector('.music-toggle');
    let audio = null;

    try {
        audio = new Audio('background-music.mp3');
        audio.loop = true;
        
        musicToggle.addEventListener('click', () => {
            if (audio.paused) {
                audio.play().catch(error => {
                    console.log('Audio playback failed:', error);
                    musicToggle.style.display = 'none';
                });
                musicToggle.classList.add('playing');
            } else {
                audio.pause();
                musicToggle.classList.remove('playing');
            }
        });
    } catch (error) {
        console.log('Audio initialization failed:', error);
        musicToggle.style.display = 'none';
    }

    // Slideshow
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        setInterval(nextSlide, 5000);
    }

    // Photo Grid Lightbox
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            img.onerror = function() {
                this.src = 'https://via.placeholder.com/300x300?text=Add+Your+Photo';
            };
        }

        item.addEventListener('click', () => {
            if (!img) return;
            
            const caption = item.querySelector('.caption')?.textContent || '';
            
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${img.src}" alt="${caption}">
                    <p>${caption}</p>
                    <button class="close-lightbox">&times;</button>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            
            lightbox.querySelector('.close-lightbox').addEventListener('click', () => {
                lightbox.remove();
            });
            
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.remove();
                }
            });
        });
    });

    // Letter Cards
    const letterCards = document.querySelectorAll('.letter-card');
    letterCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // Reflections Carousel
    const reflectionItems = document.querySelectorAll('.reflection-item');
    if (reflectionItems.length > 0) {
        let currentReflection = 0;

        function showReflection(index) {
            reflectionItems.forEach(item => item.style.display = 'none');
            reflectionItems[index].style.display = 'block';
        }

        function nextReflection() {
            currentReflection = (currentReflection + 1) % reflectionItems.length;
            showReflection(currentReflection);
        }

        setInterval(nextReflection, 5000);
        showReflection(0);
    }

    // Goodbye Button
    const goodbyeBtn = document.querySelector('.goodbye-btn');
    if (goodbyeBtn) {
        goodbyeBtn.addEventListener('click', () => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = '❤️';
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 2000);
            
            // Fade out the entire page
            document.body.style.transition = 'opacity 2s ease';
            document.body.style.opacity = '0';
            
            setTimeout(() => {
                document.body.innerHTML = `
                    <div class="final-message">
                        <h1>Thank You for the Memories</h1>
                        <p>Forever in my heart...</p>
                    </div>
                `;
                document.body.style.opacity = '1';
            }, 2000);
        });
    }

    // Add floating hearts animation
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    setInterval(createFloatingHeart, 3000);

    // Add smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}); 