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

export const getGalaxyNames = (galaxy: Galaxy) => {
  var names = [];
  Object.keys(galaxy.catalogs).forEach((key) => {
    if (key === "messier") {
      var n = galaxy.catalogs[key];
      names.unshift(`Messier ${n} (M${n})`);
    } else if (key === "sdss") {
      return;
    } else {
      names.push(`${key.toUpperCase()} ${galaxy.catalogs[key]}`);
    }
  });
  names.push("PGC " + galaxy.pgc);
  return galaxy.commonNames.concat(names);
};
