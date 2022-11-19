import React, { FC } from 'react';
import { TLink } from '../../utils/type';

interface iLinkCard {
  link: TLink;
}

const LinkCard: FC<iLinkCard> = ({ link }) => {
  console.log(link);

  return (
    <>
      <h2>Link</h2>
      <p>
        Your link:
        <a href={link?.to} target="_blank" rel="noopener noreferrer">
          {link?.to}
        </a>
      </p>
      <p>
        From:
        <a href={link?.from} target="_blank" rel="noopener noreferrer">
          {link?.from}
        </a>
      </p>
      <p>
        Count click on link: <strong>{link?.clicks}</strong>
      </p>
      <p>
        Create date: <strong>{new Date(link?.date).toLocaleDateString()}</strong>
      </p>
    </>
  );
};

export default LinkCard;
