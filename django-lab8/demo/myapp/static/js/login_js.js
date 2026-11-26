let loginForm = document.getElementById("loginForm");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");

loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    const emailRegex = /^[a-z]+\.[a-z]+\d{0,2}@e-uvt\.ro$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{7,}$/;

    if (!emailRegex.test(email)) {
        alert("Emailul trebuie să fie de forma first.last@e-uvt.ro sau first.last12@e-uvt.ro.");
        return;
    }

    if (!passwordRegex.test(password)) {
        alert("Parola trebuie să aibă cel puțin 7 caractere și să conțină litere mari, litere mici, cifre și un caracter special.");
        return;
    }

    alert("Login reușit!");

    window.location.href = "home.html";
});