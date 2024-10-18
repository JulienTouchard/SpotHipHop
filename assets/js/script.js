import { initList } from "./initList.js";
import { playlist } from "./playlist.js";

// ------------------ declaration de variables --------
/* var tableauImages = [//crochet altGR+5
    "./assets/img/beastie.jpg",//0// une , dans un tableau separe les données
    "./assets/img/jazz-messengers.jpg",//1
    "./assets/img/justice.jpg"//2// pas de virgule sur la derniere valeur
];
var tableauTitres = [
    "Sabotage",
    "Moanin",
    "DANCE"
] */
var spothiphop = document.getElementById("spothiphop");
var cover = document.getElementById("cover");
var back = document.getElementById("back");
var playBtn = document.getElementById("play");
var forw = document.getElementById("forw");
var rdm = document.getElementById("rdm");
var titre = document.getElementById("titre");
var artiste = document.getElementById("artiste");
var album = document.getElementById("album");
var annee = document.getElementById("annee");
var coverMove = document.getElementById("coverMove");
var innerTimeline = document.getElementById("innerTimeline");

var slider = document.getElementById("slider");
var timeline = document.getElementById("timeline");
var mc = new Hammer(slider);
var mcTime = new Hammer(timeline);
var random = false;
globalThis.currentTrack = 0;
var isPlay = false;//ceci est une boolean
var audio = new Audio(playlist[currentTrack].audio);
//audio.currentTime = 12;
console.dir(audio);
//audio.play() audio.pause()
//-------------------------FONCTIONS ---------------
globalThis.nextTrack = (fromList = true) => {
    audio.pause();
    coverMove.style.transition = "all .4s";
    coverMove.style.transform = "rotateY(90deg)";

    if (fromList) {
        //boolean random
        if (random) {
            //aller chercher un currentTrack entre 0 et playlist.length - 1
            currentTrack = Math.floor(Math.random()*playlist.length);
        } else {
            if (currentTrack < playlist.length - 1) {
                currentTrack = currentTrack + 1;
            } else {
                currentTrack = 0;
            }
        }

    }

    cover.src = playlist[currentTrack].cover;
    titre.innerText = playlist[currentTrack].titre;
    artiste.innerText = playlist[currentTrack].artiste;
    album.innerText = playlist[currentTrack].album;
    annee.innerText = playlist[currentTrack].annee;
    setTimeout(() => {
        coverMove.style.transition = "none";
        coverMove.src = playlist[currentTrack].cover;
        coverMove.style.transform = "none";
    }, 400);
    //partie audio
    audio = new Audio(playlist[currentTrack].audio);
    audio.play();
    isPlay = true;
    //bouton play
    playBtn.classList.replace("fa-solid", "fa-regular");
    playBtn.classList.replace("fa-circle-play", "fa-circle-pause");
}
function previousTrack() {
    audio.pause()
    coverMove.style.transition = "all .4s";
    coverMove.style.transform = "translateX(-100%)";
    if (random) {
        //aller chercher un currentTrack entre 0 et playlist.length - 1
        currentTrack = Math.floor(Math.random()*playlist.length);
    } else {
        if (currentTrack > 0) {
            currentTrack = currentTrack - 1;
            //cover.src = playlist[currentTrack].cover;
        } else {
            currentTrack = playlist.length - 1;
            //cover.src = playlist[currentTrack].cover;
        }
    }

    cover.src = playlist[currentTrack].cover;

    titre.innerText = playlist[currentTrack].titre;
    artiste.innerText = playlist[currentTrack].artiste;
    album.innerText = playlist[currentTrack].album;
    annee.innerText = playlist[currentTrack].annee;
    setTimeout(() => {
        coverMove.style.transition = "none";
        coverMove.src = playlist[currentTrack].cover;
        coverMove.style.transform = "none";
    }, 400);
    //partie audio
    audio = new Audio(playlist[currentTrack].audio);
    audio.play();
    isPlay = true;
    //bouton play
    playBtn.classList.replace("fa-solid", "fa-regular");
    playBtn.classList.replace("fa-circle-play", "fa-circle-pause");
}
//-------------------------LOGIQUE ------------------


mcTime.on("pan", (event) => {
    /* if(event.isFinal){ */
    setTimeout(() => {
        //let currentAudio = audio.currentTime*audio.duration/spothiphop.clientWidth;
        //console.log(currentAudio);
        let currentPan = event.deltaX//+currentAudio;// comment ajouter le currentTime
        if (audio.currentTime < audio.duration) {
            audio.currentTime = currentPan * audio.duration / timeline.clientWidth;
        }
    }, 10)
    /* } */
})
mc.on("swiperight", () => {
    nextTrack();
})
forw.addEventListener("click", () => {
    nextTrack();
})
mc.on("swipeleft", () => {
    previousTrack();
})

back.addEventListener("click", () => {
    previousTrack();
})
playBtn.addEventListener("click", () => {
    //if(isPlay === false)
    if (!isPlay) { // !isplay => isplay === false
        audio.play();
        //fa-solid fa-circle-play
        //fa-regular fa-circle-pause
        playBtn.classList.replace("fa-solid", "fa-regular");
        playBtn.classList.replace("fa-circle-play", "fa-circle-pause");
        //isPlay = true;
    } else {
        audio.pause();
        //isPlay = false;
        playBtn.classList.replace("fa-regular", "fa-solid");
        playBtn.classList.replace("fa-circle-pause", "fa-circle-play");
    }
    isPlay = !isPlay
})
rdm.addEventListener("click", () => {
    random = !random;
    if (random) {
        rdm.style.color = "red";
    } else {
        rdm.style.color = "rgb(8, 8, 143)";
    }
})
setInterval(() => {
    if (isPlay) {
        if (audio.currentTime >= audio.duration) {
            nextTrack();
        }
        var widthBar = (100 * audio.currentTime) / audio.duration;
        innerTimeline.style.width = widthBar + "%";
    }
}, 100);
//initialisation 
initList();