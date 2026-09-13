/* =========================================================
   Pokébola de cada perfil — consulta a la PokéAPI
   https://pokeapi.co/  (no necesita clave ni registro)

   Siempre se muestra un solo pokémon por vez.

   Cómo se configura desde el HTML:
     data-pokemon="bulbasaur,chikorita"  -> elige uno al azar entre esos
     data-pokemon="aleatorio"            -> elige uno al azar entre todos
   ========================================================= */

(function () {
  "use strict";

  var API = "https://pokeapi.co/api/v2/pokemon/";
  var CANTIDAD_POKEMON = 1025; // hasta la novena generación

  /* La pokébola tiembla como mínimo este rato, aunque la respuesta ya esté
     en la caché del navegador. Sin esto, los pokémon repetidos aparecen de
     golpe y los nuevos tardan: se ve distinto en cada perfil. */
  var TIEMPO_MINIMO = 700;

  /* "bulbasaur" -> "Bulbasaur"; "enamorus-incarnate" -> "Enamorus Incarnate" */
  function capitalizar(texto) {
    return texto
      .split("-")
      .map(function (parte) {
        return parte.charAt(0).toUpperCase() + parte.slice(1);
      })
      .join(" ");
  }

  function idAleatorio() {
    return Math.floor(Math.random() * CANTIDAD_POKEMON) + 1;
  }

  /* Devuelve un elemento al azar de una lista */
  function unoAlAzar(lista) {
    return lista[Math.floor(Math.random() * lista.length)];
  }

  function esperar(milisegundos) {
    return new Promise(function (resolver) {
      setTimeout(resolver, milisegundos);
    });
  }

  /* La API trae varias imágenes; usamos la mejor que haya disponible */
  function imagenDe(datos) {
    var sprites = datos.sprites || {};
    var otros = sprites.other || {};
    var arte = otros["official-artwork"] || {};
    return arte.front_default || sprites.front_default || "";
  }

  /* Descarga la imagen antes de mostrarla, así la tarjeta nunca queda vacía */
  function precargarImagen(url) {
    return new Promise(function (resolver) {
      if (!url) {
        resolver("");
        return;
      }
      var imagen = new Image();
      imagen.onload = function () {
        resolver(url);
      };
      imagen.onerror = function () {
        resolver("");
      };
      imagen.src = url;
    });
  }

  function traerPokemon(idONombre) {
    return fetch(API + idONombre).then(function (respuesta) {
      if (!respuesta.ok) {
        throw new Error("No se encontró el pokémon: " + idONombre);
      }
      return respuesta.json();
    });
  }

  function activarBloque(bloque) {
    var boton = bloque.querySelector(".pokebola");
    var estado = bloque.querySelector(".pokemon__estado");
    var lista = bloque.querySelector(".pokemon__lista");
    if (!boton || !estado || !lista) {
      return;
    }

    var configuracion = (bloque.getAttribute("data-pokemon") || "aleatorio").trim();
    var esAleatorio = configuracion.toLowerCase() === "aleatorio";
    var favoritos = configuracion.split(",").map(function (nombre) {
      return nombre.trim().toLowerCase();
    });
    var cargando = false;

    /* Guardamos el último que salió para no repetirlo en el clic siguiente */
    var ultimo = null;

    function elegirPedido() {
      if (esAleatorio) {
        if (ultimo === null) {
          return idAleatorio();
        }
        /* Sorteamos entre los 1024 restantes y salteamos el último: así
           nunca se repite y todos siguen teniendo la misma probabilidad. */
        var id = Math.floor(Math.random() * (CANTIDAD_POKEMON - 1)) + 1;
        return id >= ultimo ? id + 1 : id;
      }

      var candidatos = favoritos.filter(function (nombre) {
        return nombre !== ultimo;
      });
      /* Si el perfil tiene un solo favorito, no queda otra que repetirlo */
      return unoAlAzar(candidatos.length ? candidatos : favoritos);
    }

    /* La tarjeta se crea una sola vez y después se actualiza. Si la
       borráramos y la volviéramos a crear, la página pegaría un salto. */
    var tarjeta = null;
    var imagenTarjeta = null;
    var nombreTarjeta = null;

    function crearTarjeta() {
      tarjeta = document.createElement("li");
      tarjeta.className = "pokemon__tarjeta";

      imagenTarjeta = document.createElement("img");
      imagenTarjeta.className = "pokemon__imagen";
      imagenTarjeta.width = 130;
      imagenTarjeta.height = 130;

      nombreTarjeta = document.createElement("span");
      nombreTarjeta.className = "pokemon__nombre";

      tarjeta.appendChild(imagenTarjeta);
      tarjeta.appendChild(nombreTarjeta);
      lista.appendChild(tarjeta);
    }

    function mostrar(datos, url) {
      if (!tarjeta) {
        crearTarjeta();
      }
      imagenTarjeta.src = url || imagenDe(datos);
      imagenTarjeta.alt = capitalizar(datos.name);
      nombreTarjeta.textContent = capitalizar(datos.name);

      /* Reinicia la animación de aparición para que se vea en cada clic */
      tarjeta.classList.remove("pokemon__tarjeta--aparece");
      void tarjeta.offsetWidth;
      tarjeta.classList.add("pokemon__tarjeta--aparece");
    }

    boton.addEventListener("click", function () {
      if (cargando) {
        return;
      }
      cargando = true;

      boton.classList.add("pokebola--cargando");
      estado.textContent = "Abriendo la pokébola…";

      /* Siempre uno solo, distinto del anterior: al azar entre todos,
         o al azar entre los favoritos del perfil */
      var pedido = elegirPedido();

      var busqueda = traerPokemon(pedido).then(function (datos) {
        return precargarImagen(imagenDe(datos)).then(function (url) {
          return { datos: datos, url: url };
        });
      });

      Promise.all([busqueda, esperar(TIEMPO_MINIMO)])
        .then(function (resultados) {
          var resultado = resultados[0];
          estado.textContent = "";
          mostrar(resultado.datos, resultado.url);
          /* Recién lo damos por mostrado cuando salió bien: si falló,
             el próximo clic puede volver a intentar con el mismo */
          ultimo = pedido;
          boton.setAttribute("aria-expanded", "true");
        })
        .catch(function () {
          /* Corto a propósito: entra en el renglón reservado por el CSS */
          estado.textContent = "Falló la conexión. Probá de nuevo.";
        })
        .then(function () {
          boton.classList.remove("pokebola--cargando");
          cargando = false;
        });
    });
  }

  var bloques = document.querySelectorAll(".pokemon");
  Array.prototype.forEach.call(bloques, activarBloque);
})();
