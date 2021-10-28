jQuery(document).ready(function ($) {
	function scrollBehavior() {
		$(document).on("click", 'a[href^="#"]', function (event) {
			event.preventDefault();

			$("html, body").animate(
				{
					scrollTop: $($.attr(this, "href")).offset().top,
				},
				500
			);
		});
	}

	//scrollBehavior();

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
				"-ms-touch-action": "none",
				"touch-action": "none",
			});

			$("#pp-nav").remove();

			$(window).on("scroll", scrollHandler);
		} else {
			$(window).off("scroll", scrollHandler);
			$("#pagepiling").pagepiling({
				anchors: ["home", "about", "portfolio", "awards", "contacts"],

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

		breakpoint.addEventListener("change", scrollAdaptive);
	};

	checkWidth();

	function scrollHandler() {
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
});
