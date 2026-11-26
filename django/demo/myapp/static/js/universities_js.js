const API_URL =
    "http://universities.hipolabs.com/search?country=Romania";

const status = document.getElementById("status");
const tbody = document.getElementById("tbody");
const qInput = document.getElementById("q");
const exportBtn = document.getElementById("exportBtn");
const tableScroll = document.querySelector(".table-scroll");

let all = [];

function setStatus(text) {
    status.textContent = text;
}

function resetTableScroll() {
    if (tableScroll) {
        tableScroll.scrollTop = 0;
        tableScroll.scrollLeft = 0;
    }
}

function renderLoading() {
    tbody.innerHTML = `
        <tr>
            <td colspan="3" class="loading-cell">Se încarcă...</td>
        </tr>
    `;
}

function render(data) {

    if (!data.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="3" class="loading-cell">Nu există rezultate.</td>
            </tr>
        `;
        resetTableScroll();
        return;
    }

    tbody.innerHTML = data.map(u => {

        const site = u.web_pages?.[0]
            ? `<a href="${u.web_pages[0]}" target="_blank" rel="noopener">
                ${u.web_pages[0]}
               </a>`
            : "";

        return `
            <tr>
                <td>${u.name || ""}</td>
                <td>${u.country || ""}</td>
                <td>${site}</td>
            </tr>
        `;

    }).join("");

    resetTableScroll();
}

async function loadUniversities() {

    setStatus("Se încarcă...");

    renderLoading();

    try {

        const res = await fetch(API_URL);

        const data = await res.json();

        all = data;

        render(all);

        setStatus(`Încărcat (${all.length} rezultate).`);

    } catch {

        setStatus("Eroare la încărcare. Încearcă din nou.");

        tbody.innerHTML = `
            <tr>
                <td colspan="3" class="loading-cell">Eroare la încărcare.</td>
            </tr>
        `;
        resetTableScroll();
    }
}

qInput.addEventListener("input", () => {

    const q = qInput.value.trim().toLowerCase();

    const filtered = q
        ? all.filter(u =>
            (u.name || "").toLowerCase().includes(q)
        )
        : all;

    render(filtered);

    setStatus(`Filtrate: ${filtered.length} din ${all.length}.`);
});

loadUniversities();

function exportCSV(data) {

    if (!data.length) {
        alert("Nu există date de exportat.");
        return;
    }

    const header = ["Nume", "Țara", "Site"];

    const rows = data.map(u => [
        u.name || "",
        u.country || "",
        (u.web_pages && u.web_pages[0]) || ""
    ]);

    const csvContent = [header, ...rows]
        .map(row =>
            row.map(value =>
                `"${String(value).replace(/"/g, '""')}"`
            ).join(",")
        )
        .join("\n");

    const blob = new Blob(
        [csvContent],
        { type: "text/csv;charset=utf-8" }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "universitati_romania.csv";
    a.click();

    URL.revokeObjectURL(url);
}

exportBtn.addEventListener("click", () => {
    exportCSV(all);
});