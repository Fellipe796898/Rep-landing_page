// ===== CARREGAMENTO SEGURO =====
document.addEventListener("DOMContentLoaded", () => {

  /* ---------- CARROSSEL (fade automático) ---------- */
  const slides = document.querySelectorAll(".slides img");
  let indice = 0;
  function mostrarSlide(i){
    slides.forEach((s, idx) => s.classList.toggle("active", idx === i));
  }
  if(slides.length){
    mostrarSlide(0);
    setInterval(()=> {
      indice = (indice + 1) % slides.length;
      mostrarSlide(indice);
    }, 4500);
  }

  const chatToggle = document.getElementById("chatToggle");
  const chatbot = document.getElementById("chatbot");
  const fecharChat = document.getElementById("fecharChat");
  const chatRespostas = document.getElementById("chatRespostas");

  chatToggle.addEventListener("click", () => {
    const isHidden = chatbot.style.display === "none" || chatbot.style.display === "";
    chatbot.style.display = isHidden ? "flex" : "none";
    if(isHidden){
      chatRespostas.innerHTML = "";
      iniciarConversa();
    }
  });
  fecharChat.addEventListener("click", () => {
    chatbot.style.display = "none";
  });

  function escreverTexto(elemento, texto, delay = 18){
    let i = 0;
    elemento.textContent = "";
    const intervalo = setInterval(()=> {
      if(i < texto.length){
        elemento.textContent += texto.charAt(i);
        i++;
      } else clearInterval(intervalo);
    }, delay);
  }

  function iniciarConversa(){
    const msg1 = document.createElement("div");
    msg1.className = "chat-message bot";
    escreverTexto(msg1, "Olá! 👋 Sou o assistente virtual da Dorazio Odontologia.");
    chatRespostas.appendChild(msg1);

    setTimeout(()=> {
      const msg2 = document.createElement("div");
      msg2.className = "chat-message bot";
      escreverTexto(msg2, "Posso te ajudar com:");
      chatRespostas.appendChild(msg2);
    }, 650);

    setTimeout(()=> {
      criarOpcoesIniciais();
      chatRespostas.scrollTop = chatRespostas.scrollHeight;
    }, 1200);
  }

  function criarOpcoesIniciais(){
    if(document.querySelector(".chat-options")) return;
    const opcoes = document.createElement("div");
    opcoes.className = "chat-options";

    const btnServicos = document.createElement("button");
    btnServicos.textContent = "Saber mais sobre os serviços";
    btnServicos.addEventListener("click", () => responder("servicos"));

    const btnAtendente = document.createElement("button");
    btnAtendente.textContent = "Falar com atendente";
    btnAtendente.addEventListener("click", () => responder("atendente"));

    opcoes.appendChild(btnServicos);
    opcoes.appendChild(btnAtendente);
    chatRespostas.appendChild(opcoes);
  }

  function responder(opcao){
    const resposta = document.createElement("div");
    resposta.className = "chat-message bot";

    if(opcao === "servicos"){
      escreverTexto(resposta, "Oferecemos clareamento, implantes, aparelhos e muito mais! 😁 Deseja ver nossos horários e localização?");
      chatRespostas.appendChild(resposta);
      setTimeout(()=> mostrarSubOpcoes(), 1400);

    } else if(opcao === "horarios"){
      escreverTexto(resposta, "⏰ Nosso horário de atendimento é de segunda a sexta das 8h às 18h.");
      chatRespostas.appendChild(resposta);
      setTimeout(()=> mostrarBotaoAtendente(), 900);

    } else if(opcao === "localizacao"){
      escreverTexto(resposta, "📍 Estamos na Av. Principal, nº 123, centro da cidade. Facinho de encontrar!");
      chatRespostas.appendChild(resposta);
      setTimeout(()=> mostrarBotaoAtendente(), 900);

    } else if(opcao === "atendente"){
      escreverTexto(resposta, "Perfeito! 👩‍💻 Estou te redirecionando ao nosso atendimento via WhatsApp...");
      chatRespostas.appendChild(resposta);
      setTimeout(()=> redirecionarWhatsApp(), 1300);
    }

    chatRespostas.scrollTop = chatRespostas.scrollHeight;
  }

  function mostrarSubOpcoes(){
    const extra = document.createElement("div");
    extra.className = "chat-options";

    const btnHorarios = document.createElement("button");
    btnHorarios.textContent = "Ver horários";
    btnHorarios.addEventListener("click", () => responder("horarios"));

    const btnLocalizacao = document.createElement("button");
    btnLocalizacao.textContent = "Ver localização";
    btnLocalizacao.addEventListener("click", () => responder("localizacao"));

    const btnAgendar = document.createElement("button");
    btnAgendar.textContent = "Agendar avaliação gratuita";
    btnAgendar.addEventListener("click", () => redirecionarWhatsApp());

    extra.appendChild(btnHorarios);
    extra.appendChild(btnLocalizacao);
    extra.appendChild(btnAgendar);
    chatRespostas.appendChild(extra);
    chatRespostas.scrollTop = chatRespostas.scrollHeight;
  }

  function mostrarBotaoAtendente(){
    const wrapper = document.createElement("div");
    wrapper.className = "chat-options";
    const btnAtendente = document.createElement("button");
    btnAtendente.className = "chat-button-extra";
    btnAtendente.textContent = "Falar com atendente";
    btnAtendente.addEventListener("click", () => responder("atendente"));

    wrapper.appendChild(btnAtendente);
    chatRespostas.appendChild(wrapper);
    chatRespostas.scrollTop = chatRespostas.scrollHeight;
  }

  function redirecionarWhatsApp(){
    window.open("wa.link/8mfzgc", "_blank");
  }

  /* ---------- FORMULÁRIO: envio via Formspree ---------- */
  const contactForm = document.getElementById("contactForm");
  const callWhats = document.getElementById("callWhats");
  if(contactForm){
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch("https://formspree.io/f/yourFormID", {
          method: "POST",
          headers: { "Accept": "application/json" },
          body: formData
        });

        if(response.ok){
          alert(`Obrigado ${data.nome || "Cliente"}! Sua solicitação foi recebida.`);
          contactForm.reset();
        } else {
          alert("Ops! Houve um problema. Tente novamente.");
        }
      } catch(err){
        alert("Erro de envio. Verifique sua conexão.");
      }
    });
  }

  if(callWhats){
    callWhats.addEventListener("click", () => redirecionarWhatsApp());
  }

  // inicia conversa ao carregar a página
  iniciarConversa();

}); // DOMContentLoaded end
