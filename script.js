// script.js - controls main video playback and thumbnail selection

(function () {
  const mainVideo = document.getElementById('mainVideo');
  const playBtn = document.getElementById('playBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const stopBtn = document.getElementById('stopBtn');
  const thumbnails = Array.from(document.querySelectorAll('.btn-thumbnail'));

  if (!mainVideo) return;

  function loadAndPlay(src) {
    if (!src) return;
    // If same source, just play
    const current = mainVideo.querySelector('source')?.getAttribute('src');
    if (current === src) {
      mainVideo.play();
      return;
    }
    // Pause and replace source without reloading page
    mainVideo.pause();
    mainVideo.removeAttribute('poster');
    // Replace source
    const source = mainVideo.querySelector('source') || document.createElement('source');
    source.setAttribute('src', src);
    source.setAttribute('type', 'video/mp4');
    if (!mainVideo.querySelector('source')) mainVideo.appendChild(source);
    // Load and autoplay
    mainVideo.load();
    mainVideo.play().catch(() => {
      // Autoplay may be blocked; leave paused
      console.warn('Autoplay prevented by browser');
    });
  }

  // Wire thumbnail clicks
  thumbnails.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const src = btn.getAttribute('data-src');
      loadAndPlay(src);
      // update active styling
      thumbnails.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Play/Pause/Stop controls
  playBtn.addEventListener('click', () => {
    mainVideo.play();
  });
  pauseBtn.addEventListener('click', () => {
    mainVideo.pause();
  });
  stopBtn.addEventListener('click', () => {
    mainVideo.pause();
    try { mainVideo.currentTime = 0; } catch (e) { /* ignore */ }
  });

  // Keyboard shortcuts: space toggles play/pause, s stops
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      if (mainVideo.paused) mainVideo.play(); else mainVideo.pause();
    }
    if (e.key.toLowerCase() === 's') {
      mainVideo.pause();
      try { mainVideo.currentTime = 0; } catch (e) {}
    }
  });

})();
