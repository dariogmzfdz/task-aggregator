import { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
  faVolumeOff,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  songs,
  setSongs,
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  volumeLvl,
  setVolumeLvl,
}) => {
  useEffect(() => {
    audioRef.current.volume = volumeLvl;
  });

  // Event Handlers
  // This function is used to Play currentSong selected
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  // FUNCTION TO AVOID USING USEEFFECT
  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };

  // Skip and reverse to track Event Handler
  const skipTrackHandler = async (direction) => {
    // Goes to state holding playlist object and determines where in the array current song is
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    // console.log(currentIndex);
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]); //If index reaches song.length it makes value 0
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      // Check to see if the index is negative
      if ((currentIndex - 1) % songs.length === -1) {
        // If index is -1 set index to last index
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
        if (isPlaying) audioRef.current.play();
        return;
      }
      // If index is Not -1 then subtract 1
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play();
  };

  // The function is used to convert the duration value into time
  // Ex. 100seconds = 1min and 40seconds || 1:40
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  // Must add onChange handler to avoid input error
  // When there is a change made to the audio bar input tag the songInfo state updates the currentTime
  const dragHandler = (e) => {
    //gets currentTime from audio tag in App.js
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  //Adjust Volume handler
  const volumeHandler = (e) => {
    audioRef.current.volume = e.target.value / 10;
    setVolumeLvl(audioRef.current.volume);
  };

  //ADD ANIMATION STYLE FOR SONG TIME INPUT
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };
  //ADD ANIMATION STYLE FOR VOLUME
  const volumeAnim = {
    transform: `translateX(${volumeLvl * 100}%)`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            type="range"
            onChange={dragHandler}
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="volume-control">
        <div className="volume-down">
          <FontAwesomeIcon size="2x" icon={faVolumeOff} />
        </div>
        <div
          className="track"
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
        >
          <input min={0} max={10} type="range" onChange={volumeHandler} />
          <div style={volumeAnim} className="animate-track"></div>
        </div>
        <div>
          <FontAwesomeIcon size="2x" icon={faVolumeUp} />
        </div>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-left"
          icon={faAngleLeft}
          size="1x"
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          icon={isPlaying ? faPause : faPlay}
          size="1x"
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          icon={faAngleRight}
          size="1x"
        />
      </div>
    </div>
  );
};

export default Player;
