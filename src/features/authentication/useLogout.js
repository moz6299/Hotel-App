import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/Auth";
import toast from "react-hot-toast";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logoutMutation, isLoading } = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      toast.success('Logout successful!');
      queryClient.invalidateQueries(['user']); // Invalidate user data query
      queryClient.removeQueries(['user']); // Optionally remove user data query
      navigate('/login' , { replace: true }); // Navigate to the login page after successful logout
    },
    onError: (error) => {
      toast.error(`Logout failed: ${error.message}`);
    },
  });

  return {
    logoutUser: logoutMutation,
    isLoggingOut: isLoading,
  };
}
