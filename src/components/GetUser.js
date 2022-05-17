import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase';
import { login, logout } from '../redux/user';

const GetUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(login({ id: user.uid, email: user.email }));
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return null;
};

export default GetUser;
