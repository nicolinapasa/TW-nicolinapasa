
// API Card
// API Name: TheMealDB
// Base URL: https://www.themealdb.com/api/json/v1/1
// Endpoint used: /search.php?s=pasta
// HTTP method: GET
// Status code seen: 200
// Fields used: idMeal, strMeal, strCategory, strMealThumb

interface Meal {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strMealThumb: string;
}

interface MealResponse {
    meals: Meal[] | null;
}


async function getJSON<T>(url: string): Promise<T> {

    const controller = new AbortController();

    const timer = setTimeout(() => {
        controller.abort();
    }, 5000);

    try {
        const response = await fetch(url, {
            signal: controller.signal
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json() as T;

    } finally {
        clearTimeout(timer);
    }
}


const statusEl = document.getElementById("status") as HTMLParagraphElement;
const resultsEl = document.getElementById("results") as HTMLDivElement;

function setStatus(text: string): void {
    statusEl.textContent = text;
}

function createCard(item: Meal): HTMLElement {

    const card = document.createElement("div");
    card.className = "card";

    const image = document.createElement("img");
    image.src = item.strMealThumb;
    image.alt = item.strMeal;

    const title = document.createElement("h3");
    title.textContent = item.strMeal;

    const detail = document.createElement("p");
    detail.textContent = "Category: " + item.strCategory;

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(detail);

    return card;
}

function render(items: Meal[]): void {

    resultsEl.innerHTML = "";

    if (items.length === 0) {
        setStatus("No results found.");
        return;
    }

    items.forEach(item => {
        resultsEl.appendChild(createCard(item));
    });

    setStatus(`Loaded ${items.length} result(s).`);
}


const searchForm = document.getElementById("searchForm") as HTMLFormElement;
const queryInput = document.getElementById("queryInput") as HTMLInputElement;
const searchBtn = document.getElementById("searchBtn") as HTMLButtonElement;



function buildURL(query: string): string {
    const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

    return `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`;
}



async function search(): Promise<void> {

    const query = queryInput.value.trim();

    if (!query) {
        setStatus("Please enter a search term.");
        return;
    }

    searchBtn.disabled = true;

    setStatus("Loading...");
    resultsEl.innerHTML = "";

    try {
        const data = await getJSON<MealResponse>(buildURL(query));

        const items: Meal[] = data.meals ?? [];

        render(items);

        localStorage.setItem("lastQuery", query);

    } catch (err: unknown) {

        const msg = err instanceof Error ? err.message : "Unknown error";

        setStatus(`Load failed: ${msg}`);

    } finally {
        searchBtn.disabled = false;
    }
}



searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    search();
});



window.addEventListener("DOMContentLoaded", () => {

    const lastQuery = localStorage.getItem("lastQuery");

    if (lastQuery) {
        queryInput.value = lastQuery;
    }
});
