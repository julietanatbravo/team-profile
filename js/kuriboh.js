(function () {
  "use strict";

  var carta = document.querySelector(".kuriboh__carta");
  if (!carta) {
    return;
  }

  var imagen = carta.querySelector(".kuriboh__imagen");
  var estado = document.querySelector(".kuriboh__estado");
  var cartas = [
    "Kuriboh",
    "Dark Magician",
    "Dark Magician Girl",
    "Summoned Skull",
    "Celtic Guardian",
    "Gaia The Fierce Knight",
    "Buster Blader"
  ];
  var cache = {};
  var cartaActual = "";
  var cargando = false;

  function elegirCarta() {
    var disponibles = cartas.filter(function (nombre) {
      return nombre !== cartaActual;
    });
    return disponibles[Math.floor(Math.random() * disponibles.length)];
  }

  function esperar(milisegundos) {
    return new Promise(function (resolver) {
      setTimeout(resolver, milisegundos);
    });
  }

  function cargarCarta(nombre) {
    if (cache[nombre]) {
      return Promise.resolve(cache[nombre]);
    }

    estado.textContent = "Buscando la carta…";
    return fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?name=" + encodeURIComponent(nombre))
      .then(function (respuesta) {
        if (!respuesta.ok) {
          throw new Error("No se pudo consultar la carta");
        }
        return respuesta.json();
      })
      .then(function (datos) {
        var url = datos.data[0].card_images[0].image_url_small;
        cache[nombre] = url;
        return url;
      });
  }

  carta.addEventListener("click", function () {
    if (cargando) {
      return;
    }
    cargando = true;

    var nombre = elegirCarta();
    var estabaInvocada = carta.classList.contains("kuriboh__carta--invocada");
    if (estabaInvocada) {
      carta.classList.remove("kuriboh__carta--invocada");
      carta.setAttribute("aria-expanded", "false");
      estado.textContent = "Barajando el mazo…";
    }

    Promise.all([
      cargarCarta(nombre),
      esperar(estabaInvocada ? 700 : 150)
    ])
      .then(function (resultados) {
        imagen.src = resultados[0];
        imagen.alt = "Carta " + nombre;
        cartaActual = nombre;
        carta.classList.add("kuriboh__carta--invocada");
        carta.setAttribute("aria-expanded", "true");
        estado.textContent = "¡" + nombre + " fue invocado!";
      })
      .catch(function () {
        estado.textContent = "La carta no pudo invocarse. Probá otra vez.";
      })
      .then(function () {
        cargando = false;
      });
  });
})();
