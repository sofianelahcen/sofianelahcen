export type Media = {
  src: string;
  width: number;
  height: number;
  kind: "image" | "video";
  poster?: string;
  alt: string;
};

export const media = {
  beautyEditReel: {
    src: "/media/A305603746.mp4",
    width: 810,
    height: 1440,
    kind: "video",
    poster: "/media/A305603746-poster.webp",
    alt: "The Beauty Edit title sequence listing the production credits",
  },
  beautyEditOne: {
    src: "/media/D305603767.webp",
    width: 1080,
    height: 1350,
    kind: "image",
    alt: "The Beauty Edit — beauty portrait",
  },
  beautyEditTwo: {
    src: "/media/Y305603773.webp",
    width: 1080,
    height: 1350,
    kind: "image",
    alt: "The Beauty Edit — beauty portrait",
  },
  beautyEditThree: {
    src: "/media/W305654571.webp",
    width: 1480,
    height: 1852,
    kind: "image",
    alt: "The Beauty Edit — beauty portrait",
  },
  nssOpener: {
    src: "/media/J305610743.webp",
    width: 1120,
    height: 1498,
    kind: "image",
    alt: "NSS Paris Noir print issue editorial — opening spread",
  },
  nssSecond: {
    src: "/media/Q305610184.webp",
    width: 1920,
    height: 2400,
    kind: "image",
    alt: "NSS Paris Noir print issue editorial — portrait",
  },
  nssPlateOne: {
    src: "/media/J308473637.webp",
    width: 1260,
    height: 1723,
    kind: "image",
    alt: "NSS Paris Noir print issue editorial — plate",
  },
  nssPlateTwo: {
    src: "/media/V308473580.webp",
    width: 1082,
    height: 1448,
    kind: "image",
    alt: "NSS Paris Noir print issue editorial — plate",
  },
  nssPlateThree: {
    src: "/media/S308473564.webp",
    width: 1086,
    height: 1454,
    kind: "image",
    alt: "NSS Paris Noir print issue editorial — plate",
  },
  nssPlateFour: {
    src: "/media/Z308473637.webp",
    width: 1260,
    height: 1677,
    kind: "image",
    alt: "NSS Paris Noir print issue editorial — plate",
  },
  nssPlateFive: {
    src: "/media/U308473637.webp",
    width: 1260,
    height: 719,
    kind: "image",
    alt: "NSS Paris Noir print issue editorial — plate",
  },
  nssPlateSix: {
    src: "/media/O308473637.webp",
    width: 1260,
    height: 1823,
    kind: "image",
    alt: "NSS Paris Noir print issue editorial — plate",
  },
  boysReel: {
    src: "/media/S299381907.mp4",
    width: 1112,
    height: 718,
    kind: "video",
    poster: "/media/S299381907-poster.webp",
    alt: "Boys Boys — moving image",
  },
  amiCampaign: {
    src: "/media/G299378836.webp",
    width: 1080,
    height: 1350,
    kind: "image",
    alt: "Ami Spring Summer 26 — art direction and photography",
  },
  objectsOfDesire: {
    src: "/media/K299385705.webp",
    width: 1080,
    height: 740,
    kind: "image",
    alt: "Objects of Desire, 2026",
  },
  sandburnOne: {
    src: "/media/O299378981.webp",
    width: 1080,
    height: 1350,
    kind: "image",
    alt: "Loriane — Sandburn, 2025",
  },
  sandburnTwo: {
    src: "/media/M299378996.webp",
    width: 1080,
    height: 1350,
    kind: "image",
    alt: "Loriane — Sandburn, 2025",
  },
  nssWide: {
    src: "/media/G299412798.webp",
    width: 1456,
    height: 854,
    kind: "image",
    alt: "NSS Paris Noir print issue editorial — wide plate",
  },
  archivePlate: {
    src: "/media/H302564595.webp",
    width: 988,
    height: 1176,
    kind: "image",
    alt: "Archive project thumbnail",
  },
} as const satisfies Record<string, Media>;

export const aspectOf = (item: Media) => item.width / item.height;
