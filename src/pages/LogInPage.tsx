import { FC } from "react";
import { LoginForm } from "@/features/LogInForm/ui/LoginForm.tsx";
import { AuthLayout } from "@/widgets/Layouts/AuthLayout.tsx";

export const LogInPage: FC = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};
