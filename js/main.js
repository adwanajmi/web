// Portfolio main JavaScript - Adwa Najmi

document.addEventListener("DOMContentLoaded", () => {
	// Navbar scroll effect
	const navbar = document.getElementById("navbar");
	const backToTopBtn = document.getElementById("backToTop");

	window.addEventListener("scroll", () => {
		const curr = window.scrollY;
		if (curr > 80) {
			if (navbar) navbar.classList.add("scrolled");
			if (backToTopBtn) backToTopBtn.classList.add("show");
		} else {
			if (navbar) navbar.classList.remove("scrolled");
			if (backToTopBtn) backToTopBtn.classList.remove("show");
		}
	});

	if (backToTopBtn) {
		backToTopBtn.addEventListener("click", () => {
			window.scrollTo({ top: 0, behavior: "smooth" });
		});
	}

	// Mobile nav toggle
	const hamburger = document.getElementById("navHamburger");
	const navLinks = document.querySelector(".nav-links");

	if (hamburger && navLinks) {
		hamburger.addEventListener("click", () => {
			hamburger.classList.toggle("active");
			navLinks.classList.toggle("open");
		});

		document.querySelectorAll(".nav-link").forEach((link) => {
			link.addEventListener("click", () => {
				hamburger.classList.remove("active");
				navLinks.classList.remove("open");
			});
		});
	}

	// Dark / Light Theme Toggle
	const themeToggle = document.getElementById("themeToggle");
	const themeIcon = document.getElementById("themeIcon");

	function applyTheme(theme) {
		document.documentElement.setAttribute("data-theme", theme);
		try {
			localStorage.setItem("theme", theme);
		} catch (e) {}
		if (themeIcon) {
			themeIcon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
		}
		if (themeToggle) {
			themeToggle.setAttribute(
				"aria-label",
				theme === "light" ? "Switch to dark theme" : "Switch to light theme"
			);
		}
	}

	// Sync initial theme toggle button icon with current attribute
	const initialTheme = document.documentElement.getAttribute("data-theme") || "dark";
	applyTheme(initialTheme);

	if (themeToggle) {
		themeToggle.addEventListener("click", () => {
			const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
			applyTheme(current === "light" ? "dark" : "light");
		});
	}

	// Listen for system theme changes if no explicit storage preference
	if (window.matchMedia) {
		window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", (e) => {
			try {
				if (!localStorage.getItem("theme")) {
					applyTheme(e.matches ? "light" : "dark");
				}
			} catch (err) {}
		});
	}

	// Keyboard accessibility for work cards
	document.querySelectorAll(".work-card").forEach((card) => {
		card.addEventListener("keydown", (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				card.click();
			}
		});
	});

	// Animations (respects prefers-reduced-motion)
	const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
		gsap.registerPlugin(ScrollTrigger);
		if (typeof TextPlugin !== "undefined") {
			gsap.registerPlugin(TextPlugin);
		}

		if (prefersReducedMotion) {
			// Ensure all elements are immediately visible without motion
			gsap.set(
				".hero-status, .hero-specializations, .hero-title, .hero-desc, .hero-actions, .hero-social, .hero-scroll, .about-frame, .about-text > *, .about-stat, .tech-item, .work-card, .journey-item, .contact-text > *, .contact-link",
				{ opacity: 1, x: 0, y: 0, scale: 1 }
			);
		} else {
			// Hero Animations
			gsap.set(".hero-status", { opacity: 0, y: 20 });
			gsap.set(".hero-specializations", { opacity: 0, y: 20 });
			gsap.set(".hero-title", { opacity: 0, y: 30 });
			gsap.set(".hero-desc", { opacity: 0, y: 20 });
			gsap.set(".hero-actions", { opacity: 0, y: 20 });
			gsap.set(".hero-social", { opacity: 0 });
			gsap.set(".hero-scroll", { opacity: 0 });

			const heroTl = gsap.timeline({ delay: 0.2 });
			heroTl
				.to(".hero-status", {
					opacity: 1,
					y: 0,
					duration: 0.5,
					ease: "power3.out",
				})
				.to(
					".hero-specializations",
					{ opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
					"-=0.3"
				)
				.to(
					".hero-title",
					{ opacity: 1, y: 0, duration: 0.8, ease: "power4.out" },
					"-=0.2"
				)
				.to(
					".hero-desc",
					{ opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
					"-=0.4"
				)
				.to(
					".hero-actions",
					{ opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
					"-=0.3"
				)
				.to(".hero-social", { opacity: 1, duration: 0.5 }, "-=0.2")
				.to(".hero-scroll", { opacity: 1, duration: 0.5 }, "-=0.2");

			// About Section Animations
			gsap.from(".about-frame", {
				opacity: 0,
				x: -40,
				duration: 0.8,
				ease: "power3.out",
				scrollTrigger: {
					trigger: "#about",
					start: "top 75%",
					toggleActions: "play none none none",
				},
			});
			gsap.from(".about-text > *", {
				opacity: 0,
				y: 30,
				stagger: 0.1,
				duration: 0.7,
				ease: "power3.out",
				scrollTrigger: {
					trigger: "#about",
					start: "top 70%",
					toggleActions: "play none none none",
				},
			});
			gsap.from(".about-stat", {
				opacity: 0,
				y: 20,
				stagger: 0.08,
				duration: 0.5,
				ease: "power3.out",
				scrollTrigger: {
					trigger: ".about-stats",
					start: "top 85%",
					toggleActions: "play none none none",
				},
			});
			gsap.from(".tech-item", {
				opacity: 0,
				scale: 0.85,
				stagger: 0.05,
				duration: 0.4,
				ease: "power2.out",
				scrollTrigger: {
					trigger: ".tech-stack",
					start: "top 85%",
					toggleActions: "play none none none",
				},
			});

			// Work Grid Entrance
			gsap.set(".work-card", { opacity: 0, y: 30 });
			ScrollTrigger.batch(".work-card", {
				onEnter: (batch) => {
					gsap.to(batch, {
						opacity: 1,
						y: 0,
						stagger: 0.06,
						duration: 0.5,
						ease: "power3.out",
						overwrite: "auto",
					});
				},
				start: "top 90%",
				once: true,
			});

			// Journey Timeline Entrance
			gsap.from(".journey-item", {
				opacity: 0,
				x: -30,
				stagger: 0.1,
				duration: 0.7,
				ease: "power3.out",
				scrollTrigger: {
					trigger: ".journey-timeline",
					start: "top 80%",
					toggleActions: "play none none none",
				},
			});

			// Contact Section Entrance
			gsap.from(".contact-text > *", {
				opacity: 0,
				y: 30,
				stagger: 0.1,
				duration: 0.7,
				ease: "power3.out",
				scrollTrigger: {
					trigger: "#contact",
					start: "top 75%",
					toggleActions: "play none none none",
				},
			});
			gsap.from(".contact-link", {
				opacity: 0,
				x: 30,
				stagger: 0.08,
				duration: 0.5,
				ease: "power3.out",
				scrollTrigger: {
					trigger: ".contact-links",
					start: "top 80%",
					toggleActions: "play none none none",
				},
			});
		}

		// Count-Up Stats
		ScrollTrigger.create({
			trigger: "#about",
			start: "top 70%",
			once: true,
			onEnter: () => {
				const startDate = new Date(2020, 0, 1);
				const now = new Date();
				const years = Math.floor(
					(now - startDate) / (365.25 * 24 * 60 * 60 * 1000)
				);
				const projectCount = document.querySelectorAll(".work-card").length;

				function countUp(elId, target, duration) {
					const el = document.getElementById(elId);
					if (!el) return;
					if (prefersReducedMotion) {
						el.textContent = target;
						return;
					}
					const start = Date.now();
					const tick = () => {
						const elapsed = Date.now() - start;
						const progress = Math.min(elapsed / duration, 1);
						el.textContent = Math.round(progress * target);
						if (progress < 1) requestAnimationFrame(tick);
					};
					requestAnimationFrame(tick);
				}

				countUp("expYears", years, 1000);
				countUp("projectCount", projectCount, 1000);
			},
		});
	}

	// Initialize stats fallback
	const projectCount = document.querySelectorAll(".work-card").length;
	const pCountEl = document.getElementById("projectCount");
	if (pCountEl) pCountEl.textContent = projectCount;

	const startDate = new Date(2020, 0, 1);
	const now = new Date();
	const years = Math.floor(
		(now - startDate) / (365.25 * 24 * 60 * 60 * 1000)
	);
	const expYearsEl = document.getElementById("expYears");
	if (expYearsEl) expYearsEl.textContent = years;

	// Glitch Text Effect (No em dash)
	const glitchEl = document.querySelector("[data-glitch]");
	if (glitchEl) {
		const original = glitchEl.textContent;
		const chars = "!<>-_\\/[]{}=-+*^?#________";
		let interval;

		glitchEl.addEventListener("mouseenter", () => {
			if (prefersReducedMotion) return;
			let iterations = 0;
			clearInterval(interval);
			interval = setInterval(() => {
				glitchEl.textContent = original
					.split("")
					.map((char, i) => {
						if (i < iterations) return original[i];
						return chars[Math.floor(Math.random() * chars.length)];
					})
					.join("");
				if (iterations >= original.length) clearInterval(interval);
				iterations += 1 / 3;
			}, 30);
		});
	}

	// Hero Background Slideshow
	const slides = document.querySelectorAll(".hero-slide");
	if (slides.length > 1) {
		let current = 0;
		setInterval(() => {
			slides[current].classList.remove("active");
			current = (current + 1) % slides.length;
			slides[current].classList.add("active");
		}, 4000);
	}

	// Work Category Filtering
	const filterBtns = document.querySelectorAll(".filter-btn");
	const workCards = document.querySelectorAll(".work-card");

	filterBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			filterBtns.forEach((b) => b.classList.remove("active"));
			btn.classList.add("active");

			const category = btn.getAttribute("data-filter");

			workCards.forEach((card) => {
				const cardCat = card.getAttribute("data-category");
				const match = category === "all" || cardCat === category;
				if (match) {
					card.style.display = "block";
					if (typeof gsap !== "undefined" && !prefersReducedMotion) {
						gsap.to(card, { opacity: 1, y: 0, scale: 1, duration: 0.35, overwrite: "auto" });
					} else {
						card.style.opacity = "1";
					}
				} else {
					if (typeof gsap !== "undefined" && !prefersReducedMotion) {
						gsap.to(card, {
							opacity: 0,
							scale: 0.96,
							duration: 0.2,
							overwrite: "auto",
							onComplete: () => {
								card.style.display = "none";
							},
						});
					} else {
						card.style.display = "none";
					}
				}
			});
		});
	});
});

