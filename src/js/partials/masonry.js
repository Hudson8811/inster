$(document).ready(function () {
	const $grid = $(".portfolio__list").masonry({
		itemSelector: ".portfolio__item",
		gutter: ".portfolio__gutter",
	});

	$grid.imagesLoaded().progress(function () {
		$grid.masonry("layout");
	});
});
