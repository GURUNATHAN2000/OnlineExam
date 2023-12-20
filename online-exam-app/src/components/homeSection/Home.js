import React, { useEffect } from "react";

const Home = ({ setPage }) => {
  useEffect(() => {
    setPage("home");
  });

  return (
    <div class="card">
      <img
        src="bg-boy.gif"
        alt="back-ground-image loading..."
        height="450px"
        className="card-img"
      />
    </div>
  );
};

export default Home;