// Modal and Lightbox State
let currentGalleryArray = [];
let currentGalleryIndex = 0;
let savedScrollPosition = 0;
let lastFocusedElement = null;

function updateModalScrollState() {
	const activeModal = document.querySelector(
		'.modal-overlay[style*="display: flex"], .image-viewer-overlay[style*="display: flex"]'
	);
	if (activeModal) {
		if (!document.body.classList.contains("modal-open")) {
			savedScrollPosition = window.scrollY;
			document.body.classList.add("modal-open");
		}
	} else {
		if (document.body.classList.contains("modal-open")) {
			document.body.classList.remove("modal-open");
			if (typeof savedScrollPosition === "number") {
				window.scrollTo(0, savedScrollPosition);
			}
		}
	}
}

// Lock background scroll wheel events on overlay background
document.addEventListener("wheel", (e) => {
	const activeOverlay = document.querySelector(
		'.modal-overlay[style*="display: flex"], .image-viewer-overlay[style*="display: flex"]'
	);
	if (activeOverlay) {
		const isInsideContent = e.target.closest(".modal-content, .image-viewer-container");
		if (!isInsideContent) {
			e.preventDefault();
		}
	}
}, { passive: false });

function initModalGalleries(modal) {
	if (!modal) return;
	const gallery = modal.querySelector(".modal-gallery");
	if (!gallery || gallery.dataset.initialized === "true") return;

	const images = Array.from(gallery.querySelectorAll("img.modal-media"));
	if (!images.length) return;

	// Gallery Header with View Toggle Switcher
	const header = document.createElement("div");
	header.className = "gallery-header";
	header.innerHTML = `
		<span class="gallery-title"><i class="fas fa-folder-open"></i> Project Media (<span class="gallery-count">${images.length} file${images.length > 1 ? "s" : ""}</span>)</span>
		<div class="gallery-view-toggle">
			<button class="gallery-toggle-btn active" data-view="grid" title="Thumbnail Grid View"><i class="fas fa-th-large"></i> Grid View</button>
			<button class="gallery-toggle-btn" data-view="list" title="Full Stack List View"><i class="fas fa-list"></i> Full View</button>
		</div>
	`;
	gallery.parentNode.insertBefore(header, gallery);

	gallery.classList.add("view-grid");

	// Wrap each image in a thumbnail card
	images.forEach((img, idx) => {
		const card = document.createElement("div");
		card.className = "modal-thumb-card";

		const preview = document.createElement("div");
		preview.className = "modal-thumb-preview";

		const label = document.createElement("div");
		label.className = "modal-thumb-label";
		label.innerHTML = `<i class="far fa-image"></i> <span>${img.alt || `Screenshot ${idx + 1}`}</span>`;

		img.parentNode.insertBefore(card, img);
		preview.appendChild(img);
		card.appendChild(preview);
		card.appendChild(label);
	});

	gallery.dataset.initialized = "true";
}

