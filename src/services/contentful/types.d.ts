interface Info {
  content: string;
  lang: string;
  source: string;
}

interface Family {
  lang: string;
  name: string;
}

export interface SpeciesItemProps {
  map: () => void;
  bounds: {
    northEast: {
      lat: number;
      lng: number;
    };
    southWest: {
      lat: number;
      lng: number;
    };
  };
  commonname: string;
  family: Family[];
  image: string;
  info: Info[];
  rangemap: string;
  redlist_citation_full: string;
  redlist_citation_short: string;
  redlist_link: string;
  scientificname: string;
  sequenceid: number;
  taxa: string;
  tc_id: number;
  updated_at: string;
}
