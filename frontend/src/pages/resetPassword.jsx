// src/pages/ResetPasswordPage.jsx
import React, { useEffect } from 'react';
import ResetPassword from '../components/Login/resetPassword';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/resetPassword');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      
      <ResetPassword />
      
    </div>
  );
};

export default ResetPasswordPage;
