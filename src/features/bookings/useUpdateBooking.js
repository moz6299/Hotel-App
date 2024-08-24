// useUpdateBooking.js

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useUpdateBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: updateBookingMutation, isLoading } = useMutation({
    mutationFn: ({ bookingId, updates }) => updateBooking(bookingId, updates),
    onSuccess: (data, { shouldNavigate = true }) => {
      toast.success(`Booking successfully ${data.status}`);
      queryClient.invalidateQueries(["booking"]); 

      // التحكم في التنقل بعد التحديث بناءً على shouldNavigate
      if (shouldNavigate) {
        navigate(-1);
      }
    },
    onError: (error) => {
      toast.error(`Failed to update booking: ${error.message}`);
    },
  });

  return {
    updatingBooking: updateBookingMutation,
    isUpdating: isLoading,
  };
}

