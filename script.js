
// ===============================
// SCROLL REVEAL
// ===============================

const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;

    if (top < window.innerHeight - 100) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);

revealOnScroll();


// ===============================
// THEME TOGGLE
// ===============================

const toggle = document.getElementById('themeToggle');
const body = document.body;

toggle.addEventListener('click', () => {

  if (body.classList.contains('night')) {

    body.classList.remove('night');
    body.classList.add('morning');

    toggle.textContent = '🌙';

  } else {

    body.classList.remove('morning');
    body.classList.add('night');

    toggle.textContent = '☀️';

  }

});


// ===============================
// CONTACT FORM – FORMSPREE
// ===============================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {

  contactForm.addEventListener('submit', async function(event) {

    // Impede a página de abrir a página do Formspree
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');

    // Guarda o texto original do botão
    const originalButtonText = submitButton.textContent;

    // Muda o botão enquanto envia
    submitButton.textContent = 'Wird gesendet...';
    submitButton.disabled = true;

    try {

      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {

        // Limpa os campos
        contactForm.reset();

        // Cria mensagem de sucesso
        const successMessage = document.createElement('div');

        successMessage.className = 'form-success';

        successMessage.innerHTML = `
          <strong>Vielen Dank für deine Anfrage!</strong>
          <br>
          Deine Nachricht wurde erfolgreich gesendet.
          <br>
          Ich melde mich so bald wie möglich bei dir.
        `;

        // Coloca a mensagem depois do formulário
        contactForm.insertAdjacentElement('afterend', successMessage);

        // Muda o botão
        submitButton.textContent = '✓ Anfrage gesendet';

        // Depois de 5 segundos, restaura o botão
        setTimeout(() => {
          submitButton.textContent = originalButtonText;
          submitButton.disabled = false;
        }, 5000);

      } else {

        throw new Error('Form submission failed');

      }

    } catch (error) {

      // Mensagem de erro
      const errorMessage = document.createElement('div');

      errorMessage.className = 'form-error';

      errorMessage.textContent =
        'Leider ist ein Fehler aufgetreten. Bitte versuche es später erneut.';

      contactForm.insertAdjacentElement('afterend', errorMessage);

      // Restaura o botão
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;

    }

  });

}

