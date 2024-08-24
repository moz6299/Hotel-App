import { addDays, subDays } from "date-fns"; 
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

const useStaysAfterDate = () => {
  const [searchParams] = useSearchParams();
  const days = parseInt(searchParams.get("last")) || 7; 
  const startDate = subDays(new Date(), days).toISOString().split('T')[0];

  return useQuery({
    queryKey: ["staysAfterDate", days],
    queryFn: () => getStaysAfterDate(startDate),
    staleTime: 10 * 60 * 1000, 
    cacheTime: 15 * 60 * 1000, 
  });
};

export default useStaysAfterDate;
