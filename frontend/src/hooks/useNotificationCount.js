import { useQuery, useQueryClient } from "@tanstack/react-query";
import { countFriendRequestNotifications } from "../lib/api";

export default function useNotificationCount() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["notificationCount"],
    queryFn: countFriendRequestNotifications,
    staleTime: 1000 * 60, 
    refetchInterval: 2000, 
  });

  const mutateCount = (newCount) => {
    queryClient.setQueryData(["notificationCount"], newCount);
  };

  return {
    incomingCount: data?.count || 0,
    isLoading,
    error,
    mutateCount,
  };
}
