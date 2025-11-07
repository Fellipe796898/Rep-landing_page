// ===== EMAIL.JS - Envio de Formulário =====

// Inicializa o EmailJS com sua Public Key
(function() {
  emailjs.init("iKrKXDzsSiqEp9oye");
})();

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Coleta os valores do formulário
    const nome = form.querySelector('input[name="nome"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const mensagem = form.querySelector('textarea[name="mensagem"]').value.trim();

    if (!nome || !email || !mensagem) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Envia o e-mail via EmailJS
    emailjs.send("service_xs78jje", "template_y2j9n0f", {
      from_name: nome,
      from_email: email,
      message: mensagem,
    })
    .then(() => {
      alert("✅ Mensagem enviada com sucesso! Em breve entraremos em contato.");
      form.reset();
    })
    .catch((error) => {
      console.error("Erro ao enviar:", error);
      alert("❌ Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.");
    });
  });
});
