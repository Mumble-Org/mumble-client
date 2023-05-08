import React, { useEffect, useState } from 'react';
import { backend } from '../../utils/backend';
import { Beat } from '../beat';
import { Stack } from '@mui/material';
import styles from "./uploadedBeats.module.scss";

export function UploadedBeats(props) {
  const [beats, setBeat] = useState([]);
  const { id } = props;

  useEffect(() => {
    async function fetchUserBeats() {
      const response = await backend(`/beats/getuserbeats/?id=${id}`);
      setBeat(response.data);
    }
    fetchUserBeats();
  }, []);

  return (
    <Stack className={styles.container}>
      {beats && beats.map((beat) => {
        return <Beat beat={beat} key={beat._id} />
      })}
    </Stack>
  )
}

export default UploadedBeats
