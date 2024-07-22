import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Corrected import
import Navbar from '../../components/Navbar/Navbar';
import Todo from '../../components/Todo/Todo';
import axiosInstance from '../../../src/utils/axiosInstance';

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo}/>
      <Todo />
    </>
  );
};

export default Home;

