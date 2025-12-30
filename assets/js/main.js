(function () {
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
