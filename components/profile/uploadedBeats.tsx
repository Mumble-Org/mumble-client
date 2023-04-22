import React, { useEffect, useState } from 'react';
import { backend } from '../../utils/backend';
import { Beat } from '../beat';

export function UploadedBeats(props) {
  const [beats, setBeat] = useState([]);
  const { id } = props;

  useEffect(() => {
    async function fetchUserBeats() {
      const response = await backend(`/beats/getuserbeats/?id=${id}`);
      setBeat(response.data);
    }
    fetchUserBeats();
  }, [])
  return (
    <div style={{margin: "20px"}}>
      {beats && beats.map((beat) => {
        return <Beat beat={beat} key={beat._id} />
      })}
    </div>
  )
}

export default UploadedBeats