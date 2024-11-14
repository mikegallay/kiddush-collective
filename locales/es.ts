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
    title: "About Us",
    description: "At Kiddush Collective, we celebrate the global diversity of Jewish traditions. is to showcase the many ways that Judaism is practiced across different regions, cultures, and communities, highlighting the beauty and uniqueness of each. Judaism is more than a single story—it is a tapestry of experiences, customs, and voices from around the world. Whether through Ashkenazi, Sephardi, Mizrahi, Ethiopian, or other traditions, the Jewish people have preserved their rich heritage while embracing cultural diversity. Through this platform, we aim to connect people with these stories, encouraging understanding and fostering a sense of unity across differences. Dive into the vast array of traditions, learn how Kiddush is said in different regions, and discover how we are all connected through our shared heritage. We invite you to explore, share your story, and celebrate with us."
  },
  faq: {
    title: "Frequent Asked Questions",
    description: "You have questions, we have answers?"
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