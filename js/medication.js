// Meds and form things
const formEl = document.getElementById("medForm");
const medsEl = document.getElementById("medList");
const startPageEl = document.getElementById("startPage");
const medsDetailsEl = document.getElementById("medDetails");
// const sidebarEl = document.querySelector(".sidebar");
// Defined in block above
const STORAGE_KEY = "medications";
const startDateEl = document.getElementById("startDate");

// Functions
// Meds and form functions
function todayISO() {
	const d = new Date();
	return d.toISOString().split("T")[0];
}

function loadMeds() {
	return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function saveMeds(meds) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(meds));
}

function renderList() {
	const meds = loadMeds();
	medsEl.innerHTML = meds.length
		? meds
				.map((m, i) => {
					const label = `${i + 1}. ${m.name}`;
					return `<div class="med-item" onclick="openMed(${i})">${label}</div>`;
				})
				.join("")
		: '<div class="no-meds">No medications saved.</div>';
}

function openMed(index) {
	const meds = loadMeds();
	const m = meds[index];
	if (!m) {
		return;
	}

	startPageEl.style.display = "none";
	medsDetailsEl.style.display = "block";

	const started = new Date(m.startDate);
	const now = new Date();
	const diffDays = Math.floor((now - started) / (1000 * 60 * 60 * 24));

	medsDetailsEl.innerHTML = `
			<form id="detailsForm">
				<div class="form-group">
					<label for="expected">Expected reaction</label>
					<textarea name="expected">${m.expected || ""}</textarea>
				</div>
				<div class="form-group">
					<label for="perceived">Perceived reaction</label>
					<textarea name="perceived">${m.perceived || ""}</textarea>
				</div>
				<div class="form-group">
					<label for="sideEfffects">Side effects</label>
					<textarea name="sideEfffects">${m.sideEffects || ""}</textarea>
				</div>
				<div class="form-group">
					<label for="dependency">Dependency</label>
					<input type="text" name="dependency" value="${m.dependency || ""}">
				</div>
				<button type="submit">Save details</button>
			</form>`;

	document
		.getElementById("detailsForm")
		.addEventListener("submit", (event) => {
			event.preventDefault();
			const fd = new FormData(event.target);
			m.expected = fd.get("expected");
			m.perceived = fd.get("perceived");
			m.sideEfffects = fd.get("sideEfffects");
			m.dependency = fd.get("dependency");
			meds[index] = m;
			saveMeds();
			showtoast("Details saved", "info");
		});
}

// Actions
startDateEl.value = todayISO();

formEl.addEventListener("submit", (event) => {
	event.preventDefault();
	const medication = document.getElementById("medication").value.trim();
	const startDate = document.getElementById("startDate").value;
	const when = document.getElementById("when").value.trim();
	const weight = document.getElementById("weight").value;
	const weightType = document.getElementById("miligrams").value
		? document.getElementById("miligrams").value
		: document.getElementById("grams").value;

	if (!medication || !startDate || !when || !weight || !weightType) {
		showtoast("Fill all fields! >:(", "error");
	}

	const meds = loadMeds();
	meds.push({ medication, startDate, when, weight, weightType });
	saveMeds(meds);
	formEl.reset();
	document.getElementById("startDate").value = todayISO();
	renderList();
	showtoast("Medication added.", "success");
});

document.querySelectorAll(".main-page").forEach((element) => {
	element.addEventListener("click", () => {
		startPageEl.style.display = "none";
		medsDetailsEl.style.display = "block";
	});
});
