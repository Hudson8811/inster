window.addEventListener("DOMContentLoaded", function () {
	const header = document.querySelector(".header");
	const portfolioItems = document.querySelectorAll(".portfolio__item");

	const toggleMenu = () => {
		const nav = document.querySelector(".navigation");
		nav.classList.toggle("is-active");
		if (nav.classList.contains("is-active")) {
			document.body.classList.add("scroll-stopped");
		} else {
			document.body.classList.remove("scroll-stopped");
		}
	};

	function clickHandler(e) {
		const target = e.target;
		const menuOpen = target.closest(".header__burger");
		const menuClose = target.closest(".navigation__close");

		if (menuOpen || menuClose) {
			toggleMenu();
		}
	}

	header.addEventListener("click", clickHandler);

	let isDesktop = false;

	const mobileHoverHandler = (query) => {
		if (query.matches) {
			if (isDesktop) document.removeEventListener("mouseover", mouseHandler);
			const portfolioItems = document.querySelectorAll(".portfolio__item");

			portfolioItems.forEach((item) => {
				item.addEventListener("click", function () {
					item.classList[
						item.classList.contains("is-active") ? "remove" : "add"
					]("is-active");
				});
			});
		} else {
			isDesktop = true;
			const mouseHandler = (e) => {
				const target = e.target;
				const portfolio = target.closest(".portfolio");
				const portfolioItem = target.closest(".portfolio__item");
				const portfolio__list = target.matches(".portfolio__list");

				if (portfolio__list || !portfolio) {
					portfolioItems.forEach((item) => item.classList.remove("is-active"));
				} else if (portfolioItem) {
					portfolioItems.forEach((item) =>
						item.classList[item === portfolioItem ? "add" : "remove"](
							"is-active"
						)
					);
				}
			};

			document.addEventListener("mouseover", mouseHandler);
		}
	};

	const checkMedia = () => {
		const breakpoint = window.matchMedia("(max-width: 768px)");
		mobileHoverHandler(breakpoint);
		breakpoint.addEventListener("change", mobileHoverHandler);
	};

	checkMedia();
});
