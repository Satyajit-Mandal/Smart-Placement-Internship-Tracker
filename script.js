/* APPLICATION DATA */
let applications = JSON.parse(localStorage.getItem("applications")) || [];

/* DOM ELEMENTS */
const form = document.getElementById("applicationForm");
const tableBody = document.getElementById("applicationsTable");

/* ADD APPLICATION */
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const application = {
    id: Date.now(),
    company: document.getElementById("company").value,
    role: document.getElementById("role").value,
    stage: document.getElementById("stage").value,
    result: document.getElementById("result").value,
    date: document.getElementById("date").value
  };

  applications.push(application);
  saveData();
  form.reset();
});

/* SAVE + RENDER */
function saveData() {
  localStorage.setItem("applications", JSON.stringify(applications));
  renderApplications();
  renderSummary();
}

/* RENDER TABLE */
function renderApplications() {
  tableBody.innerHTML = "";

  applications.forEach(app => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${app.company}</td>
      <td>${app.role}</td>
      <td>${app.stage}</td>
      <td>${app.result}</td>
      <td>${app.date}</td>
      <td>
        <button class="delete-btn" data-id="${app.id}">
          Delete
        </button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

/* DELETE */
tableBody.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const id = Number(e.target.dataset.id);
    applications = applications.filter(app => app.id !== id);
    saveData();
  }
});

/* SUMMARY */
function renderSummary() {
  document.getElementById("total").textContent = applications.length;
  document.getElementById("interviews").textContent =
    applications.filter(app => app.stage === "Interview").length;
  document.getElementById("offers").textContent =
    applications.filter(app => app.stage === "Offer").length;
  document.getElementById("rejections").textContent =
    applications.filter(app =>
      app.stage === "Rejected" || app.result === "Rejected"
    ).length;
}

/* THEME SWITCHER */
const themes = {
  blue: "linear-gradient(135deg, #0f4c81, #4fc3f7)",
  orange: "linear-gradient(135deg, #ff8c00, #ffb347)",
  green: "linear-gradient(135deg, #1b7f5a, #4caf50)",
  yellow: "linear-gradient(135deg, #f9a825, #fff176)"
};

document.querySelectorAll(".theme-picker span").forEach(color => {
  color.addEventListener("click", () => {
    const theme = color.dataset.theme;
    document.documentElement.style.setProperty("--bg-gradient", themes[theme]);
    localStorage.setItem("bgTheme", theme);
  });
});

/* LOAD SAVED THEME */
const savedTheme = localStorage.getItem("bgTheme");
if (savedTheme && themes[savedTheme]) {
  document.documentElement.style.setProperty(
    "--bg-gradient",
    themes[savedTheme]
  );
}

/* INITIAL RENDER */
renderApplications();
renderSummary();
