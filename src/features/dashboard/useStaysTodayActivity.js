import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useStaysTodayActivity() {
  return useQuery({
    queryKey: ["staysTodayActivity"],
    queryFn: getStaysTodayActivity,
  });
}
