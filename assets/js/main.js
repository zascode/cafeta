(function () {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');

  if (navToggle && nav) {
    function setMenuOpen(isOpen) {
      nav.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
    }

    navToggle.addEventListener('click', function () {
      setMenuOpen(navToggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setMenuOpen(false);
    });

    document.addEventListener('click', function (event) {
      if (!nav.contains(event.target) && !navToggle.contains(event.target)) setMenuOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setMenuOpen(false);
    });
  }

  document.addEventListener('click', function (event) {
    const button = event.target.closest('.video-poster');
    if (!button) return;

    const embed = button.closest('[data-youtube-id]');
    if (!embed) return;

    const videoId = embed.getAttribute('data-youtube-id');
    const title = embed.getAttribute('data-video-title') || 'YouTube Video';
    if (!videoId) return;

    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(videoId) + '?autoplay=1&rel=0';
    iframe.title = title;
    iframe.loading = 'lazy';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;

    embed.replaceChildren(iframe);
  });

  // This script keeps the site JS-light by default.
  // The newsletter form uses a mailto fallback to avoid external providers.
  const form = document.querySelector('[data-newsletter-form]');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const emailInput = form.querySelector('input[type="email"]');
    const email = (emailInput && emailInput.value || '').trim();
    if (!email) {
      if (emailInput) emailInput.focus();
      return;
    }

    const subject = encodeURIComponent('Newsletter Anmeldung');
    const body = encodeURIComponent('Bitte tragt diese Adresse in den Newsletter ein: ' + email);
    window.location.href = 'mailto:info@cafeta.de?subject=' + subject + '&body=' + body;
  });
})();
