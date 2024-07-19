import React from 'react';
import { getInitials } from '../../utils/helper';
import { useNavigate } from 'react-router-dom';

const ProfileInfo = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/login");
  };

  return (
    <div className='flex items-center gap-3'>
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        {getInitials("Mohammed Arfa")} 
      </div>

      <div>
        <p className='text-sm font-medium'>Mohammed Arfa</p>
        <button className='text-sm text-blue-700 underline' onClick={ onLogout }>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;

