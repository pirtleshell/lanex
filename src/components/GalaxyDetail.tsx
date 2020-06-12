import React from "react";
import useGalaxyData from "../hooks/useGalaxyData";

interface Props {
  galaxyId: number;
}

const GalaxyDetail: React.FC<Props> = ({ galaxyId }) => {
  const pgc = parseInt(String(galaxyId));
  const { loading, galaxy } = useGalaxyData({ pgc });

  if (isNaN(pgc)) {
    return <p>404. Galaxy id must be a number.</p>;
  }

  return (
    <div>
      <p>Heya! We're looking at galaxy with id {galaxyId}!</p>
      {loading ? (
        <p>Loading...</p>
      ) : galaxy ? (
        <pre>{JSON.stringify(galaxy, null, 2)}</pre>
      ) : (
        <p>No galaxy with PGC {pgc} found in database.</p>
      )}
    </div>
  );
};

export default GalaxyDetail;
