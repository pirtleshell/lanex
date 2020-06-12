import React from "react";

interface Props {
  galaxyId: number;
}

const GalaxyDetail: React.FC<Props> = ({ galaxyId }) => {
  const [galaxyData, setGalaxyData] = React.useState(null);
  const pgc = parseInt(String(galaxyId));

  if (isNaN(pgc)) {
    return <p>404. Galaxy id must be a number.</p>;
  }

  React.useEffect(() => {
    fetch(`https://laniakean.com/api/v1/galaxies/?pgc=${pgc}`)
      .then((res) => res.json())
      .then((data) => {
        setGalaxyData(data);
      });
  }, [pgc]);

  return (
    <div>
      <p>Heya! We're looking at galaxy with id {galaxyId}!</p>
      {!galaxyData ? (
        <p>Loading...</p>
      ) : galaxyData?.galaxies?.length > 0 ? (
        <pre>{JSON.stringify(galaxyData.galaxies[0], null, 2)}</pre>
      ) : (
        <p>No galaxy with PGC {pgc} found in database.</p>
      )}
    </div>
  );
};

export default GalaxyDetail;
