import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

// Custom hook to fetch booking
function useBooking() {
  const { id: bookingId } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    enabled: !!bookingId, // Ensure the query only runs if bookingId is defined
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
}

export default useBooking;
