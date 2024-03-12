let cursor = document.querySelector('.cursor');
let holes = document.querySelectorAll('.hole');
let scoreEl = document.getElementById('score');
let pause = document.getElementById('pause');
let timerEl = document.getElementById('timer');
let levelEl = document.getElementById('level');
let PlayButton = document.getElementById('PlayButton');
let score = 0;
let timer;
let time = 0;
let misses = 0;
let level = 1;
const maxMisses = 5;
let levelPoints = [100, 200, 300]; // Points required to advance to the next level

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.classList.add('active');
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
});

function updateTimer() {
    time++;
    timerEl.textContent = `Time: ${time} seconds`;
}

function increaseLevel() {
    level++;
    levelEl.textContent = `Level: ${level}`;
}

function run() {
    let i = Math.floor(Math.random() * holes.length);
    let hole = holes[i];
    let img = document.createElement('img');
    img.src = 'mole.png';
    hole.appendChild(img);

    img.addEventListener('click', () => {
        img.src = 'whacked.png';
        score += 10;
        scoreEl.innerText = score;

        if (score >= levelPoints[level - 1]) {
            increaseLevel();
            // Increase difficulty or perform other level-up actions here
        }

        setTimeout(() => {
            hole.removeChild(img);
            run();
        }, 100);
    });

    timer = setTimeout(() => {
        hole.removeChild(img);
        if (++misses >= maxMisses) {
            endGame();
        } else {
            run();
        }
    }, 1500 - level * 100); // Adjust mole appearance speed based on the level
}

function restartGame() {
    var element = document.getElementById("timer");
    element.classList.remove("hideTime")
    clearTimeout(timer);
    clearInterval(timerInterval); // Clear the interval
    score = 0;
    time = 0;
    misses = 0;
    level = 1;
    LevelEl.textContent = `Level: ${level}`;
    scoreEl.innerText = score;
    timerEl.textContent = 'Time: 0 seconds';
    holes.forEach((hole) => {
        hole.innerHTML = '';
    });
    PlayButton.addEventListener('click', startGame); // Reattach the event listener
}

function endGame() {
    alert(`Game Over! You missed too many moles. Your final score: ${score}`);
    restartGame();
}

function startGame() {
    var element = document.getElementById("timer");
    element.classList.remove("hideTime")
    // Reset timer and start ticking
    time = 0;
    updateTimer(); // Update immediately to show 0 seconds
    timerInterval = setInterval(updateTimer, 1000);

    // Other game initialization code (e.g., run() function) goes here
    run();
}

// Initial setup
PlayButton.addEventListener('click', startGame);
pause.addEventListener('click', restartGame);
LevelEl.textContent = `Level: ${level}`;
setInterval(updateTimer, 1000);
