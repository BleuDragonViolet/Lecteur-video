// Sélectionner les éléments
const video = document.getElementById('video');
const playPauseBtn = document.getElementById('play-pause');
const progressBar = document.getElementById('progress-bar');
const volumeBtn = document.getElementById('volume-mute');
const volumeControl = document.getElementById('volume-control');
const fullscreenBtn = document.getElementById('fullscreen');
const loopBtn = document.getElementById('loop');
const videoUpload = document.getElementById('video-upload');
const videoContainer = document.querySelector('.video-container'); // Sélection du conteneur vidéo

// Lecture/Pause de la vidéo
playPauseBtn.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playPauseBtn.textContent = '⏸';  // Changer l'icône
    } else {
        video.pause();
        playPauseBtn.textContent = '▶';  // Revenir à l'icône de lecture
    }
});

// Mise à jour de la barre de progression
video.addEventListener('timeupdate', () => {
    const progress = (video.currentTime / video.duration) * 100;
    progressBar.value = progress;
});

// Rechercher dans la vidéo via la barre de progression
progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * video.duration;
    video.currentTime = seekTime;
});

// Gestion du son : mute/unmute
volumeBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    volumeBtn.textContent = video.muted ? '🔇' : '🔊';
});

// Ajustement du volume
volumeControl.addEventListener('input', () => {
    video.volume = volumeControl.value;
});

// Plein écran
fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        video.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

// Charger une vidéo locale et cacher l'ancienne vidéo
videoUpload.addEventListener('change', (e) => {
    if (video.src) {
        video.pause(); // Arrêter la vidéo actuelle
        video.currentTime = 0; // Réinitialiser le temps de la vidéo

        // Supprimer l'ancienne vidéo du conteneur
        videoContainer.style.display = 'none'; // Masquer l'ancienne vidéo
    }

    // Charger la nouvelle vidéo
    const file = e.target.files[0];
    const videoURL = URL.createObjectURL(file);
    video.src = videoURL;

    // Afficher à nouveau la vidéo
    videoContainer.style.display = 'block'; // Réafficher le conteneur vidéo
    video.play();
    playPauseBtn.textContent = '⏸';  // Mettre à jour l'icône une fois que la vidéo commence
});

// Activer/désactiver la boucle
loopBtn.addEventListener('click', () => {
    video.loop = !video.loop;
    loopBtn.style.color = video.loop ? '#4CAF50' : 'white';  // Changer la couleur pour indiquer l'état
});
