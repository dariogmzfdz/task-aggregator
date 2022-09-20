import { useState, useEffect, useRef } from "react";
import Song from "./Song";
import Player from "./Player";
import "./styles/app.scss";

// Songs data
import lofiPlaylist from "./lofiPlaylist";

function LofiPlayer() {
  // New Viewport height
  const adjustViewport = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    console.log(vh);
  };
  useEffect(() => {
    adjustViewport();
  }, []);
  window.addEventListener("resize", () => {
    // We execute the same script as before
    adjustViewport();
  });

  //useRef() Hook
  const audioRef = useRef(undefined);
  //STATE
  //This State is used to hold playlist data
  const [songs, setSongs] = useState(lofiPlaylist());
  //This State is used to show which song is selected
  const [currentSong, setCurrentSong] = useState(songs[0]);
  //This State determines if the song selected is playing
  const [isPlaying, setIsPlaying] = useState(false);
  //Information of song Selected
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  //Determines if Library should be open or not
  const [libraryStatus, setLibraryStatus] = useState(false);
  //DarkMode toggle
  const [darkMode, setDarkMode] = useState();
  //Volume
  const [volumeLvl, setVolumeLvl] = useState(0.3);

  //EVENT HANDLER
  //Adds values to setSongInfo state
  const timeUpdateHandler = (e) => {
    //Get Values from audio tag when it starts playing
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //Round numbers to hundredths from millionths
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    //Used to determine place in song bar
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage: animation,
    });
  };
  //Starts next song when the song ends
  const songEndHandler = async (e) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div className="lofi-player">
      <div className="player-container">
        <Song currentSong={currentSong} />
        <Player
          songs={songs}
          setSongs={setSongs}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audioRef={audioRef}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
          volumeLvl={volumeLvl}
          setVolumeLvl={setVolumeLvl}
        />
      </div>
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default LofiPlayer;
