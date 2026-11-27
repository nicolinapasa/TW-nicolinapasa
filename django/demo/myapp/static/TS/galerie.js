"use strict";
// Array cu imaginile din folderul media
const images = [
    "../media/g1.jpg",
    "../media/g2.jpg",
    "../media/g3.jpg"
];
// Obtinem imaginea din pagina
const mainImage = document.getElementById("carousel-image");
// Verificam daca imaginea exista
if (!mainImage) {
    throw new Error("Imaginea nu a fost gasita!");
}
// Indexul imaginii curente
let currentIndex = 0;
// Functie care schimba imaginea
function showNextImage() {
    mainImage.classList.add("fade");
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length;
        mainImage.src = images[currentIndex];
        mainImage.classList.remove("fade");
    }, 500);
}
// Schimbam imaginea la fiecare 3 secunde
setInterval(showNextImage, 3000);
