// useSettings.js
import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";


export function useSettings() {
  const {
    isLoading,
    error,
    data: settings = {}, // Default to an empty object if data is undefined
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isLoading, error, settings };
}
