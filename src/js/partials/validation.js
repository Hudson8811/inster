window.addEventListener("DOMContentLoaded", function () {
	function validateEmail(email) {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	function validate(object) {
		let input = null;

		if (object.target) {
			input = object.target;
		} else {
			input = object;
		}
		const parent = input.closest(".input-group");
		const error = parent.querySelector("p");

		if (input.value.length < 1) {
			parent.classList.add("has-error");
			error.textContent = "Данное поле обязательно";
		} else {
			parent.classList.remove("has-error");
		}

		if (input.name === "email" && input.value.length > 1) {
			if (validateEmail(input.value)) {
				parent.classList.remove("has-error");
			} else {
				parent.classList.add("has-error");
				error.textContent = "Введен некорректный email";
			}
		}
	}

	async function formSend(form) {
		const modal = document.querySelector(".modal");
		const modalDialog = modal.querySelector(".modal__dialog");
		const modalTitle = modal.querySelector(".modal__title");
		const modalText = modal.querySelector(".modal__text");

		modal.classList.add("is-active");
		modal.classList.add("pending");

		const data = new FormData(form);

		const response = await fetch("send.php", {
			method: "POST",
			body: data,
		});

		if (response.ok) {
			let result = await response.json();
			form.reset();

			modalTitle.textContent = "Thank you!";
			modalText.textContent = "We will contact you soon.";
			modal.classList.remove("pending");
		} else {
			modalTitle.textContent = "Ooops...";
			modalText.textContent = "Something went wrong, please try again later.";
			modal.classList.remove("pending");
		}

		setTimeout(() => {
			modal.classList.remove("is-active");
		}, 3000);
	}

	function submitHandler(e) {
		const form = e.target;
		e.preventDefault();

		if (!form) return;

		const inputs = form.querySelectorAll(".required");

		inputs.forEach((input) => {
			validate(input);
			input.addEventListener("blur", validate);
		});

		const invalidInputs = form.querySelectorAll(".has-error");

		if (invalidInputs.length === 0) {
			formSend(form);
		}
	}

	document.addEventListener("submit", submitHandler);
});
