import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updatePassword } from '../../services/Auth';


export function useUpdatePassword(resetForm) {
  const { mutate: updatePasswordMutation, isLoading } = useMutation({
    mutationFn: (newPassword) => updatePassword(newPassword),
    onSuccess: () => {
      toast.success('Password updated successfully!');
      if (resetForm) {
        resetForm(); // إعادة تعيين الفورم بعد نجاح العملية
      }
    },
    onError: (error) => {
      toast.error(`Password update failed: ${error.message}`);
    },
  });

  return {
    updatePassword: updatePasswordMutation,
    isUpdating: isLoading,
  };
}
