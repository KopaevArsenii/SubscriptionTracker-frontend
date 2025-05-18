import { FC } from "react";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAuthSlice } from "@/entities/auth/model/useAuthSlice.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SignUpFormData,
  signUpSchema,
} from "@/features/SignUpForm/model/validation.ts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { StaticRoutes } from "@/app/AppRoutes.tsx";

export const SignUpForm: FC = () => {
  const navigate = useNavigate();
  const { signUp } = useAuthSlice();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpFormData) => {
    signUp(data)
      .then(() => {
        toast.success("Successfully registered!");
        navigate(StaticRoutes.LogIn);
      })
      .catch((e) => toast.error(e.message));
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("username")}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
      </div>
      <div>
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
      </div>
      <div>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
      </div>
      <a
        onClick={() => navigate(StaticRoutes.LogIn)}
        className="text-sm text-center cursor-pointer"
      >
        Already have an account? Log in!
      </a>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Sign up
      </Button>
    </form>
  );
};
