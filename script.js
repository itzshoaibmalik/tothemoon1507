// Landing Page Animation
document.addEventListener('DOMContentLoaded', () => {
    const letter = document.querySelector('.letter');
    const landingPage = document.querySelector('.landing-page');
    const mainContent = document.querySelector('.main-content');
    const enterBtn = document.querySelector('.enter-btn');
    let isLetterOpened = false;

    // Open letter on click
    letter.addEventListener('click', () => {
        if (!isLetterOpened) {
            letter.classList.add('opened');
            isLetterOpened = true;
            
            // Add paper rustling sound effect
            const paperSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
            paperSound.volume = 0.5;
            paperSound.play();
        }
    });

    // Enter website
    enterBtn.addEventListener('click', () => {
        // Add page turn sound effect
        const pageTurnSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3');
        pageTurnSound.volume = 0.5;
        pageTurnSound.play();

        landingPage.classList.add('fade-out');
        mainContent.style.display = 'block';
        
        setTimeout(() => {
            mainContent.classList.add('show');
            // Initialize AOS after showing main content
            AOS.init({
                duration: 1000,
                once: true
            });
        }, 100);
    });
});

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true
    });

    // Music Player Functionality
    const musicToggle = document.querySelector('.music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    let isMusicPlaying = false;

    musicToggle.addEventListener('click', function() {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicToggle.classList.remove('active');
        } else {
            backgroundMusic.play();
            musicToggle.classList.add('active');
        }
        isMusicPlaying = !isMusicPlaying;
    });

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

    // Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close navigation when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Love Notes Functionality
    const addNoteBtn = document.querySelector('.add-note-btn');
    const notesContainer = document.querySelector('.notes-container');
    const noteTextarea = document.querySelector('.add-note textarea');

    addNoteBtn.addEventListener('click', () => {
        const noteText = noteTextarea.value.trim();
        if (noteText) {
            const noteCard = document.createElement('div');
            noteCard.className = 'note-card';
            noteCard.innerHTML = `
                <p>${noteText}</p>
                <small>${new Date().toLocaleDateString()}</small>
            `;
            notesContainer.prepend(noteCard);
            noteTextarea.value = '';
        }
    });

    // Lightbox for Images
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-content');
    const closeLightbox = document.querySelector('.close-lightbox');

    document.querySelectorAll('.photo-item img, .memory-image img').forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // Memory Timeline Animation
    const memoryItems = document.querySelectorAll('.memory-item');
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    memoryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease-out';
        observer.observe(item);
    });
}); 