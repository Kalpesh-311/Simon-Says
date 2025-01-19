let gameSeq = [];
let userSeq = [];

let btns = ["green", "red", "yellow", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game Started");
        started = true;
        userSeq = [];
        level = 0;
        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 300); // Reduced time for better visual feedback
}

function levelUp() {
    level++;
    h2.innerText = "Level " + level;

    let randIdx = Math.floor(Math.random() * 4); // Include all 4 buttons
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);

    console.log("Game Sequence: ", gameSeq);

    // Flash the buttons in sequence
    gameSeq.forEach((color, index) => {
        setTimeout(() => {
            let btn = document.querySelector(`.${color}`);
            btnFlash(btn);
        }, 500 * index); // Delay based on sequence
    });

    userSeq = []; // Reset user sequence for the new level
}

// Add click handlers for buttons
btns.forEach((color) => {
    let btn = document.querySelector(`.${color}`);
    btn.addEventListener("click", function () {
        userSeq.push(color);
        btnFlash(btn);
        checkAnswer(userSeq.length - 1);
    });
});

function checkAnswer(currentIdx) {
    if (userSeq[currentIdx] === gameSeq[currentIdx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000); // Proceed to next level
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    h2.innerText = "Game Over, Press Any Key to Restart";
    console.log("Game Over");
    started = false;
    gameSeq = [];
}
