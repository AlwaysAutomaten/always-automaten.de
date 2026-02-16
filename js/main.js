// ========== LOADING SCREEN ==========
(function() {
    var loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                loader.classList.add('hidden');
                document.body.classList.add('loaded');
            }, 1400);
        });
        // Fallback if load takes too long
        setTimeout(function() {
            loader.classList.add('hidden');
            document.body.classList.add('loaded');
        }, 3000);
    } else {
        document.body.classList.add('loaded');
    }
})();

// ========== SCROLL PROGRESS BAR ==========
(function() {
    var progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;
    window.addEventListener('scroll', function() {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = scrollPercent + '%';
    });
})();

// ========== CURSOR GLOW ==========
(function() {
    var glow = document.getElementById('cursor-glow');
    if (!glow || window.innerWidth < 768) return;
    var mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        glow.classList.add('active');
    });
    document.addEventListener('mouseleave', function() {
        glow.classList.remove('active');
    });
    function animateGlow() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }
    animateGlow();
})();

// ========== PAGE TRANSITIONS ==========
(function() {
    var transition = document.getElementById('page-transition');
    if (!transition) return;
    document.querySelectorAll('a[href]').forEach(function(link) {
        var href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http') || link.getAttribute('target') === '_blank') return;
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var url = this.href;
            transition.classList.add('active');
            setTimeout(function() { window.location.href = url; }, 300);
        });
    });
})();

// ========== HERO PARTICLES ==========
(function() {
    var canvas = document.getElementById('hero-particles');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var particles = [];
    var particleCount = window.innerWidth < 768 ? 30 : 60;

    function resize() {
        var hero = canvas.parentElement;
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function Particle() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        var colors = ['0,180,216', '46,196,182', '232,115,44'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    for (var i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(function(p) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + p.color + ',' + p.opacity + ')';
            ctx.fill();
        });

        // Draw connections
        for (var a = 0; a < particles.length; a++) {
            for (var b = a + 1; b < particles.length; b++) {
                var dx = particles[a].x - particles[b].x;
                var dy = particles[a].y - particles[b].y;
                var dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.strokeStyle = 'rgba(0,180,216,' + (0.08 * (1 - dist / 120)) + ')';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(drawParticles);
    }
    drawParticles();
})();

// ========== TYPING EFFECT ==========
(function() {
    var target = document.querySelector('.typing-target');
    if (!target) return;
    var text = target.textContent;
    target.textContent = '';
    target.classList.add('typing-cursor');
    var charIndex = 0;

    setTimeout(function startTyping() {
        var interval = setInterval(function() {
            if (charIndex < text.length) {
                target.textContent += text.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(interval);
                setTimeout(function() {
                    target.classList.remove('typing-cursor');
                }, 2000);
            }
        }, 60);
    }, 1800);
})();

// ========== 3D TILT ON CARDS ==========
(function() {
    if (window.innerWidth < 768) return;
    document.querySelectorAll('.product-card, .feature-card, .testimonial-card').forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var rotateX = ((y - centerY) / centerY) * -6;
            var rotateY = ((x - centerX) / centerX) * 6;
            card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-8px)';
            card.style.setProperty('--shine-x', (x / rect.width * 100) + '%');
            card.style.setProperty('--shine-y', (y / rect.height * 100) + '%');
        });
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });
})();

// ========== MAGNETIC BUTTONS ==========
(function() {
    if (window.innerWidth < 768) return;
    document.querySelectorAll('.btn-primary, .btn-white').forEach(function(btn) {
        btn.addEventListener('mousemove', function(e) {
            var rect = btn.getBoundingClientRect();
            var x = e.clientX - rect.left - rect.width / 2;
            var y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.15) + 'px)';
        });
        btn.addEventListener('mouseleave', function() {
            btn.style.transform = '';
        });
    });
})();

