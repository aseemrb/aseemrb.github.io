export const SITE = {
  website: "https://aseemrb.me/", // replace this with your deployed domain
  author: "Aseem Baranwal",
  profile: "https://aseemrb.me/",
  desc: "Machine Learning Researcher in Quantitative Finance",
  title: "Aseem Baranwal",
  ogImage: "",
  lightAndDarkMode: true,
  postPerIndex: 3,
  postPerPage: 5,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: false,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false,
    text: "Edit page",
    url: "https://github.com/aseemrb/",
  },
  dynamicOgImage: false,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "America/New_York", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
