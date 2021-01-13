
document.body.addEventListener('keypress', onKeyPress);
document.getElementById("playAllBtn").addEventListener("click", playAll);
const channel1 = [];
const channel2 = [];
const channel3 = [];

const recordStart = Date.now();

function onKeyPress(ev) {
    let sound;
    let soundName;
    switch (ev.code) {
        case 'KeyA':
            soundName = 'boom';
            sound = document.querySelector('#boom');
            channel1.push(sound);
            show('drum');
            break;
        case 'KeyS':
            soundName = 'clap';
            sound = document.querySelector('#clap');
            channel2.push(sound);
            show('plate');
            break;
        case 'KeyD':
            soundName = 'hihat';
            sound = document.querySelector('#hihat');
            channel3.push(sound);
            show('bigdrum');
            break;
        case 'KeyF':
            soundName = 'kick';
            sound = document.querySelector('#kick');
            channel1.push(sound);
            show('kicked');
            break;
    }
    if (sound) {
        sound.play();
    }
}


function playAll() {
    playSelectedChannel(channel1);
    playSelectedChannel(channel2);
    playSelectedChannel(channel3);
}

function playChannel(channelNumber) {
    if (channelNumber === 1) {
        playSelectedChannel(channel1);
    }
    if (channelNumber === 2) {
        playSelectedChannel(channel2);
    }
    if (channelNumber === 3) {
        playSelectedChannel(channel3);
    }
}

function playSelectedChannel(channel) {
    for (let index = 0; index < channel.length; index++) {
        const soundObject = channel[index];
        soundObject.play();
    }
}

function show(icon) {
    let element = document.getElementById(icon);
    element.style.display = 'block';

    setTimeout(function () {
        element.style.display = 'none';
    }, 300);
}

function recordChannel1(sound) {
    channel1.push(sound);
}

function recordChannel2(sound) {
    channel2.push(sound);
}

function recordChannel3(sound) {
    channel3.push(sound);
}