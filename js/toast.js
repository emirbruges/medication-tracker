// Const variables
const toastContainer = document.querySelector(".toast-container");

// Timers
let hidetoastTimer = null;

// toast functions
function showtoast(message = "Toast success", type = "success") {
	const toastElement = document.createElement("div");
	toastElement.className = `toast toast-${type} toast__show`;
	toastElement.id = "toast";
	toastElement.innerHTML = `<svg
				version="1.1"
				class="toast__icon"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				x="0px"
				y="0px"
				viewBox="0 0 416.979 416.979"
				style="enable-background: new 0 0 416.979 416.979"
				xml:space="preserve"
			>
				<g>
					<path
						d="M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85 c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786 c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576 c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765 c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z"
					/>
				</g>
			</svg>
			<p>${message}</p>
			<div id="toast-close" class="toast__close">
				<svg
					version="1.1"
					class="toast_close"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					x="0px"
					y="0px"
					viewBox="0 0 356.218 356.218"
					style="enable-background: new 0 0 356.218 356.218"
					xml:space="preserve"
				>
					<g>
						<path
							d="M350.676,261.501c7.388,7.389,7.388,19.365,0.001,26.754l-62.421,62.421c-7.39,7.389-19.366,7.387-26.755,0l-83.392-83.394 l-83.395,83.394c-7.386,7.388-19.364,7.387-26.752,0L5.541,288.254c-7.388-7.388-7.387-19.364,0.001-26.75l83.395-83.395 L5.543,94.715c-7.387-7.387-7.387-19.365-0.001-26.751L67.965,5.542c7.387-7.388,19.365-7.387,26.75,0l83.395,83.395l83.393-83.395 c7.388-7.387,19.364-7.388,26.753,0l62.422,62.421c7.387,7.388,7.388,19.366,0,26.753l-83.395,83.393L350.676,261.501z"
						/>
					</g>
				</svg>
			</div>
`;

	toastContainer.appendChild(toastElement);

	// toast things
	closetoastElement = toastElement.querySelector("#toast-close");

	// Notiffication actions
	closetoastElement.addEventListener("click", () => {
		hidetoast(toastElement);
	});

	hidetoastTimer = setTimeout(() => {
		hidetoast(toastElement);
	}, 5000);
}

function hidetoast(toastElement) {
	if (toastElement) {
		toastElement.classList.remove("toast__show");
		toastElement.classList.add("toast__hide");
		setTimeout(() => {
			if (
				!Array.from(toastElement.classList).filter((item) => {
					return item == "toast__show";
				})[0]
			) {
				toastElement.remove();
			}
		}, 400);
	}
}

function forceHidetoast() {
	if (hidetoastTimer) {
		clearTimeout(hidetoastTimer);
		hidetoastTimer = null;
	}
	toastElement = document.querySelector("#toast");
	if (toastElement) {
		toastElement.remove();
	}
}
