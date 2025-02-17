// Générer un code secret de 4 chiffres uniques
function generateSecretNumber() {
    let digits = "0123456789".split("");
    let secret = "";
    while (secret.length < 4) {
        let rand = digits[Math.floor(Math.random() * digits.length)];
        if (!secret.includes(rand)) {
            secret += rand;
        }
    }
    return secret;
}

const secretNumber = generateSecretNumber();
let attempts = 0;

// Fonction pour démarrer le jeu
document.getElementById("startButton").addEventListener("click", function() {
    document.getElementById("howToPlay").classList.add("hidden");
    document.getElementById("gameSection").classList.remove("hidden");
});

// Fonction pour gérer le clavier virtuel
const guessInput = document.getElementById("guessInput");
const keys = document.querySelectorAll(".key");
const validateButton = document.getElementById("validateButton");

keys.forEach(key => {
    key.addEventListener("click", function() {
        let value = this.getAttribute("data-value");

        if (value === "⌫") {
            guessInput.value = guessInput.value.slice(0, -1);
        } else if (guessInput.value.length < 4 && value !== "Entrer") {
            guessInput.value += value;
        }
    });
});

// Autoriser l'utilisation du clavier physique
guessInput.addEventListener("keydown", function(event) {
    if (!/^\d$/.test(event.key) && event.key !== "Backspace" && event.key !== "Enter") {
        event.preventDefault(); // Bloque les touches non numériques sauf Backspace et Entrée
    }
});

// Événement sur le bouton "Entrer"
validateButton.addEventListener("click", checkGuess);

// Événement sur la touche "Entrée" du clavier physique
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});

// Fonction pour vérifier l'entrée
function checkGuess() {
    const guess = guessInput.value;
    const resultsDiv = document.getElementById("results");

    if (guess.length !== 4) {
        resultsDiv.innerHTML = "<p style='color: red;'>❌ Entre exactement 4 chiffres !</p>";
        return;
    }

    attempts++;

    let correctPlace = 0;
    let correctNumber = 0;

    for (let i = 0; i < 4; i++) {
        if (guess[i] === secretNumber[i]) {
            correctPlace++;
        } else if (secretNumber.includes(guess[i])) {
            correctNumber++;
        }
    }

    if (correctPlace === 4) {
        resultsDiv.innerHTML = `<p style='color: green;'>🎉 Bravo ! Code : <b>${secretNumber}</b> en ${attempts} essais.</p>`;
    } else {
        resultsDiv.innerHTML = `<p>✅ ${correctPlace} bien placé(s), 🔄 ${correctNumber} mal placé(s).</p>`;
    }

    guessInput.value = "";
}
