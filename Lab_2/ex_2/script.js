// Select elements
const video = document.getElementById('myVideo');
const audio = document.getElementById('myAudio');
const videoTimeDisplay = document.getElementById('videoTime');
const audioTimeDisplay = document.getElementById('audioTime');

// Function to format seconds into M:SS
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    if (secs < 10) secs = '0' + secs;
    return minutes + ':' + secs;
}

// Update Video Time
video.addEventListener('timeupdate', () => {
    videoTimeDisplay.innerText = formatTime(video.currentTime);
});

// Update Audio Time
audio.addEventListener('timeupdate', () => {
    audioTimeDisplay.innerText = formatTime(audio.currentTime);
});