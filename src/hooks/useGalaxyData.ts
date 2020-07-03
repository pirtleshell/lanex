import React from "react";
import useSWR from "swr";
import { ApiGalaxy, Galaxy } from "../models/Galaxy";
import { InvalidQuery } from "../errors";

interface GalaxyApiQuery {
  pgc?: number;
  brightest?: number;
  closest?: number;
  limit?: number;
  offset?: number;
}

const fetcher = (url: string): Promise<GalaxyData> =>
  fetch(url).then((res) => res.json());

export default (query: GalaxyApiQuery) => {
  const url = `https://laniakean.com/api/v1/galaxies/${encodeQuery(query)}`;
  const { data, error: fetchError } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const error = React.useMemo(() => data?.error ?? fetchError ?? null, [
    data,
    fetchError,
  ]);

  const loading = React.useMemo(() => data == null && error == null, [
    data,
    error,
  ]);
  const pgcs = React.useMemo(() => data?.pgcs, [data]);
  const galaxies = React.useMemo(
    () => data?.galaxies.map((gal) => new Galaxy(gal)) || [],
    [data]
  );
  const galaxy = React.useMemo(
    () => (galaxies.length > 0 ? galaxies[0] : null),
    [galaxies]
  );

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
  galaxies: ApiGalaxy[];
  error?: string;
}
