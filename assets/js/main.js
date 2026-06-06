(function () {
  const videoEmbeds = document.querySelectorAll('[data-youtube-id]');

  videoEmbeds.forEach(function (embed) {
    const button = embed.querySelector('.video-poster');
    if (!button) return;

    button.addEventListener('click', function () {
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
      iframe.focus();
    });
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
