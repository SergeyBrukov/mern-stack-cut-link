import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { TLink } from '../../utils/type';

interface ILinksList {
  links: TLink[];
}

const LinkList: FC<ILinksList> = ({ links }) => {
  if (links.length === 0) return <p className="center">No links yet</p>;
  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Original</th>
          <th>Abbreviated</th>
          <th>Open</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, index) => {
          return (
            <tr key={link._id}>
              <td>{index + 1}</td>
              <td>{link.from}</td>
              <td>{link.to}</td>
              <td>
                <NavLink to={`/detail/${link._id}`}>Open</NavLink>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default LinkList;
