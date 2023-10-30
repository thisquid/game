let gamesong = document.getElementById("gamesong");
let playpausebtn = document.getElementById("playpausebtn");
let count = 0;

function playpause() {
    if (count == 0) {
        count = 1;
        gamesong.pause();
    }
    else {
        count = 0;
        gamesong.play();
    }
}

const holesdiv = document.querySelector(".holes")
const score = document.querySelector(".score");
const time = document.querySelector(".time");
const startbutton = document.querySelector(".modal button");
const modal = document.querySelector(".modal");
const highscore = document.querySelector(".highscore");
const gameover = document.querySelector(".display h2");
const potk = document.querySelector(".potk");

let timeleft;
let startscore = 0;
let endscore = 0;
let tagh = new Audio("./sounds/tagh.mp3");
let hoosht = new Audio("./sounds/hoosht.mp3");

for (let i = 1; i <= 16; i++) {
    let hole = document.createElement("div");
    hole.classList.add("hole");
    holesdiv.appendChild(hole);
    let pile = document.createElement("img");
    pile.classList.add("pile");
    pile.src = "./img/khak.png";
    hole.appendChild(pile);
    let face = document.createElement("img");
    face.classList.add("koor");
    face.src = "./img/koor.png";
    face.setAttribute("name", "koor");
    hole.appendChild(face);
}

window.addEventListener("mousemove", (g) => {
    potk.style.left = g.pageX - 30 + "px";
    potk.style.top = g.pageY - 60 + "px";
});

window.addEventListener("click", (g) => {
    potk.style.transform = "rotateZ(-50deg) rotateY(-180deg)";
    hoosht.play();
    hoosht.currentTime = 0;
    setTimeout(() => {
        potk.style.transform = "rotateZ(0deg) rotateY(-180deg)";
    }, 70);

    if (g.target.name === "koor") {
        setTimeout(() => {
            document.body.classList.toggle("flash");
        }, 100);
        document.body.classList.toggle("flash");
        hoosht.play();
        hoosht.currentTime = 1;
        tagh.play();
        tagh.currentTime = 0;
        startscore = startscore + 10;
        score.textContent = startscore;
    }
});

startbutton.addEventListener("click", () => {
    modal.classList.add("modalclose");
    timeleft = 60;
    startscore = 0;
    gamesong.play();
    score.textContent = startscore;
    time.textContent = timeleft;

    let timer = setInterval(() => {
        time.textContent = timeleft;
        if (timeleft === 0) {
            gameover.style.visibility = "visible";
            modal.classList.remove("modalclose");
            if (startscore > endscore) {
                endscore = startscore;
                highscore.textContent = endscore;
            }
            else {
                highscore.textContent = endscore;
            }

            clearInterval(timer);
        }
        else {
            timeleft--;
            time.textContent = timeleft < 10 ? "0" + timeleft : timeleft;
            const face = document.querySelectorAll(".koor");
            let chooseface = Math.floor(Math.random() * face.length);
            face[chooseface].style.pointerEvents = "all";
            face[chooseface].style.animation = "faceup 2.6s ease";
            face[chooseface].addEventListener("animationend", () => {
                face[chooseface].style.animation = "facedown 0.5s ease";
                face[chooseface].addEventListener("animationend", () => {
                    face[chooseface].style.pointerEvents = "none";
                });
            });
        }

    }, 1000);
});