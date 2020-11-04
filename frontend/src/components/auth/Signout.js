import React, { useEffect } from 'react';
import { signout } from '../../api';

export default function Signout({ history }) {
  useEffect(() => {
    signout();
    history.push('/signin');
  });

  return (
    <div></div>
  );
}
