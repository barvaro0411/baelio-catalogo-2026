// ===================================
// BAELIO 2026 — Visual Effects Engine
// Premium animations, particles, 3D tilt,
// shimmer, and micro-interactions.
// ===================================

(function () {
    'use strict';

    // ─── Floating Particles in Hero ───
    function initParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        canvas.style.cssText = `
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        hero.style.position = 'relative';
        hero.insertBefore(canvas, hero.firstChild);

        const ctx = canvas.getContext('2d');
        let particles = [];
        let animId;

        function resize() {
            canvas.width = hero.offsetWidth;
            canvas.height = hero.offsetHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = -Math.random() * 0.3 - 0.1;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.fadeSpeed = Math.random() * 0.003 + 0.001;
                this.growing = Math.random() > 0.5;
                // Gold / rose / white particles
                const colors = [
                    'rgba(212, 175, 55,',   // gold
                    'rgba(230, 184, 162,',   // rose
                    'rgba(255, 255, 255,',   // white
                    'rgba(155, 89, 182,',    // purple accent
                ];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.growing) {
                    this.opacity += this.fadeSpeed;
                    if (this.opacity >= 0.6) this.growing = false;
                } else {
                    this.opacity -= this.fadeSpeed;
                    if (this.opacity <= 0) this.reset();
                }

                if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
                    this.reset();
                    this.y = canvas.height + 10;
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `${this.color} ${this.opacity})`;
                ctx.fill();
            }
        }

        // Create particles
        const count = Math.min(60, Math.floor(canvas.width / 20));
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animId = requestAnimationFrame(animate);
        }

        // Only animate when hero is in viewport
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                animate();
            } else {
                cancelAnimationFrame(animId);
            }
        }, { threshold: 0.1 });
        observer.observe(hero);
    }

    // ─── 3D Tilt Effect on Product Cards ───
    function init3DTilt() {
        document.addEventListener('mousemove', (e) => {
            const card = e.target.closest('.product-card');
            if (!card) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / centerY * -6;
            const rotateY = (x - centerX) / centerX * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            card.style.transition = 'transform 0.1s ease';

            // Dynamic light reflection
            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;
            card.style.setProperty('--glare-x', `${glareX}%`);
            card.style.setProperty('--glare-y', `${glareY}%`);
        });

        document.addEventListener('mouseleave', (e) => {
            const card = e.target.closest('.product-card');
            if (!card) return;
            card.style.transform = '';
            card.style.transition = 'transform 0.5s ease';
        }, true);

        // Also handle mouseout from card
        document.addEventListener('mouseout', (e) => {
            if (e.target.classList && e.target.classList.contains('product-card')) {
                e.target.style.transform = '';
                e.target.style.transition = 'transform 0.5s ease';
            }
        });
    }

    // ─── Scroll Reveal Animations ───
    function initScrollReveal() {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        // Staggered delay based on position
                        const delay = index * 50;
                        setTimeout(() => {
                            entry.target.classList.add('revealed');
                        }, delay);
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
        );

        // Observe elements that should animate in
        const selectors = [
            '.product-card',
            '.section-title',
            '.hero-title',
            '.hero-subtitle',
            '.hero-buttons',
            '.about-content',
            '.footer-section',
            '.filter-btn',
            '.season-chip'
        ];

        // Use MutationObserver to catch dynamically added elements
        const mutObserver = new MutationObserver(() => {
            document.querySelectorAll(selectors.join(',')).forEach(el => {
                if (!el.classList.contains('reveal-ready') && !el.classList.contains('revealed')) {
                    el.classList.add('reveal-ready');
                    revealObserver.observe(el);
                }
            });
        });

        mutObserver.observe(document.body, { childList: true, subtree: true });

        // Initial pass
        document.querySelectorAll(selectors.join(',')).forEach(el => {
            el.classList.add('reveal-ready');
            revealObserver.observe(el);
        });
    }

    // ─── Button Ripple Effect ───
    function initRipple() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn, .product-btn, .filter-btn, .season-chip, .pagination-btn');
            if (!btn) return;

            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

            btn.style.position = 'relative';
            btn.style.overflow = 'hidden';
            btn.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    }

    // ─── Magnetic Cursor on Buttons ───
    function initMagneticButtons() {
        const magneticEls = document.querySelectorAll('.btn-primary, .btn-secondary');
        magneticEls.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            });
            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
            });
        });
    }

    // ─── Smooth Counter Animation ───
    function initCounterAnimation() {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const text = el.textContent;
                    const match = text.match(/(\d+)/g);
                    if (match) {
                        match.forEach(numStr => {
                            const target = parseInt(numStr);
                            const duration = 1500;
                            const start = performance.now();
                            function step(timestamp) {
                                const progress = Math.min((timestamp - start) / duration, 1);
                                const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
                                const current = Math.floor(eased * target);
                                el.textContent = text.replace(numStr, current.toString());
                                if (progress < 1) requestAnimationFrame(step);
                                else el.textContent = text; // restore original
                            }
                            requestAnimationFrame(step);
                        });
                    }
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        // Observe product counter
        const counter = document.getElementById('product-counter');
        if (counter) counterObserver.observe(counter);
    }

    // ─── Cursor Glow Trail ───
    function initCursorGlow() {
        const glow = document.createElement('div');
        glow.id = 'cursor-glow';
        glow.style.cssText = `
            position: fixed;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.06) 0%, transparent 70%);
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s;
            opacity: 0;
        `;
        document.body.appendChild(glow);

        let timeout;
        document.addEventListener('mousemove', (e) => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
            glow.style.opacity = '1';
            clearTimeout(timeout);
            timeout = setTimeout(() => glow.style.opacity = '0', 2000);
        }, { passive: true });
    }


    // ─── Collapsible Filter Chips ───
    function initCollapsibleFilters() {
        document.querySelectorAll('.advanced-filters-scroll').forEach(scroll => {
            if (scroll.parentElement.classList.contains('advanced-filters-container')) return;

            const container = document.createElement('div');
            container.className = 'advanced-filters-container';
            scroll.parentNode.insertBefore(container, scroll);
            container.appendChild(scroll);

            const btn = document.createElement('button');
            btn.className = 'filters-toggle-btn';
            btn.textContent = 'Ver más ▾';
            btn.setAttribute('aria-expanded', 'false');
            container.appendChild(btn);

            btn.addEventListener('click', () => {
                const expanded = scroll.classList.toggle('expanded');
                btn.textContent = expanded ? 'Ver menos ▴' : 'Ver más ▾';
                btn.setAttribute('aria-expanded', expanded);
            });
        });
    }

    // ─── Init All Visual Effects ───
    document.addEventListener('DOMContentLoaded', () => {
        initParticles();
        init3DTilt();
        initScrollReveal();
        initRipple();
        initMagneticButtons();
        initCursorGlow();

        // Counter animation after a small delay
        setTimeout(initCounterAnimation, 500);

        // Collapsible filters (delayed for dynamic injection)
        setTimeout(initCollapsibleFilters, 600);
    });
})();
