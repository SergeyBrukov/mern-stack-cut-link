import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import LinkCard from '../components/linkCard/LinkCard';
import { Loader } from '../components/loader/Loader';
import { AuthContext } from '../context/AuthContext';
import { TLink } from '../utils/type';

const DetailPage = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [detailLink, setDetailLink] = useState<TLink>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchDetail = async () => {
      try {
        const { data } = await axios.get<TLink>(`/api/link/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setDetailLink(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, []);
  console.log(detailLink);

  if (loading) return <Loader />;

  return <LinkCard link={detailLink as TLink} />;
};

export default DetailPage;
