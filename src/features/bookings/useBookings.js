import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../../utils/globalConsts";

// Custom hook to fetch bookings
function useBookings() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") || "all";
  const sort = searchParams.get("sort") || "";
  const page = parseInt(searchParams.get("page")) || 1;
  const itemsPerPage = ITEMS_PER_PAGE;

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["bookings", status, sort, page, itemsPerPage],
    queryFn: () => getBookings(status, sort, page, itemsPerPage),
  });

  // Prefetch the next and previous pages
  prefetchPages(queryClient, status, sort, page, itemsPerPage, data?.total);

  return {
    data,
    isLoading,
    isError,
    error,
  };
}

// Function to prefetch pages
function prefetchPages(queryClient, status, sort, page, itemsPerPage, total) {
  const totalPages = Math.ceil(total / itemsPerPage);

  // Prefetch next page if it exists
  if (page < totalPages) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", status, sort, page + 1, itemsPerPage],
      queryFn: () => getBookings(status, sort, page + 1, itemsPerPage),
    });
  }
  
  // Prefetch previous page if it's not the first page
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", status, sort, page - 1, itemsPerPage],
      queryFn: () => getBookings(status, sort, page - 1, itemsPerPage),
    });
  }
}

export default useBookings;
