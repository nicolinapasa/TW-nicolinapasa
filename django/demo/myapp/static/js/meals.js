"use strict";
// API Card
// API Name: TheMealDB
// Base URL: https://www.themealdb.com/api/json/v1/1
// Endpoint used: /search.php?s=pasta
// HTTP method: GET
// Status code seen: 200
// Fields used: idMeal, strMeal, strCategory, strMealThumb
async function getJSON(url) {
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
        return await response.json();
    }
    finally {
        clearTimeout(timer);
    }
}
const statusEl = document.getElementById("status");
const resultsEl = document.getElementById("results");
function setStatus(text) {
    statusEl.textContent = text;
}
function createCard(item) {
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
function render(items) {
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
const searchForm = document.getElementById("searchForm");
const queryInput = document.getElementById("queryInput");
const searchBtn = document.getElementById("searchBtn");
function buildURL(query) {
    const BASE_URL = "https://www.themealdb.com/api/json/v1/1";
    return `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`;
}
async function search() {
    var _a;
    const query = queryInput.value.trim();
    if (!query) {
        setStatus("Please enter a search term.");
        return;
    }
    searchBtn.disabled = true;
    setStatus("Loading...");
    resultsEl.innerHTML = "";
    try {
        const data = await getJSON(buildURL(query));
        const items = (_a = data.meals) !== null && _a !== void 0 ? _a : [];
        render(items);
        localStorage.setItem("lastQuery", query);
    }
    catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        setStatus(`Load failed: ${msg}`);
    }
    finally {
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
