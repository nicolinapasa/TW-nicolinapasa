
// Creeaza elementul pentru cursor
const cursor = document.createElement("div");

// Seteaza ID-ul
cursor.id = "cursor";

// Adauga cursorul in pagina
document.body.appendChild(cursor);

// Initializam nuanta culorii
let hue = 0;

// Urmarim miscarea mouse-ului
document.addEventListener("mousemove", (e: MouseEvent) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

// Functie pentru schimbarea culorii
function animateColor() {
    hue = (hue + 1) % 360;

    cursor.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
    cursor.style.boxShadow = `0 0 15px hsl(${hue}, 100%, 50%)`;

    requestAnimationFrame(animateColor);
}

// Pornim animatia
animateColor();
