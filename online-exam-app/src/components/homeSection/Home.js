import React, { useEffect } from "react";

const Home = ({ setPage }) => {
  useEffect(() => {
    setPage("home");
    // setIsLoading(false);
  }, []);

  return (
    <div className="card">
      <img
        src="bg-boy.gif"
        alt="back-ground-image loading..."
        className="card-img"
      />
    </div>
  );
};

export default Home;
