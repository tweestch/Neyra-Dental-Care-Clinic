// ============================================
// WEBSITE INTERAKTIF UNHAS DENTAL CARE - PINK PASTEL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // ===== MOBILE NAVIGATION TOGGLE =====
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // ===== SLIDER FUNCTIONALITY =====
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    let currentIndex = 0;
    let slideInterval;

    function showSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        
        currentIndex = index;
    }

    if (dots.length > 0) {
        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                showSlide(idx);
                resetInterval();
            });
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentIndex - 1);
            resetInterval();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentIndex + 1);
            resetInterval();
        });
    }

    function startInterval() {
        slideInterval = setInterval(() => {
            showSlide(currentIndex + 1);
        }, 5000);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    if (slides.length > 0) {
        startInterval();
    }

    // ===== FLATPICKR DATE PICKER =====
    if (typeof flatpickr !== 'undefined') {
        flatpickr("#date", {
            minDate: "today",
            dateFormat: "d F Y",
            disable: [
                function(date) {
                    return date.getDay() === 0; // Disable Sundays
                }
            ],
            locale: {
                firstDayOfWeek: 1
            }
        });
    }

    // ===== FORM SUBMISSION HANDLING =====
    const form = document.getElementById('reservationForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;
            const date = document.getElementById('date').value.trim();
            const time = document.getElementById('time').value;
            const consent = document.getElementById('consent').checked;

            if (!name || !phone || !service || !date || !time || !consent) {
                showFormMessage('Harap isi semua field yang wajib diisi.', 'error');
                return;
            }

            if (!/^[0-9+\-\s]{10,15}$/.test(phone)) {
                showFormMessage('Nomor WhatsApp tidak valid. Masukkan 10-15 digit angka.', 'error');
                return;
            }

            const email = document.getElementById('email').value.trim();
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showFormMessage('Format email tidak valid.', 'error');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Mengirim...</span> <i class="fas fa-spinner fa-spin"></i>';

            setTimeout(() => {
                showFormMessage('Reservasi berhasil dikirim! Kami akan mengkonfirmasi via WhatsApp dalam 1x24 jam.', 'success');
                form.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>Kirim Reservasi</span> <i class="fas fa-paper-plane"></i>';
                
                setTimeout(() => {
                    if (formMessage) {
                        formMessage.style.display = 'none';
                    }
                }, 7000);
            }, 1500);
        });
    }

    function showFormMessage(text, type) {
        if (!formMessage) return;
        
        formMessage.textContent = text;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
    }

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    if (navLinks && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        const icon = document.querySelector('#navToggle i');
                        if (icon) {
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                    }
                    
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ===== ACTIVE NAV LINK =====
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // ===== SCROLL ANIMATION =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .about-card, .hours-wrapper, .form-wrapper, .team-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});