import React, { useEffect, useState } from "react";
import ReactAudioPlayer from 'react-audio-player';


export function Player(props) {

        return (
                <div className="component">
                        <img 
                                className="musicCover"
                                src={props.image}
                        />
                        <div>
                                <h3 className="title">{props.title}</h3>
                                <p className="subTitle">{props.artist}</p>
                        </div>
                        <div>
                                <ReactAudioPlayer src={props.audioUrl} controls />
                        </div>
                </div>
        );
}


