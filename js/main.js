/* =========================================================
   PORTFOLIO MAIN JAVASCRIPT — ADWA NAJMI
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
	// ---- NAVBAR SCROLL EFFECT ----
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

	// ---- MOBILE NAV TOGGLE ----
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

	// ---- GSAP PLUGINS REGISTER ----
	if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
		gsap.registerPlugin(ScrollTrigger);
		if (typeof TextPlugin !== "undefined") {
			gsap.registerPlugin(TextPlugin);
		}

		// Hero Animations
		gsap.set(".hero-badge", { opacity: 0, y: 20 });
		gsap.set(".hero-terminal", { opacity: 0, y: 20 });
		gsap.set(".hero-title", { opacity: 0, y: 40 });
		gsap.set(".hero-desc", { opacity: 0, y: 20 });
		gsap.set(".hero-actions", { opacity: 0, y: 20 });
		gsap.set(".hero-social", { opacity: 0 });
		gsap.set(".hero-scroll", { opacity: 0 });

		const heroTl = gsap.timeline({ delay: 0.3 });
		heroTl
			.to(".hero-badge", {
				opacity: 1,
				y: 0,
				duration: 0.6,
				ease: "power3.out",
			})
			.to(
				".hero-terminal",
				{ opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
				"-=0.4"
			)
			.to(
				".hero-title",
				{ opacity: 1, y: 0, duration: 1, ease: "power4.out" },
				"-=0.3"
			)
			.to(
				".hero-desc",
				{ opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
				"-=0.5"
			)
			.to(
				".hero-actions",
				{ opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
				"-=0.3"
			)
			.to(".hero-social", { opacity: 1, duration: 0.6 }, "-=0.3")
			.to(".hero-scroll", { opacity: 1, duration: 0.6 }, "-=0.3");

		// About Section Animations
		gsap.from(".about-frame", {
			opacity: 0,
			x: -60,
			duration: 1,
			ease: "power3.out",
			scrollTrigger: {
				trigger: "#about",
				start: "top 75%",
				toggleActions: "play none none none",
			},
		});
		gsap.from(".about-text > *", {
			opacity: 0,
			y: 40,
			stagger: 0.12,
			duration: 0.8,
			ease: "power3.out",
			scrollTrigger: {
				trigger: "#about",
				start: "top 70%",
				toggleActions: "play none none none",
			},
		});
		gsap.from(".about-stat", {
			opacity: 0,
			y: 30,
			stagger: 0.1,
			duration: 0.6,
			ease: "power3.out",
			scrollTrigger: {
				trigger: ".about-stats",
				start: "top 85%",
				toggleActions: "play none none none",
			},
		});
		gsap.from(".tech-item", {
			opacity: 0,
			scale: 0.8,
			stagger: 0.06,
			duration: 0.5,
			ease: "back.out(1.7)",
			scrollTrigger: {
				trigger: ".tech-stack",
				start: "top 85%",
				toggleActions: "play none none none",
			},
		});

		// Work Grid Entrance
		gsap.set(".work-card", { opacity: 0, y: 40 });
		ScrollTrigger.batch(".work-card", {
			onEnter: (batch) => {
				gsap.to(batch, {
					opacity: 1,
					y: 0,
					stagger: 0.08,
					duration: 0.6,
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
			x: -40,
			stagger: 0.12,
			duration: 0.8,
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
			y: 40,
			stagger: 0.12,
			duration: 0.8,
			ease: "power3.out",
			scrollTrigger: {
				trigger: "#contact",
				start: "top 75%",
				toggleActions: "play none none none",
			},
		});
		gsap.from(".contact-link", {
			opacity: 0,
			x: 40,
			stagger: 0.1,
			duration: 0.6,
			ease: "power3.out",
			scrollTrigger: {
				trigger: ".contact-links",
				start: "top 80%",
				toggleActions: "play none none none",
			},
		});

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
					const start = Date.now();
					const tick = () => {
						const elapsed = Date.now() - start;
						const progress = Math.min(elapsed / duration, 1);
						el.textContent = Math.round(progress * target);
						if (progress < 1) requestAnimationFrame(tick);
					};
					requestAnimationFrame(tick);
				}

				countUp("expYears", years, 1200);
				countUp("projectCount", projectCount, 1200);
			},
		});
	}

	// ---- INITIALIZE STATS FALLBACK ----
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

	// ---- HERO GRID CANVAS ANIMATION ----
	const heroGrid = document.getElementById("heroGrid");
	if (heroGrid) {
		const gridCanvas = document.createElement("canvas");
		heroGrid.appendChild(gridCanvas);
		const ctx = gridCanvas.getContext("2d");
		let gridW, gridH;

		function resizeGrid() {
			gridW = heroGrid.offsetWidth;
			gridH = heroGrid.offsetHeight;
			gridCanvas.width = gridW;
			gridCanvas.height = gridH;
		}
		resizeGrid();
		window.addEventListener("resize", resizeGrid);

		const gridSize = 60;
		let gridTime = 0;

		function drawGrid() {
			ctx.clearRect(0, 0, gridW, gridH);
			ctx.strokeStyle = "rgba(0, 240, 255, 0.06)";
			ctx.lineWidth = 1;

			for (let x = 0; x < gridW; x += gridSize) {
				ctx.beginPath();
				ctx.moveTo(x, 0);
				ctx.lineTo(x, gridH);
				ctx.stroke();
			}
			for (let y = 0; y < gridH; y += gridSize) {
				ctx.beginPath();
				ctx.moveTo(0, y);
				ctx.lineTo(gridW, y);
				ctx.stroke();
			}

			gridTime += 0.005;
			for (let x = 0; x < gridW; x += gridSize) {
				for (let y = 0; y < gridH; y += gridSize) {
					const pulse =
						Math.sin(x * 0.02 + y * 0.03 + gridTime * 2) * 0.5 + 0.5;
					const alpha = pulse * 0.3;
					ctx.fillStyle = `rgba(0, 240, 255, ${alpha})`;
					ctx.beginPath();
					ctx.arc(x, y, 1.5, 0, Math.PI * 2);
					ctx.fill();
				}
			}
			requestAnimationFrame(drawGrid);
		}
		drawGrid();
	}

	// ---- GLITCH TEXT EFFECT ----
	const glitchEl = document.querySelector("[data-glitch]");
	if (glitchEl) {
		const original = glitchEl.textContent;
		const chars = "!<>-_\\/[]{}—=+*^?#________";
		let interval;

		glitchEl.addEventListener("mouseenter", () => {
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

	// ---- HERO SLIDESHOW ----
	const slides = document.querySelectorAll(".hero-slide");
	if (slides.length > 1) {
		let current = 0;
		setInterval(() => {
			slides[current].classList.remove("active");
			current = (current + 1) % slides.length;
			slides[current].classList.add("active");
		}, 3000);
	}

	// ---- WORK CATEGORY FILTERING ----
	const filterBtns = document.querySelectorAll(".filter-btn");
	const workCards = document.querySelectorAll(".work-card");

	filterBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			filterBtns.forEach((b) => b.classList.remove("active"));
			btn.classList.add("active");

			const category = btn.getAttribute("data-filter");

			workCards.forEach((card) => {
				const cardCat = card.getAttribute("data-category");
				if (category === "all" || cardCat === category) {
					card.style.display = "block";
					gsap.to(card, { opacity: 1, y: 0, scale: 1, duration: 0.4, overwrite: "auto" });
				} else {
					gsap.to(card, {
						opacity: 0,
						scale: 0.95,
						duration: 0.25,
						overwrite: "auto",
						onComplete: () => {
							card.style.display = "none";
						},
					});
				}
			});
		});
	});
});

// ---- MODAL & LIGHTBOX STATE ----
let currentGalleryArray = [];
let currentGalleryIndex = 0;
let savedScrollPosition = 0;

function updateModalScrollState() {
	const activeModal = document.querySelector('.modal-overlay[style*="display: flex"], .image-viewer-overlay[style*="display: flex"]');
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
	const activeOverlay = document.querySelector('.modal-overlay[style*="display: flex"], .image-viewer-overlay[style*="display: flex"]');
	if (activeOverlay) {
		const isInsideContent = e.target.closest('.modal-content, .image-viewer-container');
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

	// Create Gallery Header with View Toggle Switcher
	const header = document.createElement("div");
	header.className = "gallery-header";
	header.innerHTML = `
		<span class="gallery-title"><i class="fas fa-folder-open"></i> Project Media (<span class="gallery-count">${images.length} file${images.length > 1 ? "s" : ""}</span>)</span>
		<div class="gallery-view-toggle">
			<button class="gallery-toggle-btn active" data-view="grid" title="Thumbnail Grid View (Windows File Explorer)"><i class="fas fa-th-large"></i> Grid View</button>
			<button class="gallery-toggle-btn" data-view="list" title="Full Stack List View"><i class="fas fa-list"></i> Full View</button>
		</div>
	`;
	gallery.parentNode.insertBefore(header, gallery);

	// Default to Windows Explorer Grid View
	gallery.classList.add("view-grid");

	// Wrap each image in a thumbnail card with a file label
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
	initModalGalleries(m);
	m.style.display = "flex";
	updateModalScrollState();
	if (typeof gsap !== "undefined") {
		gsap.from(m.querySelector(".modal-content"), {
			opacity: 0,
			y: 40,
			scale: 0.95,
			duration: 0.4,
			ease: "power3.out",
		});
	}
}

function closeModal(id) {
	const m = document.getElementById(id);
	if (!m) return;
	if (typeof gsap !== "undefined") {
		gsap.to(m.querySelector(".modal-content"), {
			opacity: 0,
			y: 20,
			scale: 0.95,
			duration: 0.25,
			ease: "power2.in",
			onComplete: () => {
				m.style.display = "none";
				updateModalScrollState();
			},
		});
	} else {
		m.style.display = "none";
		updateModalScrollState();
	}
}

window.addEventListener("click", (e) => {
	if (e.target.classList.contains("modal-overlay")) {
		closeModal(e.target.id);
	}
});

// ---- FULLSCREEN IMAGE LIGHTBOX VIEWER HANDLERS ----
function updateLightboxImage(index) {
	if (!currentGalleryArray.length) return;
	if (index < 0) index = currentGalleryArray.length - 1;
	if (index >= currentGalleryArray.length) index = 0;

	currentGalleryIndex = index;
	const targetImg = currentGalleryArray[currentGalleryIndex];
	const viewerImg = document.getElementById("imageViewerImg");
	const viewerCaption = document.getElementById("imageViewerCaption");

	if (viewerImg && targetImg) {
		if (typeof gsap !== "undefined") {
			gsap.to(viewerImg, {
				opacity: 0.3,
				scale: 0.96,
				duration: 0.12,
				onComplete: () => {
					viewerImg.src = targetImg.src;
					if (viewerCaption) {
						viewerCaption.textContent = targetImg.alt || `Image ${currentGalleryIndex + 1} of ${currentGalleryArray.length}`;
					}
					gsap.to(viewerImg, { opacity: 1, scale: 1, duration: 0.22, ease: "power2.out" });
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
	if (typeof gsap !== "undefined") {
		gsap.to(viewer.querySelector(".image-viewer-container"), {
			opacity: 0,
			scale: 0.95,
			duration: 0.2,
			ease: "power2.in",
			onComplete: () => {
				viewer.style.display = "none";
				updateModalScrollState();
			},
		});
	} else {
		viewer.style.display = "none";
		updateModalScrollState();
	}
}

document.addEventListener("click", (e) => {
	if (e.target && e.target.classList.contains("modal-media") && e.target.tagName === "IMG") {
		const viewer = document.getElementById("imageViewerModal");
		const viewerImg = document.getElementById("imageViewerImg");
		const viewerCaption = document.getElementById("imageViewerCaption");

		if (!viewer || !viewerImg) return;

		// Collect all gallery images in the parent modal
		const parentModal = e.target.closest(".modal-overlay");
		if (parentModal) {
			currentGalleryArray = Array.from(parentModal.querySelectorAll(".modal-media"));
			currentGalleryIndex = currentGalleryArray.indexOf(e.target);
			if (currentGalleryIndex === -1) currentGalleryIndex = 0;
		} else {
			currentGalleryArray = [e.target];
			currentGalleryIndex = 0;
		}

		// Toggle nav arrows visibility based on gallery length
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

		if (typeof gsap !== "undefined") {
			gsap.fromTo(
				viewer.querySelector(".image-viewer-container"),
				{ opacity: 0, scale: 0.9, y: 20 },
				{ opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "power3.out" }
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
		const activeModal = document.querySelector(
			'.modal-overlay[style*="display: flex"]'
		);
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
