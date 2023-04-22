import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import Image from "next/image";
import styles from './profile.module.css';
import UploadedBeats from './uploadedBeats';
import { userAgent } from 'next/server';

type Props = {}

export const Profile = (props) => {
    // const [user, setUser] = useState({
    //     name: "John Doe",
    //     email: "Johndoe@gmail.com",
    //     password: "",
    //     type: "Producer",
    //     genres: "",
    //     portfolio: "",
    //     location: "Lagos, Nigeria",
    //     calendar: "",
    //     phone_number: "+2348001110111",
    //     rating: 5,
    //     rate:"",
    //     beats_sold: 1000,
    //     beats_uploaded: 10,
    //     image: "",
    //     _id: "643dceb9a04817c0fd352cf6"
	// });
    const { user } = props;
    console.log(user);
    const [userRating, setUserRating] = useState([]);
    const [scene, setScene] = useState("uploaded_beats");

    useEffect(() => {
            const rating = genRating(user.ratings || 4);
            setUserRating(rating);
        }, 
    []);

    const handleClick = (e) => {
        // e.preventDefault();
        setScene(e.target.id);
    }


    return (
        <div>
            <div className={styles.profileImage}>
                <center>
                    <Image src="/Profile image.svg" alt={user.name} width="150" height="150" />
                </center>
                {/* <img src={user.image} alt={user.name}></img> */}
            </div>
            <div className={styles.userName}>
                <center>
                    {user.name}
                </center>
            </div>
            <div className={styles.type}>
                <center>
                    {user.type}
                </center>
            </div>
            <div className={styles.location}>
                    <Image src="/location-profile.svg" alt="location" width="16" height="18" className={styles.locationImg} />
                    {user.location?.split(", ")[0] || "Lagos"}
            </div>
            <div className={styles.rating}>
                {userRating}
            </div>
            <div className={styles.info}>
                    <div className={styles.infoChild}>
                        <Image src="/divisor.svg" alt="beats sold" width="20" height="20"/>
                        <div className={styles.title}>
                            Beats Sold
                        </div>
                         {user.beats_sold}
                    </div>
                    <div className={styles.infoChild}>
                        <Image src="/upload.svg" alt="beats uploaded" width="20" height="20" />
                        <div className={styles.title}>
                            Beats Uploaded
                        </div>
                        {user.beats_uploaded}
                    </div>
                    <div className={styles.infoChild}>
                        <Image src="/mail.svg" alt="email" width="20" height="20" />
                        <div className={styles.title}>
                            Email Address
                        </div>
                        {user.email}
                    </div>
                    <div className={styles.infoChild}>
                        <Image src="/phone.svg" alt="phone number" width="20" height="20" />
                        <div className={styles.title}>
                            Phone Number
                        </div>
                        {user.phone_number || "+23480300300"}
                    </div>
            </div>
            <div className={styles.userContent}>
                <div className={`${scene == "uploaded_beats"? styles.activeUserContentChild: styles.userContentChild}` } 
                    id="uploaded_beats" 
                    onClick={handleClick}
                >
                        Uploaded Beats
                        <hr />
                </div>
                <div className={`${scene == "songs_produced"? styles.activeUserContentChild: styles.userContentChild}` }
                    id="songs_produced" 
                    onClick={handleClick}
                >
                        Songs Produced
                        <hr />
                </div>
                <div className={`${scene == "reviews"? styles.activeUserContentChild: styles.userContentChild}`} 
                    id="reviews" 
                    onClick={handleClick}>
                        Reviews
                        <hr />
                </div>
                
            </div>
            <SubScene id={user._id} scene={scene} />
        </div>
    )
}

function SubScene(props) {

    const { scene, id} = props;

    if (scene == "uploaded_beats") {
        return (
            <UploadedBeats id={id} />
        )
    } else if (scene == "songs_produced") {
        return (
            <div style={{margin: "20px"}}>Wow, Such empty!</div>
        )
    } else {
        return (
            <div style={{margin: "20px"}}>No Reviews! </div>
        )
    }
}


const genRating = (rating: number) => {
    const ratings: Array<any> = []
    for (let i: number = 0; i < rating; i++) {
        ratings.push([(
            <div className={styles.rate}>
                <Image src="/star.svg" alt="rating" height="16" width="17" />
            </div>
        )])
    }

    return ratings
}