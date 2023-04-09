import { useEffect, useState } from "react";
import useSound from "use-sound"; // for handling sound
import testaudio from "../../public/testaudio.mp3"; // test sound
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons/lib";


export function Player() {
        const [isPlaying, setIsPlaying] = useState(false);
        const [play, {pause, duration, sound}] = useSound(testaudio);

        const playingButton = () => {
                if (isPlaying) {
                        pause(); // this will pause the audio
                        setIsPlaying(false);
                } else {
                        play(); // this will play the audio
                        setIsPlaying(true);
                }
        };

        return (
                <div className="component">
                        <h2>Playing Now</h2>
                        <img 
                                className="musicCover"
                                src="https://picsum.photos/200/200"
                        />
                        <div>
                                <h3 className="title">Love Baby</h3>
                                <p className="subTitle">india</p>
                        </div>
                        <div>
                                <button className="playButton">
                                        <IconContext.Provider value={{ size: "3em", color: "#24AE60"}}>
                                                <BiSkipPrevious />
                                        </IconContext.Provider>
                                </button>
                                {!isPlaying ? (
                                        <button className="playButton" onClick={playingButton}>
                                                <IconContext.Provider value={{ size: "3em", color: "#27AE60"}}>
                                                        <AiFillPlayCircle />
                                                </IconContext.Provider>
                                        </button>
                                ) : (
                                        <button className="playButton" onClick={playingButton}>
                                                <IconContext.Provider value={{ size: "3em", color: "#27AE60"}}>
                                                        <AiFillPauseCircle />
                                                </IconContext.Provider>
                                        </button>
                                )}
                                <button className="playButton">
                                        <IconContext.Provider value={{ size: "3em", color: "#27AE60"}}>
                                                <BiSkipNext />
                                        </IconContext.Provider>
                                </button>
                        </div>
                </div>
        );
}


