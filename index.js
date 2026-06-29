/* ========================================
   ALEX MORGAN PORTFOLIO - MAIN SCRIPTS
   ======================================== */

(function($) {
    'use strict';

    // ============ PRELOADER ============
    $(window).on('load', function() {
        setTimeout(function() {
            $('#preloader').addClass('loaded');
            $('body').css('overflow', 'auto');
            initAnimations();
        }, 1500);
    });

    // Fallback in case load event doesn't fire
    setTimeout(function() {
        $('#preloader').addClass('loaded');
    }, 3000);

    // ============ IMAGE PROTECTION ============
    // Disable right-click on images
    document.addEventListener('contextmenu', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    }, false);

    // Disable image drag
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    }, false);

    // ============ SCROLL PROGRESS ============
    const scrollProgressBar = document.querySelector('.scroll-progress-bar');
    const backToTopProgress = document.querySelector('.back-to-top-progress circle');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        if (scrollProgressBar) {
            scrollProgressBar.style.width = scrollPercent + '%';
        }

        if (backToTopProgress) {
            const dashOffset = 283 - (283 * scrollPercent / 100);
            backToTopProgress.style.strokeDashoffset = dashOffset;
        }
    });

    // ============ NAVBAR ============
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navCta = document.querySelector('.nav-cta');
    
    // Header Request a Quote button scroll
    if (navCta) {
        navCta.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.getElementById('contact');
            if (target) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        updateActiveLink();
    });

    // Mobile toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Active link on scroll
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);

            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }

    // ============ TYPED.JS ============
    function initTyped() {
        if (typeof Typed !== 'undefined' && document.getElementById('typed')) {
            new Typed('#typed', {
                strings: [
                    'Full Stack Developer',
                    'Creative Technologist',
                    'UI/UX Designer',
                    'Cloud Architect',
                    'Problem Solver'
                ],
                typeSpeed: 60,
                backSpeed: 40,
                backDelay: 2000,
                loop: true,
                cursorChar: '|'
            });
        }
    }

    // ============ AOS INIT ============
    function initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                once: true,
                offset: 80,
                disable: 'mobile'
            });
        }
    }

    // ============ ACCESSIBILITY HELPERS ============
    function setAccessibleIconLabels() {
        // Ensure icon-only buttons/links have accessible names
        document.querySelectorAll('.portfolio-actions .view-btn').forEach(btn => {
            if (!btn.getAttribute('aria-label')) {
                btn.setAttribute('aria-label', 'View project details');
                btn.setAttribute('title', 'View project details');
            }
            if (!btn.getAttribute('type')) btn.setAttribute('type', 'button');
        });

        document.querySelectorAll('.portfolio-actions a.portfolio-btn').forEach(a => {
            if (!a.getAttribute('aria-label')) {
                const i = a.querySelector('i');
                if (i) {
                    const cls = i.className;
                    if (cls.includes('fa-external-link-alt')) {
                        a.setAttribute('aria-label', 'Open project link');
                        a.setAttribute('title', 'Open project link');
                    } else if (cls.includes('fa-github')) {
                        a.setAttribute('aria-label', 'View source code on GitHub');
                        a.setAttribute('title', 'View source code on GitHub');
                    } else if (cls.includes('fa-dribbble')) {
                        a.setAttribute('aria-label', 'View on Dribbble');
                        a.setAttribute('title', 'View on Dribbble');
                    } else {
                        a.setAttribute('aria-label', 'Open link');
                    }
                }
            }
        });

        document.querySelectorAll('.social-link, .footer-social-link').forEach(a => {
            if (!a.getAttribute('aria-label')) {
                const i = a.querySelector('i');
                if (i) {
                    const cls = i.className;
                    let name = 'Social link';
                    if (cls.includes('fa-github')) name = 'GitHub';
                    else if (cls.includes('fa-linkedin')) name = 'LinkedIn';
                    else if (cls.includes('fa-twitter')) name = 'Twitter';
                    else if (cls.includes('fa-dribbble')) name = 'Dribbble';
                    else if (cls.includes('fa-instagram')) name = 'Instagram';
                    a.setAttribute('aria-label', name);
                    a.setAttribute('title', name);
                }
            }
        });
    }

    // ============ PARTICLES.JS ============
    function initParticles() {
        if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 50, density: { enable: true, value_area: 800 } },
                    color: { value: ['#2563EB', '#06B6D4', '#8B5CF6'] },
                    shape: { type: 'circle' },
                    opacity: { value: 0.4, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1 } },
                    size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.5 } },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#2563EB',
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 1.5,
                        direction: 'none',
                        random: true,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: true, mode: 'grab' },
                        onclick: { enable: true, mode: 'push' },
                        resize: true
                    },
                    modes: {
                        grab: { distance: 140, line_linked: { opacity: 0.6 } },
                        push: { particles_nb: 4 }
                    }
                },
                retina_detect: true
            });
        }
    }

    // ============ ABOUT TABS ============
    $('.tab-btn').on('click', function() {
        const tabId = $(this).data('tab');
        
        $('.tab-btn').removeClass('active');
        $(this).addClass('active');
        
        $('.tab-content').removeClass('active');
        $('#' + tabId).addClass('active');
    });

    // ============ SKILLS TABS ============
    $('.skill-tab').on('click', function() {
        const category = $(this).data('category');
        
        $('.skill-tab').removeClass('active');
        $(this).addClass('active');
        
        $('.skills-category').removeClass('active');
        $('#' + category).addClass('active');
        
        // Re-animate circular progress
        animateCircularProgress();
    });

    // ============ CIRCULAR PROGRESS ============
    function animateCircularProgress() {
        $('.skills-category.active .circular-progress').each(function() {
            const progress = $(this).data('progress');
            const circle = $(this).find('.progress');
            const circumference = 2 * Math.PI * 54; // r=54
            const offset = circumference - (progress / 100) * circumference;
            
            circle.css({
                'stroke-dasharray': circumference,
                'stroke-dashoffset': circumference
            });
            
            setTimeout(() => {
                circle.css({
                    'stroke-dashoffset': offset,
                    'transition': 'stroke-dashoffset 1.5s ease'
                });
            }, 100);
        });
    }

    // Intersection Observer for skills
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCircularProgress();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        skillsObserver.observe(skillsSection);
    }

    // ============ STATS COUNTER ============
    function animateCounter(element) {
        const target = parseInt($(element).data('target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            $(element).text(Math.floor(current));
        }, 16);
    }

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    $('.stat-number').each(function() {
                        animateCounter(this);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        statsObserver.observe(statsSection);
    }

    // ============ PORTFOLIO FILTER ============
    $('.filter-btn').on('click', function() {
        const filter = $(this).data('filter');
        
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        if (filter === 'all') {
            $('.portfolio-item').removeClass('hidden').css({
                'opacity': 0,
                'transform': 'scale(0.8)'
            }).animate({ opacity: 1 }, 400).css('transform', 'scale(1)');
        } else {
            $('.portfolio-item').each(function() {
                const category = $(this).data('category');
                if (category === filter) {
                    $(this).removeClass('hidden').css({
                        'opacity': 0,
                        'transform': 'scale(0.8)'
                    }).animate({ opacity: 1 }, 400).css('transform', 'scale(1)');
                } else {
                    $(this).addClass('hidden');
                }
            });
        }
    });

    // ============ PROJECT MODAL ============
    const projectData = {
        'project-1': {
            title: 'E-Commerce Platform',
            category: 'Web Application',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop',
            description: 'A comprehensive e-commerce solution built with React and Node.js. Features include real-time inventory management, secure payment processing, advanced search and filtering, user reviews, and an admin dashboard for managing products and orders.',
            client: 'ShopElite Inc.',
            duration: '4 months',
            technologies: 'React, Node.js, MongoDB, Stripe, AWS',
            liveUrl: '#',
            githubUrl: '#'
        },
        'project-2': {
            title: 'Fitness Tracker Pro',
            category: 'Mobile App',
            image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=600&fit=crop',
            description: 'A cross-platform fitness tracking application with AI-powered coaching. Users can track workouts, nutrition, and sleep patterns while receiving personalized recommendations based on their goals and progress.',
            client: 'FitLife Corp',
            duration: '6 months',
            technologies: 'React Native, Firebase, TensorFlow Lite',
            liveUrl: '#',
            githubUrl: '#'
        },
        'project-3': {
            title: 'Banking App Redesign',
            category: 'UI/UX Design',
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b8?w=1200&h=600&fit=crop',
            description: 'Complete redesign of a banking application focusing on simplicity and accessibility. The new design increased user engagement by 65% and reduced support tickets by 40%.',
            client: 'SecureBank',
            duration: '3 months',
            technologies: 'Figma, Prototyping, User Research',
            liveUrl: '#',
            githubUrl: '#'
        },
        'project-4': {
            title: 'AI Content Generator',
            category: 'AI / ML',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop',
            description: 'A GPT-powered content creation platform for marketers. Features include blog post generation, social media content, email campaigns, and SEO optimization suggestions.',
            client: 'ContentPro',
            duration: '5 months',
            technologies: 'OpenAI, Next.js, Python, PostgreSQL',
            liveUrl: '#',
            githubUrl: '#'
        },
        'project-5': {
            title: 'Analytics Dashboard',
            category: 'Web Application',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
            description: 'A real-time data visualization platform with advanced charting capabilities. Features customizable dashboards, data export, automated reporting, and team collaboration tools.',
            client: 'DataViz Co.',
            duration: '4 months',
            technologies: 'Vue.js, D3.js, PostgreSQL, Redis',
            liveUrl: '#',
            githubUrl: '#'
        },
        'project-6': {
            title: 'Travel Booking Platform',
            category: 'UI/UX Design',
            image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=600&fit=crop',
            description: 'A modern travel booking experience with intuitive search, personalized recommendations, and seamless booking flow. Increased conversion rates by 85%.',
            client: 'Wanderlust Travel',
            duration: '3 months',
            technologies: 'Figma, Adobe XD, User Testing',
            liveUrl: '#',
            githubUrl: '#'
        },
        'project-7': {
            title: 'Food Delivery App',
            category: 'Mobile App',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop',
            description: 'An on-demand food delivery application with real-time order tracking, restaurant management, and driver coordination. Serves over 10,000 daily orders.',
            client: 'QuickBite',
            duration: '7 months',
            technologies: 'Flutter, Node.js, Socket.io, MongoDB',
            liveUrl: '#',
            githubUrl: '#'
        },
        'project-8': {
            title: 'Image Recognition API',
            category: 'AI / ML',
            image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1200&h=600&fit=crop',
            description: 'A computer vision API for automated image classification and object detection. Achieves 95% accuracy with sub-second response times.',
            client: 'VisionTech',
            duration: '5 months',
            technologies: 'PyTorch, FastAPI, Docker, AWS',
            liveUrl: '#',
            githubUrl: '#'
        }
    };

    $('.view-btn').on('click', function() {
        const projectId = $(this).data('project');
        const project = projectData[projectId];
        
        if (project) {
            const modalBody = `
                <img src="${project.image}" alt="${project.title}" class="modal-image">
                <span class="modal-category">${project.category}</span>
                <h2>${project.title}</h2>
                <p>${project.description}</p>
                <div class="modal-details">
                    <div class="modal-detail-item">
                        <div class="label">Client</div>
                        <div class="value">${project.client}</div>
                    </div>
                    <div class="modal-detail-item">
                        <div class="label">Duration</div>
                        <div class="value">${project.duration}</div>
                    </div>
                    <div class="modal-detail-item">
                        <div class="label">Technologies</div>
                        <div class="value">${project.technologies}</div>
                    </div>
                </div>
                <div class="modal-buttons">
                    <a href="${project.liveUrl}" class="btn btn-primary magnetic" target="_blank">
                        <i class="fas fa-external-link-alt"></i>
                        <span>Live Demo</span>
                    </a>
                    <a href="${project.githubUrl}" class="btn btn-secondary magnetic" target="_blank">
                        <i class="fab fa-github"></i>
                        <span>View Code</span>
                    </a>
                </div>
            `;
            
            $('#modalBody').html(modalBody);
            $('#projectModal').addClass('active');
            $('body').css('overflow', 'hidden');
        }
    });

    // Close modal
    $('#modalClose, .modal-backdrop').on('click', function() {
        $('#projectModal').removeClass('active');
        $('body').css('overflow', 'auto');
    });

    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
            $('#projectModal').removeClass('active');
            $('body').css('overflow', 'auto');
        }
    });

    // ============ TESTIMONIALS SWIPER ============
    function initSwiper() {
        if (typeof Swiper !== 'undefined' && document.querySelector('.testimonials-swiper')) {
            new Swiper('.testimonials-swiper', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                }
            });
        }
    }

    // ============ FAQ ACCORDION ============
    $('.faq-question').on('click', function() {
        const faqItem = $(this).parent();
        const answer = faqItem.find('.faq-answer');
        const isActive = faqItem.hasClass('active');
        
        // Close all other FAQ items
        $('.faq-item').not(faqItem).each(function() {
            $(this).removeClass('active');
            $(this).find('.faq-answer').stop(true, true).css('max-height', '0px');
        });
        
        // Toggle clicked item
        if (isActive) {
            faqItem.removeClass('active');
            answer.stop(true, true).animate({ maxHeight: '0px' }, 300);
        } else {
            faqItem.addClass('active');
            answer.stop(true, true).animate({ maxHeight: answer[0].scrollHeight + 'px' }, 300);
        }
    });

    // ============ CONTACT FORM ============
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        // Reset errors
        $('.form-group').removeClass('error');
        $('.form-error').text('');
        
        let isValid = true;
        const formData = {};
        
        // Validate name
        const name = $('#name').val().trim();
        if (name.length < 2) {
            showError('#name', 'Please enter your name (min 2 characters)');
            isValid = false;
        } else {
            formData.name = name;
        }
        
        // Validate email
        const email = $('#email').val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('#email', 'Please enter a valid email address');
            isValid = false;
        } else {
            formData.email = email;
        }
        
        // Validate subject
        const subject = $('#subject').val().trim();
        if (subject.length < 3) {
            showError('#subject', 'Please enter a subject (min 3 characters)');
            isValid = false;
        } else {
            formData.subject = subject;
        }
        
        // Validate budget
        const budget = $('#budget').val();
        if (!budget) {
            showError('#budget', 'Please select a budget range');
            isValid = false;
        } else {
            formData.budget = budget;
        }
        
        // Validate message
        const message = $('#message').val().trim();
        if (message.length < 10) {
            showError('#message', 'Please enter a message (min 10 characters)');
            isValid = false;
        } else {
            formData.message = message;
        }
        
        // Optional phone validation
        const phone = $('#phone').val().trim();
        if (phone) {
            const phoneRegex = /^[\d\s\+\-\(\)]+$/;
            if (!phoneRegex.test(phone)) {
                showError('#phone', 'Please enter a valid phone number');
                isValid = false;
            } else {
                formData.phone = phone;
            }
        }
        
        if (isValid) {
            const submitBtn = $('.submit-btn');
            const btnText = submitBtn.find('span');
            const btnIcon = submitBtn.find('i');
            const btnLoader = submitBtn.find('.btn-loader');
            
            // Show loading
            btnText.text('Sending...');
            btnIcon.hide();
            btnLoader.show();
            submitBtn.prop('disabled', true);
            
            // Simulate AJAX submission
            setTimeout(function() {
                // In production, replace with actual AJAX call:
                /*
                $.ajax({
                    url: 'https://formspree.io/f/your-form-id',
                    method: 'POST',
                    data: formData,
                    dataType: 'json',
                    success: function() { ... },
                    error: function() { ... }
                });
                */
                
                btnLoader.hide();
                btnIcon.show();
                btnText.text('Send Message');
                submitBtn.prop('disabled', false);
                
                $('#formStatus')
                    .removeClass('error')
                    .addClass('success')
                    .html('<i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.')
                    .show();
                
                $('#contactForm')[0].reset();
                
                setTimeout(function() {
                    $('#formStatus').fadeOut();
                }, 5000);
            }, 2000);
        }
    });
    
    function showError(selector, message) {
        $(selector).closest('.form-group').addClass('error');
        $(selector).siblings('.form-error').text(message);
    }
    
    // Real-time validation
    $('#contactForm input, #contactForm textarea, #contactForm select').on('input change', function() {
        $(this).closest('.form-group').removeClass('error');
        $(this).siblings('.form-error').text('');
    });

    // Newsletter form
    $('#newsletterForm').on('submit', function(e) {
        e.preventDefault();
        const email = $(this).find('input').val();
        if (email) {
            alert('Thanks for subscribing!');
            $(this)[0].reset();
        }
    });

    // ============ BACK TO TOP ============
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============ MAGNETIC BUTTONS ============
    function initMagnetic() {
        if (window.innerWidth > 1024) {
            document.querySelectorAll('.magnetic').forEach(el => {
                el.addEventListener('mousemove', function(e) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    
                    this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
                });
                
                el.addEventListener('mouseleave', function() {
                    this.style.transform = 'translate(0, 0)';
                });
            });
        }
    }

    // ============ BUTTON RIPPLE ============
    $(document).on('click', '.btn:not(.no-ripple)', function(e) {
        const btn = $(this);
        const ripple = $('<span class="ripple"></span>');
        const size = Math.max(btn.outerWidth(), btn.outerHeight());
        
        ripple.css({
            width: size + 'px',
            height: size + 'px',
            left: e.pageX - btn.offset().left - size / 2 + 'px',
            top: e.pageY - btn.offset().top - size / 2 + 'px'
        });
        
        btn.append(ripple);
        setTimeout(() => ripple.remove(), 600);
    });

    // ============ TILT EFFECT ============
    function initTilt() {
        if (window.innerWidth > 1024) {
            document.querySelectorAll('.tilt-card').forEach(card => {
                card.addEventListener('mousemove', function(e) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 20;
                    const rotateY = (centerX - x) / 20;
                    
                    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
                });
            });
        }
    }

    // ============ PARALLAX ============
    function initParallax() {
        if (window.innerWidth > 1024) {
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.addEventListener('mousemove', function(e) {
                    const x = (e.clientX / window.innerWidth - 0.5) * 2;
                    const y = (e.clientY / window.innerHeight - 0.5) * 2;
                    
                    document.querySelectorAll('.floating-icon').forEach(icon => {
                        const speed = icon.dataset.speed || 1;
                        icon.style.transform = `translate(${x * speed * 20}px, ${y * speed * 20}px)`;
                    });
                });
            }
        }
    }

    // ============ THEME TOGGLE ============
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const icon = this.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }

    // ============ SMOOTH SCROLL ============
    $('a[href^="#"]').on('click', function(e) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800, 'swing');
        }
    });

    // ============ GSAP ANIMATIONS ============
    function initGSAP() {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            
            // Hero entrance
            gsap.from('.hero-badge', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                delay: 0.2
            });
            
            gsap.from('.hero-title', {
                y: 50,
                opacity: 0,
                duration: 1,
                delay: 0.4
            });
            
            gsap.from('.hero-typing', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                delay: 0.6
            });
            
            gsap.from('.hero-description', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                delay: 0.8
            });
            
            gsap.from('.hero-buttons', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                delay: 1
            });
            
            gsap.from('.hero-social', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                delay: 1.2
            });
            
            gsap.from('.hero-image-wrapper', {
                scale: 0.8,
                opacity: 0,
                duration: 1.2,
                delay: 0.5,
                ease: 'back.out(1.7)'
            });
            
            // Section titles
            gsap.utils.toArray('.section-title').forEach(title => {
                gsap.from(title, {
                    scrollTrigger: {
                        trigger: title,
                        start: 'top 80%'
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1
                });
            });
        }
    }

    // ============ INITIALIZE ALL ============
    function initAnimations() {
        initTyped();
        initAOS();
        initParticles();
        initSwiper();
        initMagnetic();
        initTilt();
        initParallax();
        initGSAP();
        setAccessibleIconLabels();
    }

    // Initialize immediately if page already loaded
    if (document.readyState === 'complete') {
        initAnimations();
    }

    // ============ WINDOW RESIZE ============
    let resizeTimer;
    $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        }, 250);
    });

    // ============ LAZY LOADING ============
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ============ CONSOLE EASTER EGG ============
    console.log('%c👋 Hey there, curious developer!', 'font-size: 20px; font-weight: bold; color: #2563EB;');
    console.log('%cLooking at my code? I love meeting fellow developers!', 'font-size: 14px; color: #06B6D4;');
    console.log('%cLet\'s connect: hello@alexmorgan.dev', 'font-size: 14px; color: #8B5CF6;');

})(jQuery);