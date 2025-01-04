'use client';

import { interviewReview, userInterview } from "@/actions";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";

export const useUserDetail = () => {
  const { data: session } = useSession();

  const { isLoading, data } = useQuery({
    queryFn: async () => {
      if (session?.user?.id) {
        return await userInterview(session?.user?.id);
      }
      return null;
    },
    queryKey: ['user-interviews'],
    enabled: !!session?.user?.id,
  });
  return { isLoading, data };
};

export const useReview = (id : string) => {
  
  const { data: session } = useSession();

  const { isLoading, data } = useQuery({
    queryFn: async () => {
      if (session?.user?.id) {
        return await interviewReview(id);
      }
      return null;
    },
    queryKey: ['interview-review'],
    enabled: !!session?.user?.id,
  });

  return { isLoading, data };
}