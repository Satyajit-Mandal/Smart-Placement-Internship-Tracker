let applications = JSON.parse(localStorage.getItem("applications")) || [];

const form = document.getElementById("applicationForm");
const tableBody = document.getElementById("applicationsTable");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const app = {
    company: document.getElementById("company").value,
    role: document.getElementById("role").value,
    stage: document.getElementById("stage").value,
    result: document.getElementById("result").value,
    date: document.getElementById("date").value
  };

  applications.push(app);
  saveAndRender();
  form.reset();
});

function saveAndRender() {
  localStorage.setItem("applications", JSON.stringify(applications));
  renderApplications();
  renderSummary();
}

function renderApplications() {
  tableBody.innerHTML = "";

  applications.forEach((app, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${app.company}</td>
      <td>${app.role}</td>
      <td>${app.stage}</td>
      <td>${app.result}</td>
      <td>${app.date}</td>
      <td>
        <button class="delete-btn" onclick="deleteApplication(${index})">
          Delete
        </button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

function deleteApplication(index) {
  applications.splice(index, 1);
  saveAndRender();
}

function renderSummary() {
  document.getElementById("total").textContent = applications.length;
  document.getElementById("interviews").textContent =
    applications.filter(a => a.stage === "Interview").length;
  document.getElementById("offers").textContent =
    applications.filter(a => a.stage === "Offer").length;
  document.getElementById("rejections").textContent =
    applications.filter(a => a.stage === "Rejected" || a.result === "Rejected").length;
}

renderApplications();
renderSummary();
const themes = {
  blue: "linear-gradient(135deg, #1e3c72, #2a5298, #6dd5fa)",
  purple: "linear-gradient(135deg, #41295a, #2F0743)",
  green: "linear-gradient(135deg, #11998e, #38ef7d)",
  dark: "linear-gradient(135deg, #232526, #414345)"
};

document.querySelectorAll(".theme-picker span").forEach(color => {
  color.addEventListener("click", () => {
    const theme = color.getAttribute("data-theme");
    document.documentElement.style.setProperty(
      "--bg-gradient",
      themes[theme]
    );
    localStorage.setItem("bgTheme", theme);
  });
});

/* Load saved theme */
const savedTheme = localStorage.getItem("bgTheme");
if (savedTheme && themes[savedTheme]) {
  document.documentElement.style.setProperty(
    "--bg-gradient",
    themes[savedTheme]
  );
}
