import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [error, setError] = useState('');

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const validatePassword = (password) => {
    const minLength = 6;
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
    
    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long.`;
    }
    if (!specialCharPattern.test(password)) {
      return 'Password must contain at least one special character.';
    }
    return '';
  };

  const handleChange = (e) => {
    const password = e.target.value;
    const errorMessage = validatePassword(password);
    setError(errorMessage);
    onChange(e);
  };

  return (
    <div className='flex flex-col'>
      <div className='flex items-center bg-opacity-0 border-[1.5px] px-5 rounded mb-3'>
        <input
          value={value}
          onChange={handleChange}
          type={isShowPassword ? "text" : "password"}
          placeholder={placeholder || "Password"}
          className='w-full text-sm bg-opacity-0 py-3 mr-3 rounded outline-none' 
        />
        {isShowPassword ? (
          <FaRegEye 
            size={22}
            className="text-primary cursor-pointer"
            onClick={toggleShowPassword}
          />
        ) : (
          <FaRegEyeSlash
            size={22}
            className="text-slate-400 cursor-pointer"
            onClick={toggleShowPassword}
          />
        )}
      </div>
      {error && <p className='text-red-500 text-sm'>{error}</p>}
    </div>
  );
};

export default PasswordInput;


