import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import {  updateSetting } from "../../services/apiSettings";
import Spinner from "../../ui/Spinner";
import FormRow from "../../ui/FormRow";
import toast from "react-hot-toast";
import { useSettings } from "./useSettings";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const queryClient = useQueryClient();

  const { isPending: isEditing, mutate: updateSettings } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Settings successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  if (isLoading) return <Spinner />;

  const handleBlur = (event) => {
    const { name, value } = event.target;

    const updatedSetting = {
      [name]: name === "breakfastPrice" ? parseFloat(value) : parseInt(value),
    };

    updateSettings(updatedSetting);
  };

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          name="minBookingLength"
          disabled={isEditing}
          defaultValue={minBookingLength}
          onBlur={handleBlur}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          name="maxBookingLength"
          disabled={isEditing}
          defaultValue={maxBookingLength}
          onBlur={handleBlur}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          name="maxGuestsPerBooking"
          disabled={isEditing}
          defaultValue={maxGuestsPerBooking}
          onBlur={handleBlur}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          name="breakfastPrice"
          disabled={isEditing}
          defaultValue={breakfastPrice}
          onBlur={handleBlur}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
