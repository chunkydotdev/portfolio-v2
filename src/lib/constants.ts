export const socialMedia = {
  linkedin: {
    url: "https://www.linkedin.com/in/magnusjunghard/",
    label: "LinkedIn",
  },
  youtube: {
    url: "https://youtube.com/@chunkydotdev",
    label: "YouTube",
  },
  github: {
    url: "https://github.com/chunkydotdev",
    label: "GitHub",
  },
  twitter: {
    url: "https://x.com/moonfarm_dev/",
    label: "Twitter",
  },
} as const;

export const partners = [
  { id: "kvd", name: "KVD", logo: "/assets/kvd-logo.svg" },
  { id: "polestar", name: "Polestar", logo: "/assets/polestar-logo.svg" },
  { id: "sendify", name: "Sendify", logo: "/assets/sendify-logo.svg" },
  { id: "vasttrafik", name: "Vasttrafik", logo: "/assets/vasttrafik-logo.svg" },
  {
    id: "astra-zeneca",
    name: "Astra Zeneca",
    logo: "/assets/astra-zeneca-logo.svg",
  },
] as const;

export const siteConfig = {
  title: "Magnus JJ",
  description:
    "Freelance web developer - Converting ideas and dreams into reality",
  url: "https://junghard.com",
  analyticsId: "junghard.com",
};
