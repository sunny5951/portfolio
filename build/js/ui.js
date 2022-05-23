
document.querySelectorAll(".nav ul li a").forEach(li => {
    li.addEventListener("click", e => {
        e.preventDefault();
        document.querySelector(li.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        })
    })
})

$('.ham').click(function () {
    $('#mNav').toggleClass('active')
});
$('.mNav_cont ul li').click(function () {
    $('#mNav').removeClass('active')
});

//section1 (title)

$(".split").each(function () {
    let text = $(this).text();
    let split = text.split('').join("</span><span aria-hidden='true'>");
    split = "<span aria-hidden='true'>" + split + "</span>";

    $(this).html(split).attr("aria-label", text);
});

setTimeout(function () {
    gsap.to(".split span", {
        duration: 0.3,
        opacity: 1,
        y: 0,
        stagger: 0.1
    })
}, 4000)

//section2 (about)
function about() {
    let scrollTop = (document.documentElement.scrollTop || window.pageYOffset || window.scrollX) + window.innerHeight / 2;

    const sect2 = document.getElementById('section2');
    const sec2 = document.querySelector('.sec2');

    if (scrollTop > sect2.offsetTop) {
        sec2.classList.add("show");
    }
}
window.addEventListener('scroll', about);

//section2 (skill count)
function count() {
    let scrollTop = document.documentElement.scrollTop || window.pageYOffset || window.scrollY;

    const sec2 = document.getElementById('section2');
    const skill = document.querySelector('.skill');
    const skillTop = sec2.offsetTop + skill.offsetTop - 150;
    const skillHeight = sec2.offsetTop + skill.offsetTop + skill.offsetHeight;

    if (scrollTop >= skillTop && scrollTop <= skillHeight) {
        const counters = document.querySelectorAll('.counter')

        counters.forEach(counter => {
            counter.innerText = '0'

            const updateCounter = () => {
                const target = +counter.getAttribute('data-target')
                const c = +counter.innerText

                const increment = target / 300

                if (c < target) {
                    counter.innerText = `${Math.ceil(c + increment)}`
                    setTimeout(updateCounter, 50)
                } else {
                    counter.innerText = target;
                }
            }
            updateCounter()
            // 
        })
        window.removeEventListener('scroll', count);
    }
}
window.addEventListener('scroll', count);

//section2 (keyword)
function reveal() {
    let scrollTop = (document.documentElement.scrollTop || window.pageYOffset || window.scrollY) + window.innerHeight / 2;

    const sec2 = document.getElementById('section2');
    const keyWord = document.querySelector('.keyword');
    const keyDesc = document.querySelector('.key_desc');
    const reveal = document.querySelectorAll('.reveal');

    reveal.forEach(el => {
        const revealDelay = el.dataset.delay;
        if (scrollTop >= (sec2.offsetTop + keyWord.offsetTop)) {
            if (revealDelay == undefined) {
                el.classList.add("show")
                keyDesc.classList.add("show")
            } else {
                setTimeout(() => {
                    el.classList.add("show");
                }, revealDelay);
            }
        }
    })
}
window.addEventListener('scroll', reveal);

// section4

$(window).scroll(function () {
    let scrollTop = $(window).scrollTop();
    let offset = scrollTop - $("#section4").offset().top

    if (scrollTop > $("#section4").offset().top) {
        $("#section4 .sec4 .javascriptCont").css("left", -offset)
    }
});

// section4 (header + snslist)
function changeColor() {
    let scrollTop = window.pageXOffset || document.documentElement.scrollTop || window.scrollY;
    const sec4 = document.getElementById('section4');
    const sec5 = document.getElementById('section5');

    const header = document.getElementById('header');
    const sns = document.getElementById('sns');

    const changeHeight = sec4.offsetTop + sec4.offsetHeight + sec5.offsetHeight;

    if (scrollTop >= sec4.offsetTop && scrollTop <= changeHeight) {
        header.classList.add("active");
        sns.classList.add("active");
    } else {
        header.classList.remove("active");
        sns.classList.remove("active");
    }
}
window.addEventListener("scroll", changeColor);

// section4 (num) 

function getSectionPoint() {
    const section = document.querySelector('#section3')
    const sections = document.querySelectorAll('.project');
    const thisPoint = document.documentElement.scrollTop;

    for (let i = 0; i < sections.length; i++) {
        let number = 250; //margin-bottom

        if (thisPoint >= (section.offsetTop + sections[0].offsetTop) && thisPoint <= (section.offsetTop + section.clientHeight)) {

            let point = sections[0].offsetTop + Math.abs(sections[0].getBoundingClientRect().top);
            const num = document.querySelectorAll('.num');

            // console.log(sections[0].getBoundingClientRect().top);
            // console.log("sections.offsetTop : " + sections[0].offsetTop);

            if ((sections[i].offsetTop - number) <= point) {
                if (Number(num[i].textContent) > 1) {
                    sections[i - 1].classList.remove('active');
                    sections[i].classList.add('active');
                } else {
                    sections[i].classList.add('active');
                }
            } else {
                sections[i].classList.remove('active');
            }
        }
    }
}
window.addEventListener('scroll', getSectionPoint);


// section4 (1)

function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (!audio) return; //stop the function from running all together
    audio.currentTime = 0; //rewind to the start
    audio.play();
    key.classList.add('playing');
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return; //skip it if it's not a transform
    this.classList.remove('playing');
}
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);

// section4 (2)

const musicContainer = document.getElementById('music_container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress_container');
const title = document.getElementById('mTitle');
const cover = document.getElementById('cover');


//song titles
const songs = ['Yerin_Baek', 'Davichi', 'IU'];

//keep track of song
let songIndex = 2;

//lode song details into Dom
loadSong(songs[songIndex]);

//Update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `assets/sounds/${song}.mp3`;
    cover.src = `assets/img/${song}.jpeg`;
}

//play song
function playSong() {
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fa").classList.remove("fa-play");
    playBtn.querySelector("i.fa").classList.add("fa-pause");

    audio.play();
}

//pause song
function pauseSong() {
    musicContainer.classList.remove("play");
    playBtn.querySelector("i.fa").classList.add("fa-play");
    playBtn.querySelector("i.fa").classList.remove("fa-pause");

    audio.pause();
}

//previous song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);

    playSong();
}

//previous song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex]);

    playSong();
}

//update progress bar
function updateProgress(e) {
    const {
        duration,
        currentTime
    } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

//set Progress Bar
function setProgress(e) {
    const width = this.clienWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

//Event Listener
playBtn.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

//Change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

//time&song update
audio.addEventListener('timeupdate', updateProgress);

//click on progress bar
progressContainer.addEventListener("click", setProgress);

//song Ends
audio.addEventListener("ended", nextSong);

// section4 (3)

const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipcard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    //second click
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
    //do cards match?
}

function disableCards() {
    firstCard.removeEventListener('click', flipcard);
    secondCard.removeEventListener('click', flipcard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipcard));

// section4 (4)



// section4 (5)

let outputScreen = document.getElementById('output-screen');

function display(num) {
    outputScreen.value += num;
}

function Calculate() {
    try {
        outputScreen.value = eval(outputScreen.value);
    } catch (err) {
        alert("Invalid")
    }
}

function Clear() {
    outputScreen.value = "";
}

function del() {
    outputScreen.value = outputScreen.value.clice(0, -1);
}