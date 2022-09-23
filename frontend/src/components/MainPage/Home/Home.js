import React from "react";
import Header from "../Header/Header";
import LofiPlayer from "../LofiPlayer/LofiPlayer";
import MainPage from "../Main/Main";
import Menu from "../Menu/Menu";
import SideTasks from "../SideTasks/SideTasks";

function Home() {
  return (
    <>
      <Header />
      <div class="main-container">
        <Menu />
        <SideTasks />
        <MainPage />
        <LofiPlayer />
      </div>
    </>
  );
}

export default Home;
