import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const { mutate: deletingBooking, isLoading: isDeleting } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success("Successfully deleted");
      queryClient.invalidateQueries(["booking"]); 
      navigate(-1)
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deletingBooking, isDeleting };
}
