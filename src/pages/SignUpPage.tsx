import { FC } from "react";
import { AuthLayout } from "@/widgets/Layouts/AuthLayout.tsx";
import { SignUpForm } from "@/features/SignUpForm/ui/SignUpForm.tsx";

export const SignUpPage: FC = () => {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
};
