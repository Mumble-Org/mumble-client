import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import Image from "next/image";
import styles from './profile.module.css';

type Props = {}

export const Profile = (props: Props) => {
    const [user, setUser] = useState({
        name: "John Doe",
        email: "Johndoe@gmail.com",
        password: "",
        type: "Producer",
        genres: "",
        portfolio: "",
        location: "Lagos, Nigeria",
        calendar: "",
        phone_number: "+2348001110111",
        rating: 5,
        rate:"",
        beatsSold: 1000,
        beatsUploaded: 10,
        image: ""
	});
    // const user = useSelector((state: {}) => state.signup.user);
    const [userRating, setUserRating] = useState([]);

    useEffect(() => {
            const rating = genRating(user.rating);
            setUserRating(rating);
        }, 
    []);


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
                    {user.location}
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
                         {user.beatsSold}
                    </div>
                    <div className={styles.infoChild}>
                        <Image src="/upload.svg" alt="beats uploaded" width="20" height="20" />
                        <div className={styles.title}>
                            Beats Uploaded
                        </div>
                        {user.beatsUploaded}
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
                        {user.phone_number}
                    </div>
            </div>
            <div className={styles.userContent}>
                <div className={styles.activeUserContentChild}>
                        Uploaded Beats
                        <hr className={styles.active} />
                </div>
                <div className={styles.userContentChild}>
                        Songs Produced
                        <hr className={styles.inactive} />
                </div>
                <div className={styles.userContentChild}>
                        Reviews
                        <hr className={styles.inactive} />
                </div>
            </div>
        </div>
    )
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