
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

const useBookings = () => {
  const [searchParams] = useSearchParams();
  const days = searchParams.get("last") || "7"; 

  const date = useMemo(() => {
    const computedDate = new Date();
    computedDate.setDate(computedDate.getDate() - parseInt(days, 10));
    return computedDate.toISOString();
  }, [days]); 

  return useQuery({
    queryKey: ["bookings", days],
    queryFn: () => getBookingsAfterDate(date),
    staleTime: 10 * 60 * 1000, 
    cacheTime: 15 * 60 * 1000, 
  });
};

export default useBookings;
