import React from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { useNavigate } from "react-router-dom"

const Navbar = ( { userInfo } ) => {
  return (
    <div className='bg-white bg-opacity-75 flex items-center justify-between px-6 py-2 drop-shadow'>
        <h2 className='text-xl font-medium text-black py-2'>To-Do</h2>

        <ProfileInfo userInfo={userInfo} />
    </div>
  );
};

export default Navbar
