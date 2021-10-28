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
});
