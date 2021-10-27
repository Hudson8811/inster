window.addEventListener("DOMContentLoaded", function () {
	const header = document.querySelector(".header");
	const portfolioItems = document.querySelectorAll(".portfolio__item");
	const portfolio = document.querySelector(".portfolio");

	const toggleMenu = () => {
		const nav = document.querySelector(".navigation");

		nav.classList.toggle("is-active");
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

	const mouseHandler = (e) => {
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

	document.addEventListener("mouseover", mouseHandler);

	portfolio.addEventListener("click", (e) => {
		//e.preventDefault();
		const target = e.target;
		const button = target.closest(".portfolio__button");

		if (button) {
			Fancybox.bind(button.closest("li"));
		}
	});
});
