$(document).ready(function () {
	setTimeout(function () {
		$(".portfolio__list").masonry({
			itemSelector: ".portfolio__item",
			gutter: ".portfolio__gutter",
		});
	}, 100);
});
