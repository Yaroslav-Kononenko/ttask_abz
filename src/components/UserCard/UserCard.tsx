import React from 'react';
import './../../styles/components/UserCard.scss';
import { UserDataType } from '../../react-app-env';

type Props = {
  user: UserDataType;
}

export const UserCard: React.FC<Props> = ({ user }) => (
  <div className="UserCard">
    <img src={user.photo? user.photo : './photo-cover.svg'} alt="user" className='UserCard__photo'/>
    <span className='UserCard__text' title={user.name}>{user.name}</span>
    <span className='UserCard__text'>
      <span className='UserCard__text'>{user.position}</span>
      <span className='UserCard__text' title={user.name}>{user.email}</span>
      <span className='UserCard__text'>{user.phone}</span>
    </span>
  </div>
);
