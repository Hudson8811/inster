$(document).ready(function () {
	$(".portfolio__list").masonry({
		itemSelector: ".portfolio__item",
		gutter: ".portfolio__gutter",
	});

	$(".portfolio__list")
		.imagesLoaded()
		.progress(function () {
			$(".portfolio__list").masonry("layout");
		});
});