// ========== ANIMATED COUNTERS ==========
(function() {
    var counters = document.querySelectorAll('.hero-stat-value');
    if (!counters.length) return;
    var animated = false;

    function animateCounters() {
        if (animated) return;
        counters.forEach(function(counter) {
            var text = counter.textContent.trim();
            if (text === '24/7') {
                counter.textContent = '0/0';
                animateValue(counter, '24/7', 800);
            } else if (text === '18+') {
                counter.textContent = '0+';
                animateValue(counter, '18+', 800);
            }
        });
        animated = true;
    }

    function animateValue(el, target, duration) {
        if (target === '24/7') {
            var start = Date.now();
            var timer = setInterval(function() {
                var progress = Math.min((Date.now() - start) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3);
                var h = Math.round(24 * eased);
                var d = Math.round(7 * eased);
                el.textContent = h + '/' + d;
                if (progress >= 1) clearInterval(timer);
            }, 30);
        } else if (target === '18+') {
            var start2 = Date.now();
            var timer2 = setInterval(function() {
                var progress = Math.min((Date.now() - start2) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(18 * eased) + '+';
                if (progress >= 1) clearInterval(timer2);
            }, 30);
        }
    }

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) animateCounters();
        });
    }, { threshold: 0.5 });

    var heroStats = document.querySelector('.hero-stats');
    if (heroStats) observer.observe(heroStats);
})();

// ========== NAVIGATION ==========
var navToggle = document.querySelector('.nav-toggle');
var navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navMenu.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ========== AGE VERIFICATION ==========
(function() {
    var ageModal = document.getElementById('age-modal');
    if (!ageModal) return;

    var verified = sessionStorage.getItem('age-verified');
    if (verified === 'true') {
        ageModal.classList.add('hidden');
        return;
    }

    ageModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    var confirmBtn = document.getElementById('age-confirm');
    var denyBtn = document.getElementById('age-deny');
    var denyMsg = document.getElementById('age-deny-msg');

    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            sessionStorage.setItem('age-verified', 'true');
            ageModal.classList.add('hidden');
            document.body.style.overflow = '';
        });
    }

    if (denyBtn) {
        denyBtn.addEventListener('click', function() {
            if (denyMsg) denyMsg.style.display = 'block';
        });
    }
})();

// ========== COOKIE BANNER (DSGVO) ==========
(function() {
    var banner = document.getElementById('cookie-banner');
    if (!banner) return;

    var consent = localStorage.getItem('cookie-consent');
    if (consent) {
        banner.classList.add('hidden');
        var settings = JSON.parse(consent);
        if (settings.analytics) loadAnalytics();
        return;
    }

    banner.classList.remove('hidden');

    var acceptAllBtn = document.getElementById('cookie-accept-all');
    var saveBtn = document.getElementById('cookie-save');
    var declineBtn = document.getElementById('cookie-decline');
    var analyticsCheckbox = document.getElementById('cookie-analytics');
    var marketingCheckbox = document.getElementById('cookie-marketing');

    function saveConsent(analytics, marketing) {
        var settings = {
            essential: true,
            analytics: analytics,
            marketing: marketing,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('cookie-consent', JSON.stringify(settings));
        banner.classList.add('hidden');
        if (analytics) loadAnalytics();
    }

    if (acceptAllBtn) {
        acceptAllBtn.addEventListener('click', function() {
            saveConsent(true, true);
        });
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            saveConsent(
                analyticsCheckbox ? analyticsCheckbox.checked : false,
                marketingCheckbox ? marketingCheckbox.checked : false
            );
        });
    }

    if (declineBtn) {
        declineBtn.addEventListener('click', function() {
            saveConsent(false, false);
        });
    }
})();

function loadAnalytics() {
    // Google Analytics wird hier geladen wenn Consent gegeben wurde
    // GA4 Measurement ID wird später eingetragen
}

// ========== STAR RATING ==========
var currentRating = 0;

function setRating(rating) {
    currentRating = rating;
    var ratingInput = document.getElementById('rating-value');
    if (ratingInput) ratingInput.value = rating;

    var stars = document.querySelectorAll('.star-rating .star');
    stars.forEach(function(star, i) {
        if (i < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        var href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                var offset = 80;
                var targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        }
    });
});

// ========== ENHANCED SCROLL ANIMATIONS ==========
(function() {
    var animElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-up');
    if (!animElements.length) return;

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    animElements.forEach(function(el) { observer.observe(el); });
})();

// ========== ADD STAGGER CLASSES ==========
(function() {
    var grids = document.querySelectorAll('.products-grid, .features-grid, .testimonials-grid, .map-info-grid');
    grids.forEach(function(grid) {
        grid.classList.add('stagger');
    });
})();

// ========== NAV SCROLL EFFECT ==========
(function() {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.style.borderBottomColor = 'rgba(0,180,216,0.15)';
            nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
        } else {
            nav.style.borderBottomColor = 'rgba(255,255,255,0.08)';
            nav.style.boxShadow = 'none';
        }
    });
})();
