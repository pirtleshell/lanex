export interface GalaxyData {
  pgcs: number[];
  galaxies: Galaxy[];
  error?: string;
}

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
}
