import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin, updateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({ defaultValues: isEditSession ? editValues : {} });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: isEditSession ? updateCabin : createCabin,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["cabins"]);
      toast.success(
        isEditSession ? "Successfully Edited" : "Successfully Added"
      );
      reset(isEditSession ? data : undefined);
      onCloseModal?.()
    },
    onError: (error) => {
      toast.error(error.message, "error");
    },
  });

  function onSubmit(data) {
    const file = data.image?.[0];
    if (!file) {
      throw new Error("No image file selected");
    }
    const args = { ...data, image: file };
    if (isEditSession) args.id = editId;
    mutate(args);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? "modal" : "regular" } >
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          disabled={isPending}
          {...register("name", { required: "Cabin name is required" })}
        />
        {errors.name && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          min="1"
          id="maxCapacity"
          disabled={isPending}
          {...register("maxCapacity", {
            required: "Maximum capacity is required",
            min: {
              value: 1,
              message: "Maximum capacity must be greater than 0",
            },
          })}
        />
        {errors.maxCapacity && <Error>{errors.maxCapacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          min="1"
          disabled={isPending}
          id="regularPrice"
          {...register("regularPrice", {
            required: "Regular price is required",
            min: { value: 1, message: "Regular price must be greater than 0" },
          })}
        />
        {errors.regularPrice && <Error>{errors.regularPrice.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          disabled={isPending}
          defaultValue={0}
          min="0"
          {...register("discount", {
            required: "Discount is required",
            min: { value: 0, message: "Discount cannot be negative" },
            validate: (value) => {
              const discountValue = parseFloat(value);
              const regularPriceValue = parseFloat(getValues("regularPrice"));
              return (
                discountValue <= regularPriceValue ||
                "Discount cannot be higher than regular price"
              );
            },
          })}
        />
        {errors.discount && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          disabled={isPending}
          defaultValue=""
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && <Error>{errors.description.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditSession ? false : "Image is required",
          })}
        />

        {errors.image && <Error>{errors.image.message}</Error>}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={()=>onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isPending}>
          {isEditSession ? "Edit Cabin" : "Add New Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
