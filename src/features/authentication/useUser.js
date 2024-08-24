import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getCurrentUserSession } from "../../services/Auth";

export function useUser() {
  const {
    data: user,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUserSession,
    onSuccess: () => {
      toast.success("User data fetched successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to fetch user data: ${error.message}`);
    },
  });

  return {
    user,
    isLoading,
    isError,
    error,
    isAuthenticated: user?.role === "authenticated",
    fullName: user?.user_metadata?.fullName, 
    avatar: user?.user_metadata?.avatar, 
  };
}
