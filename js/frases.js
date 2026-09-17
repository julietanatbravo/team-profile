(function () {
  "use strict";

  var bloque = document.querySelector(".frases");
  if (!bloque) {
    return;
  }

  var boton = bloque.querySelector(".frases__boton");
  var texto = bloque.querySelector(".frases__texto");
  var frases = [
    "El que persevera, alcanza.",
    "Nunca es tarde para aprender.",
    "Cada día es una nueva oportunidad."
  ];
  var ultima = -1;

  boton.addEventListener("click", function () {
    var disponibles = frases.map(function (_, indice) {
      return indice;
    }).filter(function (indice) {
      return indice !== ultima;
    });
    var indice = disponibles[Math.floor(Math.random() * disponibles.length)];

    texto.classList.remove("frases__texto--visible");
    void texto.offsetWidth;
    texto.textContent = frases[indice];
    texto.classList.add("frases__texto--visible");
    ultima = indice;
  });
})();