document.addEventListener("click", (e) => {
	const toggleBtn = e.target.closest(".gallery-toggle-btn");
	if (toggleBtn) {
		const viewMode = toggleBtn.getAttribute("data-view");
		const header = toggleBtn.closest(".gallery-header");
		if (header) {
			const gallery = header.nextElementSibling;
			const buttons = header.querySelectorAll(".gallery-toggle-btn");
			buttons.forEach((b) => b.classList.remove("active"));
			toggleBtn.classList.add("active");
			if (gallery && gallery.classList.contains("modal-gallery")) {
				gallery.classList.remove("view-grid", "view-list");
				gallery.classList.add("view-" + viewMode);
			}
		}
	}
});

function openModal(id) {
	const m = document.getElementById(id);
	if (!m) return;
	lastFocusedElement = document.activeElement;
	initModalGalleries(m);
	m.style.display = "flex";
	updateModalScrollState();

	const closeBtn = m.querySelector(".modal-close");
	if (closeBtn) closeBtn.focus();

	const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	if (typeof gsap !== "undefined" && !prefersReducedMotion) {
		gsap.from(m.querySelector(".modal-content"), {
			opacity: 0,
			y: 30,
			scale: 0.98,
			duration: 0.3,
			ease: "power3.out",
		});
	}
}

