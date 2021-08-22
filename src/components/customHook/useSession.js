import React, { useEffect, useState } from 'react';

const useSession = () => {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
  }, []);
  return userInfo;
};

export default useSession;
