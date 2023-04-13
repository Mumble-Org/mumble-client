import React, { useEffect, useState } from "react";
import ReactAudioPlayer from 'react-audio-player';
import styles from './player.module.css';


export function Player(props) {

    return (
        <div className={styles.component}>
						<img 
								className={styles.musicCover}
								src={props.image}
						/>
						<div>
								<h3 className={styles.title}>{props.title}</h3>
								<p className={styles.subTitle}>{props.artist}</p>
						</div>
						<div>
								<ReactAudioPlayer src={props.audioUrl} controls />
						</div>
        </div>
    );
};