interface ItemAddedBy {
  external_urls: any;
  href: string;
  id: string;
  type: string;
  uri: string;
}
interface Album {
  album_type: string;
  artists: [];
  available_markets: [];
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: [];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}
interface Artist {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
interface ItemTrack {
  album: Album;
  artists: Artist[];
  available_markets: [];
  disc_number: number;
  duration_ms: string;
  name: string;
  id: string;
}
interface ItemVideoThumbnail {
  url?: string;
}

export default interface Item {
  added_at: string;
  added_by: ItemAddedBy;
  track: ItemTrack;
  video_thumbnail: ItemVideoThumbnail;
}
