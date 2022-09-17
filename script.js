const body = document.querySelector('body');
const video = document.querySelector('video');
const timer = document.querySelector('#timer');
const duration = document.querySelector('#duration');
const progress = document.querySelector('#progress-bar');
const playBtn = document.querySelector('#play-btn');
const volumeBtn = document.querySelector('#volume-btn');
const fullscreenBtn = document.querySelector('#fullscreen-btn');

let isPlaying = false;
let isFullscreen = false;

window.addEventListener('load', () => {
    setHeight();
    loadVideo();
})

function setHeight() {
    const doc = document.documentElement;
    doc.style.setProperty('--height', `${window.innerHeight}px`);
}

function loadVideo() {
    video.currentTime = 0;
    progress.value = 0;
    timer.innerHTML = '00:00';
    duration.innerHTML = '03:35';
    video.addEventListener('loadeddata', () => {
        progress.max = video.duration;
    })
}

function formatTime(time) {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    let minutes = min < 10 ? `0${min}` : `${min}`;
    let seconds = sec < 10 ? `0${sec}` : `${sec}`;
    return `${minutes}:${seconds}`;
}

setInterval(() => {
    timer.innerHTML = formatTime(video.currentTime)
}, false)

function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;
}

function setProgress() {
    video.currentTime = (+progress.value * video.duration) / 100;
}

function playVideo() {
    video.play();
    body.classList.add('playing');
    playBtn.querySelector('i').innerText = 'pause';
    isPlaying = true;
}

function pauseVideo() {
    video.pause();
    body.classList.remove('playing');
    playBtn.querySelector('i').innerText = 'play_arrow';
    isPlaying = false;
}

function togglePlayback() {
    isPlaying ? pauseVideo() : playVideo();
}

function toggleVolume() {    
    video.muted = !video.muted;
    let i = volumeBtn.querySelector('i');
    video.muted ? i.innerText = 'volume_off' : i.innerText = 'volume_up';
}

function toggleFullscreen() {
    if (!isFullscreen) {
        if (video.requestFullScreen) {
            video.requestFullScreen();
        } else if (video.webkitRequestFullScreen) {
            video.webkitRequestFullScreen();
        } else if (video.msRequestFullScreen) {
            video.msRequestFullScreen();
        }
    } else {
        if (document.exitFullScreen) {
            document.exitFullScreen();
        } else if (document.webkitExitFullScreen) {
            document.webkitExitFullScreen();
        } else if (document.msExitFullScreen) {
            document.msExitFullScreen();
        }
    }
}

playBtn.addEventListener('click', togglePlayback);
volumeBtn.addEventListener('click', toggleVolume);
fullscreenBtn.addEventListener('click', toggleFullscreen);
video.addEventListener('click', togglePlayback);
progress.addEventListener('change', setProgress);
video.addEventListener('timeupdate', updateProgress);