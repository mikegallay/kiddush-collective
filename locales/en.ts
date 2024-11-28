// console.log('Loaded EN');

export default {
  title: 'English',
  header: {
    navItems: [
      { title: "Home", url: "/" },
      { title: "About", url: "/about" },
      { title: "FAQ", url: "/faq" },
      { title: "Upload", url: "/upload" }
    ],
    skipToMain: "Skip to main content"
  },
  footer: {
    footerLinks: [
      { title: "Privacy Policy", url: "/privacy" },
      { title: "Terms of Service", url: "/terms" }
    ],
    copyright:"The Kiddush Collective. All rights reserved.",
  },
  cookies: {
    title: "Cookies",
    description: "nom nom nom.",
    confirmButton: "Acknowledge"
  },
  privacy: {
    title: "Privacy Policy",
    description: "<h2 class='mb-4'>Titlee</h2><p>html test</p><p>html test</p><h2>Title</h2><p>html test</p><p>html test</p>"
  },
  home:{
    title: "A Shared Tradition.\nA Personal Connection.",
    description: "Lighting Shabbat candles and saying Kiddush connects Jews across generations and geographies. The same words, through different accents and melodies, remind us all of our shared heritage. What memories and traditions keep you connected?",
    button: "Share Your Connection",
    mapTooltip: "Discover"
  },
  about: {
    title: "About Us",
    description: "At Kiddush Collective, we celebrate the global diversity of Jewish traditions. is to showcase the many ways that Judaism is practiced across different regions, cultures, and communities, highlighting the beauty and uniqueness of each. Judaism is more than a single story—it is a tapestry of experiences, customs, and voices from around the world. Whether through Ashkenazi, Sephardi, Mizrahi, Ethiopian, or other traditions, the Jewish people have preserved their rich heritage while embracing cultural diversity. Through this platform, we aim to connect people with these stories, encouraging understanding and fostering a sense of unity across differences. Dive into the vast array of traditions, learn how Kiddush is said in different regions, and discover how we are all connected through our shared heritage. We invite you to explore, share your story, and celebrate with us."
  },
  faq: {
    title: "Frequent Asked Questions",
    description: "You have questions, we have answers?"
  },
  upload: {
    title: "Upload Your Kiddush",
    description: "Please fill out the following form to upload your Kiddush. Your information helps us catalogue the various ways Kiddush is said across different regions and observance levels.",
    fname: "First Name",
    linitial: "Initial of Last Name",
    email: "Email",
    dob: "Birth Year",
    gender: "Gender",
    youlive: "Where do you live?",
    youliveExact: "Provide a more specific location (optional)",
    youliveInfo: "To better represent your location on the map.",
    youliveMoreInfo: "We understand you might not want to reveal your exact location on the map. By selecting an area close to your location, rather than your exact position, this optional input helps our map feel more complete while still maintaining your privacy.",
    mapDrawerTitle: "Can you be more specific",
    mapDrawerDescription: "Please be as specific as possible to better represent your location. You don't have to share your exact location. An approximation is fine. Drop a pin and click Make Selection.",
    uploadFile: "Upload Your Kiddush Audio (optional)",
    uploadFileInfo: "No file to share? That's ok! We'd still love to learn more about you and where you are from.",
    shabbatMemory: "Favorite Shabbat Memory. (optional)",
    shabbatMemoryInfo: "Tell us about any memory related to this Kiddush or Shabbat.",
    moreInfoTitle: "Tell Us About Yourself",
    observance: "Level of Observance",
    kiddushFreq: "How Often Do You Say Kiddush?",
    influence: "How Much Does Judaism Influence Your Life?",
    favoriteDay: "Shabbat is my favorite day of the week.",
    race: "Race Options",
    heritage: "Which Jewish heritage best describes your background?",
    familyTitle: "Tell Us About Your Family",
    motherFrom: "Where is Your Mother From?",
    fatherFrom: "Where is Your Father From?",
    matGrandmotherFrom: "Where is Your Maternal Grandmother From?",
    matGrandfatherFrom: "Where is Your Maternal Grandfather From?",
    patGrandmotherFrom: "Where is Your Paternal Grandmother From?",
    patGrandmfatherFrom: "Where is Your Paternal Grandfather From?",
    fromInfo: "This location will not be exact.",
    optin: "I'm ok with my audio being used in social media, with the understanding that my identity and other personal information will not be shared.",
    submitButton: "Submit",
    processingButton: "Processing",
    cancelButton: "Cancel",
    makeSelectionButton: "Make Selection",
    selectOptionButton: "Select an Option",
    locationButton: "Select Location",
    mapButton: "Open Map Selector",
    inputDefaultError: "This field is required",
    requiredError: "is required",
    emailError: "Invalid email address",
    charError: "Some special characters are not allowed",
    invalidEmailError: "Invalid email address",
    filterList: "Filter Location List..."
  },
  thankyou: {
    title: "Thank You",
    subhead: "Your submission has been received successfully.",
    content: "In order to ensure all user generated content meets our standards, we will personally review and approve each submission. This process may take up to 48 hours. We appreciate your patience and understanding.",
    backhome: "Back To Home"
  }

} as const;