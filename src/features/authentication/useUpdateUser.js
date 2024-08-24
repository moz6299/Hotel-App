import toast from 'react-hot-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserData } from '../../services/Auth';

export function useUpdateUserData() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: ({ fullName, avatar }) => updateUserData(fullName, avatar),
    onSuccess: () => {
      toast.success('User data updated successfully!');
      // Revalidate user data
      queryClient.invalidateQueries(['user']);
    },
    onError: (error) => {
      toast.error(`Update failed: ${error.message}`);
    },
  });

  return {
    updateUser,
    isUpdating: isLoading,
  };
}
