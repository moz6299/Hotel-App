// useLogin.js

import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/Auth';

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: loginMutation, isLoading } = useMutation({
    mutationFn: ({ email, password }) => login(email, password),
    onSuccess: () => {
      toast.success('Login successful!');
     navigate('/dashboard' , { replace: true }); // Navigate to the dashboard or any other page after login
    },
    onError: (error) => {
      toast.error(`Login failed: ${error.message}`);
    },
  });

  return {
    loginUser: loginMutation,
    isLoggingIn: isLoading,
  };
}

