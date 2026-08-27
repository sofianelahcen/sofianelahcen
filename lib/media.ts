export type Media = {
  src: string;
  width: number;
  height: number;
  kind: "image" | "video";
  poster?: string;
  alt: string;
};

export const aspectOf = (item: Media) => item.width / item.height;
