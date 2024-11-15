console.log('Loaded ES');

export default {
  title: 'Spanish',
  header: {
    navItems: [
      { title: "Inicio", url: "/" },
      { title: "Acerca de", url: "/about" },
      { title: "P+F", url: "/faq" },
      { title: "Subir", url: "/upload" }
    ]
  },
  footer: {
    footerLinks: [
      { title: "Privacy Policy", url: "/privacy" },
      { title: "Terms of Service", url: "/terms" }
    ],
    copyright:"The Kiddush Collective. Reservados todos los derechos.",
  },
  home:{
    title: "Bienvenidos al Kiddush Collective",
    description: "Un catálogo global de cómo se dice Kidush en todo el mundo, celebrando la diversidad y la unidad."
  },
  about: {
    title: "Acerca de",
    description: "At Kiddush Collective, we celebrate the global diversity En Kiddush Collective celebramos la diversidad global de las tradiciones judías. es mostrar las muchas formas en que se practica el judaísmo en diferentes regiones, culturas y comunidades, destacando la belleza y singularidad de cada una. El judaísmo es más que una sola historia: es un tapiz de experiencias, costumbres y voces de todo el mundo. Ya sea a través de tradiciones asquenazíes, sefardíes, mizrajíes, etíopes u otras, el pueblo judío ha preservado su rico patrimonio al tiempo que abraza la diversidad cultural. A través de esta plataforma, pretendemos conectar a las personas con estas historias, fomentando la comprensión y fomentando un sentido de unidad a través de las diferencias. Sumérgete en la amplia gama de tradiciones, aprende cómo se dice Kidush en diferentes regiones y descubre cómo todos estamos conectados a través de nuestra herencia compartida. Te invitamos a explorar, compartir tu historia y celebrar con nosotros.of Jewish traditions. is to showcase the many ways that Judaism is practiced across different regions, cultures, and communities, highlighting the beauty and uniqueness of each. Judaism is more than a single story—it is a tapestry of experiences, customs, and voices from around the world. Whether through Ashkenazi, Sephardi, Mizrahi, Ethiopian, or other traditions, the Jewish people have preserved their rich heritage while embracing cultural diversity. Through this platform, we aim to connect people with these stories, encouraging understanding and fostering a sense of unity across differences. Dive into the vast array of traditions, learn how Kiddush is said in different regions, and discover how we are all connected through our shared heritage. We invite you to explore, share your story, and celebrate with us."
  },
  faq: {
    title: "Frequent Asked Questions",
    description: "You have questions, we have answers?"
  },
  upload: {
    title: "Sube tu Kidush",
    description: "Por favor complete el siguiente formulario para cargar su Kidush. Su información nos ayuda a catalogar las diversas formas en que se dice Kidush en diferentes regiones y niveles de observancia.",
    fname: "Nombre de pila",
    linitial: "Último inicial",
  }

} as const;

// We can also write locales using nested objects
// export default {
//   hello: 'Hello',
//   welcome: 'Hello {name}!',
//   about: {
//     you: 'Hello {name}! You have {age} yo',
//   },
//   scope: {
//     test: 'A scope',
//     more: {
//       test: 'A scope',
//       param: 'A scope with {param}',
//       and: {
//         more: {
//           test: 'A scope',
//         },
//       },
//       'stars#one': '1 star on GitHub',
//       'stars#other': '{count} stars on GitHub',
//     },
//   },
//   missing: {
//     translation: {
//       in: {
//         fr: 'This should work',
//       },
//     },
//   },
//   'cows#one': 'A cow',
//   'cows#other': '{count} cows',
// } as const;