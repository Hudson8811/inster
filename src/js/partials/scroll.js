$(document).ready(function () {
	ScrollReveal({
		distance: "30%",
		duration: 2000,
		delay: 200,
	});
	const sections = document.querySelectorAll(".section");

	function scrollAnimate() {
		$(".navigation__link").each((idx, item) => {
			$(item).on("click", function () {
				if ($(".navigation").hasClass("is-active")) {
					$(".navigation").removeClass("is-active");
					$("body").removeClass("scroll-stopped");
				}
			});
		});

		const scrollAdaptive = (breakpoint) => {
			if (breakpoint.matches) {
				const PP = $("#pagepiling");
				PP.attr({
					style: "",
				});
				PP.find(".pp-section").css({
					zIndex: "",
					transform: "",
					"-webkit-transform": "",
					"-moz-transform": "",
					"-ms-transform": "",
				});
				PP.find(".pp-section").removeClass(
					"pp-section pp-table pp-scrollable active pp-easing"
				);

				PP.find("li").css({
					zIndex: "",
					transform: "",
					"-webkit-transform": "",
					"-moz-transform": "",
					"-ms-transform": "",
				});

				PP.find(".pp-tableCell").removeClass("pp-tableCell");

				$("body, html").css({
					overflow: "initial",
					"-ms-touch-action": "initial",
					"touch-action": "initial",
				});

				$("#pp-nav").remove();

				$(window).on("scroll", scrollHandler);
			} else {
				$(window).off("scroll", scrollHandler);
				$("body, html").css({
					overflow: "",
					"-ms-touch-action": "",
					"touch-action": "",
				});
				$("#pagepiling").pagepiling({
					anchors: ["home", "about", "portfolio", "awards", "contacts"],
					afterRender: function () {
						if (document.querySelector(".home").classList.contains("active")) {
							ScrollReveal().reveal(".home__content");
							ScrollReveal().reveal(".home-bg", {
								opacity: 1,
								distance: "1px",
								scale: 1.2,
								duration: 3000,
								origin: "top",
								easing: "linear",
							});
						}
					},

					onLeave: function (index, nextIndex, direction) {
						sections.forEach((section) => {
							section.querySelectorAll("[data-sr-id]").forEach((item) => {
								if (item.getAttribute("style")) {
									setTimeout(() => {
										item.removeAttribute("style");
										item.removeAttribute("data-sr-id");
									}, 800);
								}
							});
						});

						switch (nextIndex) {
							case 1:
								ScrollReveal().reveal(".home__content");
								ScrollReveal().reveal(".home-bg", {
									opacity: 1,
									distance: "1px",
									scale: 1.2,
									duration: 3000,
									origin: "top",
									easing: "linear",
								});
								break;

							case 2:
								ScrollReveal().reveal(".about__left", {
									origin: "left",
									delay: 400,
									duration: 2000,
								});
								ScrollReveal().reveal(".about__title");
								ScrollReveal().reveal(".about__row");
								break;
							case 3:
								break;
							case 4:
								ScrollReveal().reveal(".awards__title", { origin: "left" });
								ScrollReveal().reveal(".awards__item", {
									interval: 200,
									distance: "100px",
								});
								break;
							case 5:
								ScrollReveal().reveal(".contacts__info", { origin: "left" });
								ScrollReveal().reveal(".contacts__form");
								break;
						}
					},

					afterLoad: function (anchorLink, index) {
						$(".navigation__link").each((idx, item) => {
							if (item.href.includes(anchorLink)) {
								$(item).addClass("current");
							} else {
								$(item).removeClass("current");
							}
						});

						if (anchorLink !== "home" && anchorLink !== "contacts") {
							$(".header").addClass("header--dark");
							$(".footer").addClass("footer--dark");
							$("#pp-nav").addClass("is-dark");
						} else {
							$(".header").removeClass("header--dark");
							$(".footer").removeClass("footer--dark");
							$("#pp-nav").removeClass("is-dark");
						}
					},
				});
			}
		};

		const checkWidth = () => {
			const breakpoint = window.matchMedia("(max-width: 1024px)");

			scrollAdaptive(breakpoint);

			if (breakpoint.addEventListener) {
				breakpoint.addEventListener("change", scrollAdaptive);
			} else {
				breakpoint.addListener(scrollAdaptive);
			}
		};

		checkWidth();

		function scrollHandler() {
			if ($(window).scrollTop() > 100) {
				$(".header").addClass("header--white");
			} else {
				$(".header").removeClass("header--white");
			}

			var $sections = $("section");
			$sections.each(function (i, el) {
				var top = $(el).offset().top - 100;
				var bottom = top + $(el).height();
				var scroll = $(window).scrollTop();
				var id = $(el).attr("id");
				if (scroll > top && scroll < bottom) {
					if ($("a.current").attr("href").includes(id)) {
						return;
					}
					$(".header").remove("header--dark");
					if (id === "about" || id === "awards") {
						$(".header").addClass("header--dark");
						$(".footer").addClass("footer--dark");
					}
					if (id === "home" || id === "contacts") {
						$(".header").removeClass("header--dark");
						$(".footer").removeClass("footer--dark");
					}
					$("a.current").removeClass("current");
					$('a[href="#' + id + '"]').addClass("current");
				}
			});
		}
	}

	scrollAnimate();

	$(".animsition").on("animsition.inStart", function () {
		if (!window.matchMedia("(max-width: 768px)").matches) {
			ScrollReveal().reveal(".header", {
				origin: "top",
				delay: 0,
				duration: 1000,
			});
			ScrollReveal().reveal(".footer", {
				origin: "bottom",
				delay: 0,
				duration: 1000,
			});
		} else {
			ScrollReveal().reveal(".home__content");
			ScrollReveal().reveal(".home-bg", {
				opacity: 1,
				distance: "1px",
				scale: 1.2,
				duration: 3000,
				origin: "top",
				easing: "linear",
			});
			ScrollReveal().reveal(".about__left", {
				origin: "left",
				delay: 0,
				duration: 2000,
			});
			ScrollReveal().reveal(".about__title", { delay: 100 });
			ScrollReveal().reveal(".about__row", { delay: 100 });
			ScrollReveal().reveal(".about__links", { delay: 100 });
			ScrollReveal().reveal(".awards__title", { origin: "left" });
			ScrollReveal().reveal(".awards__item", {
				interval: 200,
				distance: "60px",
				origin: "left",
			});
			ScrollReveal().reveal(".contacts__info", { origin: "left" });
			ScrollReveal().reveal(".contacts__form", { origin: "bottom" });
		}
	});
});
