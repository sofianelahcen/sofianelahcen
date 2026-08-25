import { media, type Media } from "./media";

export type Credit = { role?: string; name: string };

export type Slide = {
  media: Media;
  title?: string;
  credits?: Credit[];
  trailingLines?: number;
};

export type Project = {
  id: string;
  slides: Slide[];
  leadingLines?: number;
  trailingLines?: number;
};

const beautyEditCredits: Credit[] = [
  { name: "ART DIRECTION AND PHOTOGRAPHY BY SOFIANE LAHCEN" },
  { name: "BEAUTY BY NAFIK BOUCHAREB" },
  { name: "HAIR BY YURI KATO" },
  { name: "CASTING BY PIERRE-ETIENNE CALLIES" },
];

const nssCredits: Credit[] = [
  { name: "PHOTOGRAPHY BY SOFIANE LAHCEN" },
  { name: "STYLED BY SIMONE RUTIGLIANO" },
  { name: "HAIR BY YURI KATO" },
  { name: "BEAUTY BY NAFIK BOUCHAREB" },
  { name: "CASTING BY" },
];

const BEAUTY_EDIT = "THE BEAUTY EDIT";
const NSS = "NSS PARIS NOIR PRINT ISSUE EDITORIAL";

export const galleries: Project[] = [
  {
    id: "project-001",
    slides: [
      {
        media: media.beautyEditReel,
        title: BEAUTY_EDIT,
        credits: beautyEditCredits,
        trailingLines: 1,
      },
      { media: media.beautyEditOne, title: BEAUTY_EDIT, credits: beautyEditCredits },
      {
        media: media.beautyEditTwo,
        title: BEAUTY_EDIT,
        credits: beautyEditCredits,
        trailingLines: 4,
      },
      {
        media: media.beautyEditThree,
        title: BEAUTY_EDIT,
        credits: beautyEditCredits,
        trailingLines: 3,
      },
    ],
  },
  {
    id: "project-001-gallery-2",
    slides: [
      { media: media.nssOpener, title: NSS, credits: nssCredits, trailingLines: 4 },
      {
        media: media.nssSecond,
        title: NSS,
        credits: [{ name: "PHOTOGRAPHY BY SOFIANE LAHCEN" }],
        trailingLines: 4,
      },
    ],
  },
  {
    id: "project-001-gallery-3",
    trailingLines: 1,
    slides: [
      { media: media.nssPlateOne },
      { media: media.nssPlateTwo, title: NSS, credits: nssCredits },
      { media: media.nssPlateThree, title: NSS, credits: nssCredits },
      { media: media.nssPlateFour, title: NSS, credits: nssCredits },
      { media: media.nssPlateFive },
      { media: media.nssPlateSix },
    ],
  },
];

export const projects: Project[] = [
  {
    id: "project-002-copy-1",
    slides: [{ media: media.boysReel, title: NSS, credits: nssCredits }],
  },
  {
    id: "project-001-copy",
    leadingLines: 5,
    slides: [{ media: media.nssWide, title: NSS, credits: nssCredits }],
  },
  {
    id: "project-002",
    slides: [
      { media: media.sandburnOne, title: NSS, credits: nssCredits },
      {
        media: media.sandburnTwo,
        credits: [
          { name: "SANDBURN" },
          { name: "A quiet documentation of Summer." },
          { name: "Memories burned like sun through skin." },
        ],
        trailingLines: 1,
      },
    ],
  },
  {
    id: "project-002-copy-1-copy",
    slides: [{ media: media.amiCampaign, title: NSS, credits: nssCredits }],
  },
  {
    id: "project-002-copy",
    trailingLines: 3,
    slides: [{ media: media.objectsOfDesire, title: NSS, credits: nssCredits }],
  },
];

export const profile = {
  name: "SOFIANE LAHCEN",
  role: "Art Direction and Imake Making",
  statement:
    "PARIS-BASED MULTIDISCIPLINARY CREATIVE SOFIANE LAHCEN SPECIALISES IN ART DIRECTION FOR FASHION, BEAUTY, AND LUXURY BRANDS. SERVICES SPAN CREATIVE DIRECTION, PHOTOGRAPHY, ADVERTISING, BRAND STRATEGY, AND FULL-SERVICE BRANDING SOLUTIONS.",
  email: "sofianelahcenpro@gmail.com",
  instagram: "https://www.instagram.com/sofiane.lahcen/",
};

export type ArchiveProject = {
  id: string;
  title: string;
  year: string;
  credits: Credit[];
  items: Media[];
};

export const archiveProjects: ArchiveProject[] = [
  {
    id: "the-beauty-edit",
    title: BEAUTY_EDIT,
    year: "2026",
    credits: beautyEditCredits,
    items: [
      media.beautyEditReel,
      media.beautyEditOne,
      media.beautyEditTwo,
      media.beautyEditThree,
    ],
  },
  {
    id: "nss-paris-noir",
    title: NSS,
    year: "2026",
    credits: nssCredits,
    items: [media.nssOpener, media.nssSecond, media.nssWide],
  },
  {
    id: "nss-paris-noir-plates",
    title: `${NSS} — PLATES`,
    year: "2026",
    credits: nssCredits,
    items: [
      media.nssPlateOne,
      media.nssPlateTwo,
      media.nssPlateThree,
      media.nssPlateFour,
      media.nssPlateFive,
      media.nssPlateSix,
    ],
  },
  {
    id: "sandburn",
    title: "SANDBURN",
    year: "2025",
    credits: [
      { name: "PHOTOGRAPHY BY SOFIANE LAHCEN" },
      { name: "A quiet documentation of Summer." },
      { name: "Memories burned like sun through skin." },
    ],
    items: [media.sandburnOne, media.sandburnTwo],
  },
  {
    id: "ami-spring-summer-26",
    title: "AMI SPRING SUMMER 26",
    year: "2026",
    credits: [
      { name: "ART DIRECTION AND PHOTOGRAPHY BY SOFIANE LAHCEN" },
      { name: "SET DESIGN AND STYLING BY GIULIA" },
    ],
    items: [media.amiCampaign],
  },
  {
    id: "objects-of-desire",
    title: "OBJECTS OF DESIRE",
    year: "2026",
    credits: [{ name: "ART DIRECTION BY SOFIANE LAHCEN" }],
    items: [media.objectsOfDesire],
  },
  {
    id: "boys-boys",
    title: "BOYS BOYS",
    year: "2025",
    credits: [
      { name: "PHOTOGRAPHY AND ART DIRECTION BY SOFIANE LAHCEN" },
      { name: "STYLING BY JENEMAPPELLEPASKARL" },
      { name: "CASTING BY ERNES" },
    ],
    items: [media.boysReel],
  },
  {
    id: "untitled",
    title: "PROJECT",
    year: "—",
    credits: [{ name: "Description of Project" }],
    items: [media.archivePlate],
  },
];

export const nav = {
  title: "SOFIANE LAHCEN",
  tagline: "ART DIRECTION & IMAGE MAKING",
  section: "SELECTED WORKS",
  contact: "CONTACT",
  archive: "ARCHIVE",
};
