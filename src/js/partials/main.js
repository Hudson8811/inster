window.addEventListener("DOMContentLoaded", function () {
	const header = document.querySelector(".header");

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
});
