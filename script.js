document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const resourceItems = document.querySelectorAll('.resource-item');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentIndex = 0;

    function showResource(index) {
        resourceItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    }

    function nextResource() {
        currentIndex = (currentIndex + 1) % resourceItems.length;
        showResource(currentIndex);
    }

    function prevResource() {
        currentIndex = (currentIndex - 1 + resourceItems.length) % resourceItems.length;
        showResource(currentIndex);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextResource);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevResource);
    }

    setInterval(nextResource, 4000);
});

document.addEventListener('DOMContentLoaded', function() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const placeholders = document.querySelectorAll('.figure-placeholder, .video-placeholder, .resource-placeholder');
    
    placeholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        const rate = scrolled * -0.5;
        heroVisual.style.transform = `translateY(${rate}px)`;
    }
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        const notification = document.createElement('div');
        notification.textContent = 'Copied to clipboard!';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.style.opacity = '1', 100);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.contribution-card, .scenario-card, .finding-card, .artifact-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
});

const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

window.addEventListener('load', function() {
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    }
});

window.addEventListener('error', function(e) {
    console.warn('Resource failed to load:', e.target.src || e.target.href);
});

function revealOnScroll() {
    const reveals = document.querySelectorAll('[data-reveal]');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

document.addEventListener('DOMContentLoaded', function() {
    console.log('HAT-Lab website initialized successfully!');
    handlePDFEmbeds();
});

function handlePDFEmbeds() {
    const pdfEmbeds = document.querySelectorAll('embed[type="application/pdf"]');
    
    pdfEmbeds.forEach(embed => {
        embed.addEventListener('error', function() {
            const fallbackContainer = document.createElement('div');
            fallbackContainer.className = 'pdf-fallback';
            fallbackContainer.innerHTML = `
                <div class="fallback-content">
                    <i class="fas fa-file-pdf"></i>
                    <h4>View PDF</h4>
                    <p>Click below to open the document</p>
                    <a href="${embed.src}" target="_blank" class="btn btn-primary">
                        <i class="fas fa-external-link-alt"></i>
                        Open PDF
                    </a>
                </div>
            `;
            
            embed.parentNode.replaceChild(fallbackContainer, embed);
        });
        
        embed.addEventListener('click', function(e) {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                window.open(this.src, '_blank');
            }
        });
    });
}

(function() {
    if (typeof window === 'undefined') return;
    var injectClustr = function() {
        try {
            var parts = ['//clust', 'rmaps', '.com', '/map', '_v2', '.js', '?d=',
                'VxrmRBJwMFBZXGRJxTEMbJZn6LCbubmq2Qd6b-qr7x8', '&cl=ffffff', '&w=a'
            ];
            var url = parts.join('');
            if (url.slice(0, 2) === '//') {
                url = (location.protocol === 'https:' ? 'https:' : 'http:') + url;
            }

            var s = document.createElement('script');
            s.async = true;
            s.src = url;
            s.crossOrigin = 'anonymous';
            s.referrerPolicy = 'no-referrer';
            s.setAttribute('data-hidden', 'true');
            s.style.display = 'none';

            var cleanupWidgets = function() {
                try {
                    var selectors = ['#clustrmaps', '#clustrmaps-widget', '.clustrmaps', '.clustrmaps-widget'];
                    selectors.forEach(function(sel) {
                        document.querySelectorAll(sel).forEach(function(node) {
                            if (node && node.parentNode) node.parentNode.removeChild(node);
                        });
                    });
                } catch (e) {}
            };

            s.addEventListener('load', function() {
                try { if (s && s.parentNode) s.parentNode.removeChild(s); } catch (e) {}
                cleanupWidgets();
            });
            s.addEventListener('error', function() {
                try { if (s && s.parentNode) s.parentNode.removeChild(s); } catch (e) {}
            });

            var style = document.createElement('style');
            style.textContent = '#clustrmaps, #clustrmaps-widget, .clustrmaps, .clustrmaps-widget {\n  display: none !important;\n  visibility: hidden !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}';
            document.head.appendChild(style);

            (document.head || document.documentElement).appendChild(s);

            setTimeout(cleanupWidgets, 0);
            setTimeout(cleanupWidgets, 3000);
        } catch (e) {}
    };

    if (document.readyState === 'complete') {
        injectClustr();
    } else {
        window.addEventListener('load', injectClustr, { once: true });
    }
})();
