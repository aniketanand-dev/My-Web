// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // =================== NAVBAR ===================
    gsap.from("nav", {
        y: -100,
        duration: 1,
        ease: "power2.out"
    });

    // =================== HERO SECTION ===================
    const nameText = document.querySelector(".name-text");
    if (nameText) {
        const letters = nameText.textContent.split("");
        nameText.innerHTML = letters.map((letter, i) =>
            `<span class="inline-block letter letter-${i}">${letter}</span>`
        ).join("");

        // A - from left
        gsap.from(".letter-0", {
            x: -150,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        // n - flip in (single flip)
        gsap.from(".letter-1", {
            rotateX: 180,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: "back.out(1.7)"
        });

        // i - enter from top, then infinite flip
        gsap.from(".letter-2", {
            y: -120,
            opacity: 0,
            duration: 1,
            delay: 0.4,
            ease: "bounce.out",
            onComplete: () => {
                gsap.to(".letter-2", {
                    rotationX: "+=360",
                    repeat: -1,
                    duration: 1.2,
                    ease: "power2.inOut",
                    repeatDelay: 0.5 // <-- delay between flips
                });
            }
        });

        // k - from bottom
        gsap.from(".letter-3", {
            y: 120,
            opacity: 0,
            duration: 1,
            delay: 0.6,
            ease: "elastic.out(1, 0.5)"
        });

        // e - fade + scale
        gsap.from(".letter-4", {
            scale: 0,
            opacity: 0,
            duration: 1,
            delay: 0.8,
            ease: "back.out(2)"
        });

        // t - from right
        gsap.from(".letter-5", {
            x: 150,
            opacity: 0,
            duration: 1,
            delay: 1,
            ease: "power3.out"
        });

        // Space between first and last name
        gsap.from(".letter-6", {
            opacity: 0,
            duration: 0.5,
            delay: 1.2
        });

        // A (last name) - from left
        gsap.from(".letter-7", {
            x: -150,
            opacity: 0,
            duration: 1,
            delay: 1.3,
            ease: "power3.out"
        });

        // n - flip in (single flip)
        gsap.from(".letter-8", {
            rotateX: 180,
            opacity: 0,
            duration: 1,
            delay: 1.5,
            ease: "back.out(1.7)"
        });

        // a - enter from top
        gsap.from(".letter-9", {
            y: -120,
            opacity: 0,
            duration: 1,
            delay: 1.7,
            ease: "bounce.out"
        });

        // n - from bottom
        gsap.from(".letter-10", {
            y: 120,
            opacity: 0,
            duration: 1,
            delay: 1.9,
            ease: "elastic.out(1, 0.5)"
        });

        // d - fade + scale
        gsap.from(".letter-11", {
            scale: 0,
            opacity: 0,
            duration: 1,
            delay: 2.1,
            ease: "back.out(2)"
        });

        // Subtitle after name
        gsap.from(".hero-subtitle", {
            opacity: 0,
            y: 40,
            duration: 1,
            delay: 2.4
        });

        // Button after subtitle
        gsap.from(".hero-btn", {
            scale: 0,
            duration: 1,
            delay: 2.7,
            ease: "back.out(1.7)"
        });
    }

    // =================== ABOUT SECTION ===================
    gsap.from(".about-text", {
        scrollTrigger: {
            trigger: "#about",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: -100,
        duration: 1.2
    });

    // =================== SKILLS SECTION ===================
    gsap.from(".skills-grid .card", {
        scrollTrigger: {
            trigger: "#skills",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
    });

    // =================== PROJECTS SECTION ===================
    // Initial state
    gsap.set(".project-cards .card", {
        opacity: 0,
        y: 50,      // start slightly below
        scale: 0.9, // slightly smaller
        rotateY: -15
    });

    // Animate project cards when they come into view
    gsap.to(".project-cards .card", {
        scrollTrigger: {
            trigger: "#projects",
            start: "top 75%", // trigger a bit earlier
            toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        scale: 1,
        rotateY: 0,
        duration: 1,
        ease: "power3.out", // smooth easing
        stagger: 0.2
    });

    // =================== CONTACT SECTION ===================
    gsap.from(".contact-text", {
        scrollTrigger: {
            trigger: "#contact",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        scale: 0.5,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
    });

    gsap.from(".contact-btn", {
        scrollTrigger: {
            trigger: "#contact",
            start: "top 70%",
            toggleActions: "play none none none"
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "bounce.out"
    });

    // =================== THEME TOGGLE ===================
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Set initial theme based on saved preference or OS preference
    function setInitialTheme() {
        const savedTheme = localStorage.getItem('theme');
        const osPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

        let currentTheme;

        if (savedTheme) {
            currentTheme = savedTheme;
        } else {
            currentTheme = osPreference;
        }

        if (currentTheme === 'dark') {
            htmlElement.classList.add('dark-mode');
            htmlElement.classList.remove('light-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // show sun icon
        } else {
            htmlElement.classList.add('light-mode');
            htmlElement.classList.remove('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // show moon icon
        }

        // Update section backgrounds if needed
        updateSectionBackgrounds();
    }

    // Update section backgrounds based on current theme
    function updateSectionBackgrounds() {
        const isDarkMode = htmlElement.classList.contains('dark-mode');

        document.getElementById('home').className = isDarkMode ?
            'd-flex align-items-center justify-content-center text-center min-vh-100 bg-dark text-light' :
            'd-flex align-items-center justify-content-center text-center min-vh-100 bg-light text-dark';

        document.getElementById('about').className = isDarkMode ?
            'py-5 bg-secondary text-light' : 'py-5 bg-light text-dark';

        document.getElementById('skills').className = isDarkMode ?
            'py-5 bg-dark text-light' : 'py-5 bg-light text-dark';

        document.getElementById('projects').className = isDarkMode ?
            'py-5 bg-secondary text-light' : 'py-5 bg-light text-dark';

        document.getElementById('contact').className = isDarkMode ?
            'py-5 bg-dark text-light' : 'py-5 bg-light text-dark';

        document.querySelector('footer').className = isDarkMode ?
            'py-4 bg-secondary text-light text-center small' : 'py-4 bg-light text-dark text-center small';
    }

    // Initialize theme
    setInitialTheme();

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        if (htmlElement.classList.contains('dark-mode')) {
            htmlElement.classList.replace('dark-mode', 'light-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            htmlElement.classList.replace('light-mode', 'dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });
});