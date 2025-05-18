import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubscriptionSlice } from "@/entities/subscription/model/useSubscriptionSlice.ts";
import { toast } from "react-toastify";
import { Button, MenuItem, TextField } from "@mui/material";
import { useCategorySlice } from "@/entities/category/model/useCategorySlice.ts";
import { Subscription } from "@/entities/subscription/model/types.ts";
import {
  EditSubscriptionFormData,
  editSubscriptionSchema,
} from "@/features/EditSubsctiptionForm/model/validation.ts";

interface EditSubscriptionFormProps {
  subscription: Subscription;
}

export const EditSubscriptionForm: FC<EditSubscriptionFormProps> = ({
  subscription,
}) => {
  const { periods, getPeriods, updateSubscription } = useSubscriptionSlice();
  const { categories, getCategories } = useCategorySlice();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EditSubscriptionFormData>({
    resolver: zodResolver(editSubscriptionSchema),
  });

  useEffect(() => {
    getCategories().catch((e) => toast.error(e.message));
    getPeriods().catch((e) => toast.error(e.message));
  }, [getCategories, getPeriods]);

  useEffect(() => {
    setValue("name", subscription.name);
    setValue("link", subscription.link);
    setValue("startDate", subscription.startDate);
    setValue("billingPeriod", subscription.billingPeriod);
    setValue("price", subscription.price);
    setValue("category", subscription.category._id);
  }, [subscription]);

  const onSubmit = (data: EditSubscriptionFormData) => {
    updateSubscription(data, subscription._id)
      .then(() => {
        toast.success("Added new subscription!");
        window.location.reload();
      })
      .catch((e) => toast.error(e.message));
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Name"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        label="Link"
        {...register("link")}
        error={!!errors.link}
        helperText={errors.link?.message}
      />
      <TextField
        label="Start Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        {...register("startDate")}
        error={!!errors.startDate}
        helperText={errors.startDate?.message}
      />
      <Controller
        name="billingPeriod"
        control={control}
        render={({ field }) => (
          <TextField
            select
            label="Billing Period"
            value={field.value || ""}
            onChange={field.onChange}
            error={!!errors.billingPeriod}
            helperText={errors.billingPeriod?.message}
          >
            {periods.map((period) => (
              <MenuItem key={period} value={period}>
                {period}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <TextField
        label="Price"
        type="number"
        {...register("price", { valueAsNumber: true })}
        error={!!errors.price}
        helperText={errors.price?.message}
      />
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <TextField
            select
            label="Category"
            defaultValue=""
            value={field.value || ""}
            onChange={field.onChange}
            error={!!errors.category}
            helperText={errors.category?.message}
          >
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Button type="submit" variant="contained">
        Edit Subscription
      </Button>
    </form>
  );
};
