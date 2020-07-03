import { formatRA, formatDec } from "./units";

export interface ApiGalaxy {
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

export class Galaxy {
  data: ApiGalaxy;
  constructor(galaxyData: ApiGalaxy) {
    this.data = galaxyData;
  }

  pgc() {
    return this.data.pgc;
  }

  name() {
    if (this.data.commonNames.length) {
      return this.data.commonNames[0];
    }

    for (const { prop, prefix } of catalogPriority) {
      if (this.data.catalogs[prop]) {
        return prefix + this.data.catalogs[prop];
      }
    }

    return `PGC ${this.data.pgc}`;
  }

  names() {
    var names = [];
    Object.keys(this.data.catalogs).forEach((key) => {
      if (key === "messier") {
        var n = this.data.catalogs[key];
        names.unshift(`Messier ${n} (M${n})`);
      } else if (key === "sdss") {
        return;
      } else {
        names.push(`${key.toUpperCase()} ${this.data.catalogs[key]}`);
      }
    });
    names.push("PGC " + this.data.pgc);
    return this.data.commonNames.concat(names);
  }

  ra() {
    return formatRA(this.data.ra);
  }

  dec() {
    return formatDec(this.data.dec);
  }
  dist() {
    return this.data.dist;
  }
  vhel() {
    return this.data.vhel;
  }

  magnitudes = {
    B: () => this.data.B_mag,
    Ks: () => this.data.Ks_mag,
  };
}
