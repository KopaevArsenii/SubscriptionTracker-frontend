import { FC } from "react";
import { useForm } from "react-hook-form";
import {
  LogInFormData,
  logInSchema,
} from "@/features/LogInForm/model/validation.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { useAuthSlice } from "@/entities/auth/model/useAuthSlice.ts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { StaticRoutes } from "@/app/AppRoutes.tsx";

export const LoginForm: FC = () => {
  const navigate = useNavigate();
  const { logIn } = useAuthSlice();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInFormData>({
    resolver: zodResolver(logInSchema),
  });

  const onSubmit = (data: LogInFormData) => {
    logIn(data)
      .then(() => {
        toast.success("Successfully logged in!");
        navigate(StaticRoutes.Subscription);
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
      <a
        onClick={() => navigate(StaticRoutes.SignUp)}
        className="text-sm text-center cursor-pointer"
      >
        Don't have an account? Register!
      </a>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Login
      </Button>
    </form>
  );
};
