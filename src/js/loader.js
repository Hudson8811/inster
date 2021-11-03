document.addEventListener("load", function () {
	function createLoader() {
		const loader = document.createElement("div");
		loader.classList.add("page-loader");
		loader.innerHTML =
			"<svg class='spinner' viewBox='0 0 50 50'><circle class='path' cx='25' cy='25' r='20' fill='none' stroke-width='5'></circle></svg>";
		document.querySelector("html").append(loader);
	}
	createLoader();
});
