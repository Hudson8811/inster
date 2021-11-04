$(document).ready(function () {
	const sr = ScrollReveal({
		distance: "30%",
		duration: 2000,
		delay: 200,
	});
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

					onLeave: function (index, nextIndex, direction) {
						switch (nextIndex) {
							case 1:
								sr.reveal(".home__content");
								sr.reveal(".home-bg", {
									opacity: 1,
									distance: "1px",
									scale: 1.2,
									duration: 3000,
									origin: "top",
									easing: "linear",
								});
								break;

							case 2:
								sr.reveal(".about__left", {
									origin: "left",
									delay: 400,
									duration: 2000,
								});
								sr.reveal(".about__title");
								sr.reveal(".about__row");
								sr.reveal(".about__links", { delay: 1000 });
								break;
							case 3:
								break;
							case 4:
								sr.reveal(".awards__title", { origin: "left" });
								sr.reveal(".awards__item", {
									interval: 200,
									distance: "100px",
								});
								break;
							case 5:
								sr.reveal(".contacts__info", { origin: "left" });
								sr.reveal(".contacts__form");
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
			sr.reveal(".header", { origin: "top", delay: 0, duration: 1000 });
			sr.reveal(".footer", { origin: "bottom", delay: 0, duration: 1000 });
			sr.reveal(".home__content");
			sr.reveal(".home-bg", {
				opacity: 1,
				distance: "1px",
				scale: 1.2,
				duration: 3000,
				origin: "top",
				easing: "linear",
			});
		} else {
			sr.reveal(".home__content");
			sr.reveal(".home-bg", {
				opacity: 1,
				distance: "1px",
				scale: 1.2,
				duration: 3000,
				origin: "top",
				easing: "linear",
			});
			sr.reveal(".about__left", {
				origin: "left",
				delay: 0,
				duration: 2000,
			});
			sr.reveal(".about__title", { delay: 100 });
			sr.reveal(".about__row", { delay: 100 });
			sr.reveal(".about__links", { delay: 100 });
			sr.reveal(".awards__title", { origin: "left" });
			sr.reveal(".awards__item", {
				interval: 200,
				distance: "60px",
				origin: "left",
			});
			sr.reveal(".contacts__info", { origin: "left" });
			sr.reveal(".contacts__form", { origin: "bottom" });
		}
	});
});
