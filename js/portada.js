(function () {
  "use strict";

  var encabezado = document.querySelector(".encabezado--inicio");
  var numero = document.querySelector(".numero33");
  var capas = document.querySelectorAll(".numero33__capa");
  var estado = document.querySelector("#numero33-estado");
  var reduceMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var temporizador;

  if (!encabezado || !numero) {
    return;
  }

  function moverCapas(evento) {
    if (reduceMovimiento) {
      return;
    }

    var limites = encabezado.getBoundingClientRect();
    var x = (evento.clientX - limites.left) / limites.width - 0.5;
    var y = (evento.clientY - limites.top) / limites.height - 0.5;

    Array.prototype.forEach.call(capas, function (capa, indice) {
      var profundidad = (indice % 3) + 1;
      capa.style.transform = "translate(" + (x * profundidad * 7) + "px, " + (y * profundidad * 7) + "px)";
    });
  }

  function centrarCapas() {
    Array.prototype.forEach.call(capas, function (capa) {
      capa.style.transform = "translate(0, 0)";
    });
  }

  function celebrarEquipo() {
    numero.classList.remove("numero33--activo");
    void numero.offsetWidth;
    numero.classList.add("numero33--activo");
    estado.textContent = "Equipo de Front end 33 activado.";

    window.clearTimeout(temporizador);
    temporizador = window.setTimeout(function () {
      numero.classList.remove("numero33--activo");
    }, 1000);
  }

  encabezado.addEventListener("pointermove", moverCapas);
  encabezado.addEventListener("pointerleave", centrarCapas);
  numero.addEventListener("click", celebrarEquipo);
})();
