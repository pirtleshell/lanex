import React from "react";
import { Galaxy } from "../models/Galaxy";
import { InvalidQuery } from "../errors";

interface GalaxyApiQuery {
  pgc?: number;
  brightest?: number;
  closest?: number;
  limit?: number;
  offset?: number;
}

export default (query: GalaxyApiQuery) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [data, setData] = React.useState<GalaxyData>({
    pgcs: [],
    galaxies: [],
  });

  const pgcs = React.useMemo(() => data.pgcs, [data]);
  const galaxies = React.useMemo(() => data.galaxies, [data]);
  const galaxy = React.useMemo(
    () => (galaxies.length > 0 ? galaxies[0] : null),
    [galaxies]
  );

  const { pgc, brightest, closest, limit, offset } = query;

  React.useEffect(() => {
    setLoading(true);
    const q = { pgc, brightest, closest, limit, offset };
    fetch(`https://laniakean.com/api/v1/galaxies/${encodeQuery(q)}`)
      .then((res) => res.json())
      .then((galaxyData: GalaxyData) => {
        galaxyData.error ? setError(galaxyData.error) : setData(galaxyData);
        setLoading(false);
      });
  }, [pgc, brightest, closest, limit, offset]);

  return { loading, data, error, pgcs, galaxies, galaxy };
};

/**
 * Encodes a `GalaxyApiQuery` into a uri string
 */
export const encodeQuery = (query: GalaxyApiQuery) => {
  const { brightest, closest, limit } = query;
  if (brightest && closest) {
    throw new InvalidQuery("Cannot fetch both closest & brightest galaxies");
  }
  if ((brightest && limit) || (closest && limit)) {
    throw new InvalidQuery(
      "Invalid query: using limit with brightest or closest."
    );
  }

  return (
    "?" +
    Object.entries(query)
      .filter((entry) => entry[1] != null)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&")
  );
};

interface GalaxyData {
  pgcs: number[];
  galaxies: Galaxy[];
  error?: string;
}
