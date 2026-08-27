const MEDIA = `
  media[]{
    _type,
    _key,
    _type == "imageItem" => {
      alt,
      "url": image.asset->url,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height,
      "lqip": image.asset->metadata.lqip
    },
    _type == "videoItem" => {
      alt,
      "url": file.asset->url,
      "posterUrl": poster.asset->url,
      "width": aspectWidth,
      "height": aspectHeight
    }
  }
`;

export const siteQuery = `{
  "settings": *[_type == "siteSettings"][0]{
    title, tagline, sectionLabel, statement, email, instagram
  },
  "projects": *[_type == "project"] | order(orderRank){
    _id, title, year, credits, ${MEDIA}
  },
  "archive": *[_type == "archiveProject"] | order(orderRank){
    _id, title, year, credits, ${MEDIA}
  }
}`;