function closeModal(id) {
	const m = document.getElementById(id);
	if (!m) return;
	const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	const finalizeClose = () => {
		m.style.display = "none";
		updateModalScrollState();
		if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
			lastFocusedElement.focus();
		}
	};

	if (typeof gsap !== "undefined" && !prefersReducedMotion) {
		gsap.to(m.querySelector(".modal-content"), {
			opacity: 0,
			y: 15,
			scale: 0.98,
			duration: 0.2,
			ease: "power2.in",
			onComplete: finalizeClose,
		});
	} else {
		finalizeClose();
	}
}

window.addEventListener("click", (e) => {
	if (e.target.classList.contains("modal-overlay")) {
		closeModal(e.target.id);
	}
});

// Fullscreen Image Lightbox Viewer
function updateLightboxImage(index) {
	if (!currentGalleryArray.length) return;
	if (index < 0) index = currentGalleryArray.length - 1;
	if (index >= currentGalleryArray.length) index = 0;

	currentGalleryIndex = index;
	const targetImg = currentGalleryArray[currentGalleryIndex];
	const viewerImg = document.getElementById("imageViewerImg");
	const viewerCaption = document.getElementById("imageViewerCaption");

	if (viewerImg && targetImg) {
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (typeof gsap !== "undefined" && !prefersReducedMotion) {
			gsap.to(viewerImg, {
				opacity: 0.3,
				scale: 0.97,
				duration: 0.1,
				onComplete: () => {
					viewerImg.src = targetImg.src;
					if (viewerCaption) {
						viewerCaption.textContent = targetImg.alt || `Image ${currentGalleryIndex + 1} of ${currentGalleryArray.length}`;
					}
					gsap.to(viewerImg, { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" });
				},
			});
		} else {
			viewerImg.src = targetImg.src;
			if (viewerCaption) {
				viewerCaption.textContent = targetImg.alt || `Image ${currentGalleryIndex + 1} of ${currentGalleryArray.length}`;
			}
		}
	}
}

function closeImageViewer() {
	const viewer = document.getElementById("imageViewerModal");
	if (!viewer) return;
	const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	const finalizeViewerClose = () => {
		viewer.style.display = "none";
		updateModalScrollState();
	};

	if (typeof gsap !== "undefined" && !prefersReducedMotion) {
		gsap.to(viewer.querySelector(".image-viewer-container"), {
			opacity: 0,
			scale: 0.96,
			duration: 0.18,
			ease: "power2.in",
			onComplete: finalizeViewerClose,
		});
	} else {
		finalizeViewerClose();
	}
}

document.addEventListener("click", (e) => {
	if (e.target && e.target.classList.contains("modal-media") && e.target.tagName === "IMG") {
		const viewer = document.getElementById("imageViewerModal");
		const viewerImg = document.getElementById("imageViewerImg");
		const viewerCaption = document.getElementById("imageViewerCaption");

		if (!viewer || !viewerImg) return;

		const parentModal = e.target.closest(".modal-overlay");
		if (parentModal) {
			currentGalleryArray = Array.from(parentModal.querySelectorAll(".modal-media"));
			currentGalleryIndex = currentGalleryArray.indexOf(e.target);
			if (currentGalleryIndex === -1) currentGalleryIndex = 0;
		} else {
			currentGalleryArray = [e.target];
			currentGalleryIndex = 0;
		}

		const prevBtn = document.getElementById("imageViewerPrev");
		const nextBtn = document.getElementById("imageViewerNext");
		if (prevBtn && nextBtn) {
			const showNav = currentGalleryArray.length > 1;
			prevBtn.style.display = showNav ? "flex" : "none";
			nextBtn.style.display = showNav ? "flex" : "none";
		}

		viewerImg.src = e.target.src;
		if (viewerCaption) {
			viewerCaption.textContent = e.target.alt || "Image Preview";
		}
		viewer.style.display = "flex";
		updateModalScrollState();

		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (typeof gsap !== "undefined" && !prefersReducedMotion) {
			gsap.fromTo(
				viewer.querySelector(".image-viewer-container"),
				{ opacity: 0, scale: 0.92, y: 15 },
				{ opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power3.out" }
			);
		}
	}
});

const imgViewerPrevBtn = document.getElementById("imageViewerPrev");
if (imgViewerPrevBtn) {
	imgViewerPrevBtn.addEventListener("click", (e) => {
		e.stopPropagation();
		updateLightboxImage(currentGalleryIndex - 1);
	});
}

const imgViewerNextBtn = document.getElementById("imageViewerNext");
if (imgViewerNextBtn) {
	imgViewerNextBtn.addEventListener("click", (e) => {
		e.stopPropagation();
		updateLightboxImage(currentGalleryIndex + 1);
	});
}

const imgViewerCloseBtn = document.getElementById("imageViewerClose");
if (imgViewerCloseBtn) {
	imgViewerCloseBtn.addEventListener("click", closeImageViewer);
}

const imgViewerModalEl = document.getElementById("imageViewerModal");
if (imgViewerModalEl) {
	imgViewerModalEl.addEventListener("click", (e) => {
		if (e.target === imgViewerModalEl || e.target.classList.contains("image-viewer-container")) {
			closeImageViewer();
		}
	});
}

window.addEventListener("keydown", (e) => {
	const imgViewer = document.getElementById("imageViewerModal");
	const isViewerActive = imgViewer && imgViewer.style.display === "flex";

	if (e.key === "Escape") {
		if (isViewerActive) {
			closeImageViewer();
			return;
		}
		const activeModal = document.querySelector('.modal-overlay[style*="display: flex"]');
		if (activeModal) {
			closeModal(activeModal.id);
		}
	} else if (isViewerActive) {
		if (e.key === "ArrowLeft") {
			updateLightboxImage(currentGalleryIndex - 1);
		} else if (e.key === "ArrowRight") {
			updateLightboxImage(currentGalleryIndex + 1);
		}
	}
});
