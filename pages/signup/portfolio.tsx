import styles from '../../styles/signup/details.module.css';
import { ActiveCarousel, InactiveCarousel } from '../../components/carousels';
import Image from 'next/image';

// redux
import { set } from '../../redux/actions/signup';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { Back } from '../../components/back';
import { ActiveContinue } from '../../components/continue';

function SongLink() {
  return (
    <div className={styles.link_container}>
      <label htmlFor='input' className={styles.link_label}>Song link</label>
      <div className={styles.link_input_div}>
        <input className={styles.link_input} name='input' placeholder='Add a link'></input>
        {/* <Image
          src='/bin.svg'
          alt='delete link'
          width='16'
          height='18'
        /> */}
      </div>
    </div>
  );
}

function SongLinkDelete(props) {
  const handleDelete = (e) => {
    e.preventDefault();
    // e.target.parentElement.parentElement.firstChild.value = '';

    const temp = props.links;
    console.log(props.id);
    props.setLinks(temp.filter(link => link !== props.id));
    console.log(temp);
  }

  return (
    <div className={styles.link_container} id={props.id}>
      <label htmlFor='input' className={styles.link_label}>Song link</label>
      
      <div className={styles.link_input_div}>
        <input className={styles.link_input} name='input' placeholder='Add a link'></input>
        
        <div className={styles.link_button} onClick={handleDelete}>
          <Image
            src='/bin.svg'
            alt='delete link'
            width='16'
            height='18'
          />
        </div>
      </div>
    </div>
  );
}

export default function Type() {
  const dispatch = useDispatch();
  const [links, setLinks] = useState([
    'link',
    'link',
    'link',
  ]);

  useEffect(() => {}, [links]);

  const addLink = () => {
    const id = Date.now().toString();
    setLinks([...links, id]);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Connect your past work</h1>

      <div className={styles.carousel}>
		    <InactiveCarousel />
	      <InactiveCarousel />
        <ActiveCarousel />
        <InactiveCarousel />
        <InactiveCarousel/>
      </div>

      <h2 className={styles.portfolio_subheader}>If you have any songs you produced on digital platforms we advice that you connect the songs to be displayed on your account by adding the apple music links for each song in the fields below. </h2>

      <div className={styles.links_container}>
        {links.map(type => {
          if (type === 'link') {
            return <SongLink />;
          } else {
            return <SongLinkDelete id={type} links={links} setLinks={setLinks} />
          }
        })}
      </div>

      <div className={styles.add_link} onClick={addLink}>
        <Image
          src='/add.svg'
          alt='add link'
          width='14'
          height='14'
        />
        <p>Add Another Link</p>
      </div>

      <div className={styles.next_page}>
        <Back href='/signup/type' />
        <ActiveContinue href=''/>
      </div>

    </div>
  );
}
