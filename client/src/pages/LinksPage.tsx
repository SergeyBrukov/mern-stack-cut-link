import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import LinkList from '../components/link-list/LinkList';
import { Loader } from '../components/loader/Loader';
import { AuthContext } from '../context/AuthContext';
import { TLink } from '../utils/type';

const LinksPage = () => {
  const [links, setLinks] = useState<TLink[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useContext(AuthContext);
  useEffect(() => {
    setLoading(true);
    const fetchLinks = async () => {
      try {
        const { data } = await axios.get<TLink[]>('/api/link', {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setLinks(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLinks();
  }, []);
  if (loading) return <Loader />;
  return <LinkList links={links} />;
};

export default LinksPage;
