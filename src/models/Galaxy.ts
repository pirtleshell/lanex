export interface Galaxy {
  pgc: number;
  dist: number;
  ra: string;
  dec: string;
  B_mag: number;
  Ks_mag: number;
  vhel: number;
  commonNames: string[];
  catalogs: GalaxyCatalogs;
}

interface GalaxyCatalogs {
  arp?: number;
  messier?: string;
  ngc?: string;
  sdss?: string;
  ugc?: string;
}

const catalogPriority = [
  { prop: "messier", prefix: "M" },
  { prop: "ngc", prefix: "NGC " },
  { prop: "arp", prefix: "ARP " },
  { prop: "ugc", prefix: "UGC " },
  { prop: "sdss", prefix: "SDSS " },
];

export const getGalaxyName = (galaxy: Galaxy): string => {
  if (galaxy.commonNames.length) {
    return galaxy.commonNames[0];
  }

  for (const { prop, prefix } of catalogPriority) {
    if (galaxy.catalogs[prop]) {
      return prefix + galaxy.catalogs[prop];
    }
  }

  return `PGC ${galaxy.pgc}`;
};
