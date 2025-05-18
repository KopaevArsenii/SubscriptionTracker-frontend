import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateSubscriptionFormData,
  createSubscriptionSchema,
} from "@/features/CreateSubscriptionForm/model/validation.ts";
import { useSubscriptionSlice } from "@/entities/subscription/model/useSubscriptionSlice.ts";
import { toast } from "react-toastify";
import { Button, MenuItem, TextField } from "@mui/material";
import { useCategorySlice } from "@/entities/category/model/useCategorySlice.ts";
import { useEffect } from "react";

export const CreateSubscriptionForm: FC = () => {
  const { periods, getPeriods, createSubscription } = useSubscriptionSlice();
  const { categories, getCategories } = useCategorySlice();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSubscriptionFormData>({
    resolver: zodResolver(createSubscriptionSchema),
  });

  useEffect(() => {
    getCategories().catch((e) => toast.error(e.message));
    getPeriods().catch((e) => toast.error(e.message));
  }, [getCategories]);

  const onSubmit = (data: CreateSubscriptionFormData) => {
    createSubscription(data)
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
      <TextField
        select
        label="Billing Period"
        {...register("billingPeriod")}
        error={!!errors.billingPeriod}
        helperText={errors.billingPeriod?.message}
      >
        {periods.map((period) => (
          <MenuItem key={period} value={period}>
            {period}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Price"
        type="number"
        {...register("price", { valueAsNumber: true })}
        error={!!errors.price}
        helperText={errors.price?.message}
      />
      <TextField
        select
        label="Category"
        defaultValue=""
        {...register("category")}
        error={!!errors.category}
        helperText={errors.category?.message}
      >
        {categories.map((category) => (
          <MenuItem key={category._id} value={category._id}>
            {category.name}
          </MenuItem>
        ))}
      </TextField>

      <Button type="submit" variant="contained">
        Create Subscription
      </Button>
    </form>
  );
};
