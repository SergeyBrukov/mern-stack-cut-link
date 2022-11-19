import axios from 'axios';
import React, { KeyboardEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const CreatePage = () => {
  const [link, setLink] = useState('');

  const navigate = useNavigate();

  const { token } = useContext(AuthContext);

  console.log(`Bearer ${token}`.split('Bearer')[1]);

  const pressHandler = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      try {
        await axios
          .post(
            '/api/link/genarate',
            { from: link },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then((res) => {
            if (res.status === 201 || 200) {
              console.log('>>>', res.data);
              navigate(`/detail/${res.data.link._id}`);
            }
          });
        // const response = await axios.post('/genarate', link);
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    console.log(event.key);
  };

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
        <input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          id="password"
          onKeyPress={pressHandler}
          className="validate"
        />
        <label htmlFor="password">Link</label>
      </div>
    </div>
  );
};

export default CreatePage;
