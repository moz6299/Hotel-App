// useSignUp.js

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/Auth"; // تأكد من وجود هذه الدالة في الخدمة الخاصة بك

export function useSignUp() {
  const navigate = useNavigate();

  const { mutate: signUpMutation, isLoading } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signUp(email, password, fullName),
    onSuccess: () => {
      toast.success(
        "Sign-up successful! Please Verify your account from your Email address"
      );
    },
    onError: (error) => {
      toast.error(`Sign-up failed: ${error.message}`);
    },
  });

  return {
    signUpUser: signUpMutation,
    isSigningUp: isLoading,
  };
}
