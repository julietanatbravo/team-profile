# Equipo de Front end 33

Página del equipo para la materia: reúne los perfiles de las cinco personas que lo
integramos (foto, ciudad, edad, habilidades y gustos) más una bitácora del proyecto.
HTML y CSS a mano, sin frameworks, y JavaScript para la [PokéAPI](https://pokeapi.co/)
y la [API de YGOPRODeck](https://ygoprodeck.com/api-guide/).

🔗 **Sitio publicado:** https://team-profile-msftiu8bb-juli-brasv.vercel.app

## Integrantes

| Nombre | Perfil | GitHub |
|--------|--------|--------|
| Jonatan Emanuel Uribio | [Ver](perfiles/integrante-1.html) | _Pendiente_ |
| Julieta Natalia Bravo | [Ver](perfiles/integrante-2.html) | [@julietanatbravo](https://github.com/julietanatbravo) |
| Gonzalo Moretti | [Ver](perfiles/integrante-3.html) | [@moregonza1975-rgb](https://github.com/moregonza1975-rgb) |
| _Pendiente_ | [Ver](perfiles/integrante-4.html) | — |
| _Pendiente_ | [Ver](perfiles/integrante-5.html) | — |

## Tecnologías

HTML5 · CSS3 (variables, Grid, Flexbox, media queries) · JavaScript vanilla (`fetch`) ·
Google Fonts · PokéAPI · Git y GitHub · Vercel.

Sin dependencias: se abre directo en el navegador. Para desarrollar conviene usar
**Live Server** de VS Code, porque algunos navegadores bloquean las APIs externas cuando
la página se abre como `file://`.

## Estructura

```
index.html          Portada: equipo, descripción e integrantes
bitacora.html       Entradas del proyecto
css/estilos.css     Única hoja de estilos
js/pokemon.js       Pokébola de Julieta (PokéAPI)
js/kuriboh.js       Mazo interactivo de Jonatan (YGOPRODeck API)
js/portada.js       Número 33 interactivo de la portada
js/frases.js        Frases aleatorias de Gonzalo
imgs/Juli.jpg       Foto de perfil
imgs/Jonatan.jpeg   Foto de perfil
imgs/Gonzalo.jpg    Foto pública del perfil de GitHub
perfiles/           integrante-1.html … integrante-5.html
```

## Guía de estilos

**Paleta** — definida como variables CSS en `:root`, al principio de `estilos.css`.

| Hex | Variable | Uso |
|-----|----------|-----|
| `#F4F6F9` | `--color-fondo` | Fondo general |
| `#FFFFFF` | `--color-superficie` | Tarjetas |
| `#1F2933` | `--color-texto` | Texto principal |
| `#5B6672` | `--color-suave` | Textos secundarios |
| `#2F6F6B` | `--color-acento` | Encabezado, enlaces, bordes activos |
| `#E3F0EE` | `--color-acento-claro` | Chips y avatares |
| `#DFE4EA` | `--color-borde` | Bordes |
| `#E63946` | — | Mitad superior de la pokébola |

**Google Fonts** — [Outfit](https://fonts.google.com/specimen/Outfit) (600, 700) para
títulos y botones; [Inter](https://fonts.google.com/specimen/Inter) (400, 500, 600) para
el resto. Ambas con `display=swap` y fuentes del sistema como respaldo.

**Iconografía** — sin librerías: la pokébola es CSS puro (gradiente + `border-radius` +
`::after`), los avatares son SVG embebido como `data:` URI y las flechas son entidades HTML.

**Responsive** — *mobile first*, con cortes en **400px**, **900px** y **1200px**. Las
grillas pasan de 1 a 2 y 3 columnas, y desde los 900px el perfil pone la foto al costado.

## JavaScript

Cada perfil lleva su propia función interactiva. La de **Jonatan es un mazo de cartas de
Yugi**, la de **Julieta es la pokébola** y la de **Gonzalo muestra frases inspiradoras
aleatorias**. Los otros dos integrantes sumarán la suya, cada una en su archivo.

**El número 33 de la portada** ([`js/portada.js`](js/portada.js)) — está formado por capas
translúcidas que reaccionan suavemente a la posición del puntero. Al tocarlo o hacer clic,
los dos números se separan y vuelven a unirse. La interacción también funciona con teclado
y desactiva el movimiento cuando el sistema tiene activada la opción de reducir animaciones.

**La pokébola** ([`js/pokemon.js`](js/pokemon.js)) — debajo de la foto, al tocarla consulta
la PokéAPI y muestra uno de los cuatro pokémon favoritos. Cuáles son se configura desde el
HTML, sin tocar el JS (`data-pokemon="aleatorio"` sortea entre los 1025):

```html
<section class="pokemon" data-pokemon="bulbasaur,chikorita,chansey,clefairy">
```

| Función | Qué hace |
|---------|----------|
| `activarBloque()` | Lee la configuración del HTML y engancha el clic |
| `elegirPedido()` | Sortea el pokémon garantizando que no se repita el anterior |
| `traerPokemon()` | Hace el `fetch` a la API |
| `imagenDe()` · `precargarImagen()` | Eligen la mejor ilustración y la descargan antes de mostrarla |
| `mostrar()` | Actualiza la tarjeta existente en vez de recrearla |
| `capitalizar()` · `idAleatorio()` · `esperar()` | Ayudantes de formato, sorteo y tiempo |

Hay un tiempo mínimo de 700 ms para que la animación se vea aunque el pokémon esté en
caché; la tarjeta no se recrea y los espacios están reservados, así nada salta; si falla
la conexión avisa; y las animaciones se apagan con "reducir movimiento" activado.

**El mazo de Yugi** ([`js/kuriboh.js`](js/kuriboh.js)) — al tocar el dorso elige al azar
una carta icónica usada por Yugi, consulta la API pública de YGOPRODeck y la invoca con una
animación de volteo. En los siguientes toques devuelve la carta al mazo, baraja y muestra
otra sin repetir la anterior. La interacción informa su estado mediante un mensaje accesible
y evita nuevas acciones mientras una carta se está cargando.

**Las frases de Gonzalo** ([`js/frases.js`](js/frases.js)) — al tocar el botón elige una
frase inspiradora al azar, evita repetir inmediatamente la anterior y anima suavemente su
aparición. El mensaje se anuncia mediante una región accesible.

**Capturas** — pendientes. Guardarlas en `docs/capturas/` y descomentar estas líneas:

<!-- ![Portada](docs/capturas/portada.png) -->
<!-- ![Perfil](docs/capturas/perfil.png) -->
<!-- ![Pokébola abierta](docs/capturas/pokebola-abierta.png) -->
<!-- ![Responsive](docs/capturas/responsive.png) -->

## Uso de IA

**Herramientas:** Claude Code (extensión de VS Code), modelo **Claude Opus 5**, y
**OpenAI Codex**, con planes pagos.
**Experiencia previa:** el equipo ya usa asistentes de IA para programar con regularidad.

**Qué generó:** Claude ayudó con la estructura HTML inicial, la hoja de estilos, la
Pokébola y la primera versión del README. Codex ayudó a incorporar el perfil de Jonatan,
reordenar los integrantes, documentar los cambios y desarrollar la carta interactiva de
Kuriboh. También se verificaron enlaces, sintaxis y consultas a las APIs.

**Imágenes:** no se usó ningún modelo generador de imágenes. La foto de perfil es real, y
el avatar provisorio y la pokébola están dibujados con código (SVG y CSS).

**Qué revisamos y cambiamos con criterio propio:**

- Reescribimos la descripción del equipo, que había salido genérica, con el contexto real.
- Sacamos los roles de cada integrante por no aportar nada.
- Probando la página detectamos que la pokébola parpadeaba y que el contenido saltaba al
  aparecer el texto de carga. Pedimos corregir las dos cosas.
- Decidimos mostrar un solo pokémon en vez de cuatro y que no se repita el anterior.
- Dejamos la pokébola únicamente en el perfil de Julieta: la consigna pide que cada
  integrante desarrolle su propia función, así que no corresponde repetirla en los demás.
- Corregimos la redacción de la bitácora y el orden de las entradas.
- Elegimos una interacción distinta para Jonatan, basada en un mazo de cartas de Yugi,
  para evitar repetir la función del perfil de Julieta.
- Convertimos el número 33 en el elemento visual principal de la portada y le agregamos
  profundidad, movimiento parallax e interacción por clic.

## Evolución

**Para esta entrega**

- [ ] GitHub de Jonatan
- [ ] Datos, fotos y GitHub de los integrantes 4 y 5
- [ ] La función propia de los integrantes 4 y 5
- [ ] Capturas de pantalla

**Más adelante**

- Modo oscuro, aprovechando que los colores ya son variables
- Bitácora generada desde un JSON en vez de escrita a mano
- Migrar a un framework para no repetir el mismo HTML cinco veces
