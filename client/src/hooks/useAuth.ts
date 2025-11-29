import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
    staleTime: 0,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const response = await fetch("/api/auth/user-profile", {
        credentials: "include"
      });
      
      if (response.status === 401) {
        return null; // Return null for unauthorized users
      }
      
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      
      return response.json();
    }
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user && !error,
  };
}