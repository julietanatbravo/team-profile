# Equipo de Front end 33

Página del equipo para la materia: reúne los perfiles de las cinco personas que lo
integramos (foto, ciudad, edad, habilidades y gustos) más una bitácora del proyecto.
HTML y CSS a mano, sin frameworks, y un poco de JavaScript para la [PokéAPI](https://pokeapi.co/).

🔗 **Sitio publicado:** https://team-profile-msftiu8bb-juli-brasv.vercel.app

## Integrantes

| Nombre | Perfil | GitHub |
|--------|--------|--------|
| Julieta Natalia Bravo | [Ver](perfiles/integrante-1.html) | [@julietanatbravo](https://github.com/julietanatbravo) |
| _Pendiente_ | [Ver](perfiles/integrante-2.html) | — |
| _Pendiente_ | [Ver](perfiles/integrante-3.html) | — |
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
js/pokemon.js       Pokébola (PokéAPI)
imgs/Juli.jpg       Foto de perfil
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

Cada perfil lleva su propia función interactiva. La de **Julieta es la pokébola**; los
otros cuatro integrantes sumarán la suya, cada una en su archivo.

La **portada no tiene JavaScript**: la navegación son enlaces `<a>` y el efecto de las
tarjetas es CSS.

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

**Capturas** — pendientes. Guardarlas en `docs/capturas/` y descomentar estas líneas:

<!-- ![Portada](docs/capturas/portada.png) -->
<!-- ![Perfil](docs/capturas/perfil.png) -->
<!-- ![Pokébola abierta](docs/capturas/pokebola-abierta.png) -->
<!-- ![Responsive](docs/capturas/responsive.png) -->

## Uso de IA

**Herramienta:** Claude Code (extensión de VS Code), modelo **Claude Opus 5**, con plan pago.
**Experiencia previa:** el equipo ya usa asistentes de IA para programar con regularidad.

**Qué generó:** la estructura HTML de las páginas, la hoja de estilos completa con su
sistema de variables y breakpoints, el JavaScript de la pokébola y este README. También
redimensionó la foto de perfil (de 1,9 MB a 135 KB) y verificó contra la PokéAPI que los
nombres existieran y que el rango de sorteo fuera correcto.

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

## Evolución

**Para esta entrega**

- [ ] Datos, fotos y GitHub de los integrantes 2 a 5
- [ ] La función propia de cada uno de los otros cuatro perfiles
- [ ] Entradas 2 y 3 de la bitácora
- [ ] Capturas de pantalla

**Más adelante**

- Modo oscuro, aprovechando que los colores ya son variables
- Bitácora generada desde un JSON en vez de escrita a mano
- Migrar a un framework para no repetir el mismo HTML cinco veces
