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

	const mouseOverHandler = (e) => {
		const target = e.target;
		const portfolio = target.closest(".portfolio");
		const portfolioItem = target.closest(".portfolio__item");
		const portfolio__list = target.matches(".portfolio__list");

		if (portfolio__list || !portfolio) {
			portfolioItems.forEach((item) => item.classList.remove("is-active"));
		} else if (portfolioItem) {
			portfolioItems.forEach((item) =>
				item.classList[item === portfolioItem ? "add" : "remove"]("is-active")
			);
		}
	};

	const portfolioClickHandler = (e) => {
		const target = e.target;
		const portfolioItem = target.closest(".portfolio__item");

		if (portfolioItem) {
			const button = portfolioItem.querySelector(".portfolio__button");
			button.click();
		}
	};

	const hoverHandler = (query) => {
		const portfolio = document.querySelector(".portfolio");

		if (!query.matches) {
			isDesktop = true;

			document.addEventListener("mouseover", mouseOverHandler);
			portfolio.addEventListener("click", portfolioClickHandler);
		} else {
			if (isDesktop) {
				isDesktop = false;
			}

			document.removeEventListener("mouseover", mouseOverHandler);
			portfolio.removeEventListener("click", portfolioClickHandler);

			const portfolioItems = document.querySelectorAll(".portfolio__item");

			portfolio.addEventListener("click", function (e) {
				const target = e.target;
				const portfolioItem = target.closest(".portfolio__item");

				if (portfolioItem) {
					portfolioItems.forEach((item) => {
						if (item === portfolioItem) {
							item.classList[
								item.classList.contains("is-active") ? "remove" : "add"
							]("is-active");
						} else {
							item.classList.remove("is-active");
						}
					});
				}
			});
		}
	};

	const checkMedia = () => {
		const breakpoint = window.matchMedia("(max-width: 1079px)");

		hoverHandler(breakpoint);

		if (breakpoint.addEventListener) {
			breakpoint.addEventListener("change", hoverHandler);
		} else {
			breakpoint.addListener(hoverHandler);
		}
	};

	checkMedia();
});
