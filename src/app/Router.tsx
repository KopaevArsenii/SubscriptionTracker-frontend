import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { StaticRoutes } from "@/app/AppRoutes.tsx";
import { LogInPage } from "@/pages/LogInPage.tsx";
import { SignUpPage } from "@/pages/SignUpPage.tsx";
import { CategoryPage } from "@/pages/CategoryPage.tsx";
import { useTokenSlice } from "@/shared/api/useTokenSlice.ts";
import { SubscriptionPage } from "@/pages/SubscriptionPage.tsx";

export const Router: FC = () => {
  const { isAuthenticated } = useTokenSlice();

  return (
    <Routes>
      <Route path={StaticRoutes.LogIn} element={<LogInPage />} />
      <Route path={StaticRoutes.SignUp} element={<SignUpPage />} />
      {isAuthenticated && (
        <>
          <Route
            path={StaticRoutes.Subscription}
            element={<SubscriptionPage />}
          />
          <Route path={StaticRoutes.Category} element={<CategoryPage />} />
        </>
      )}
      <Route path="*" element={<Navigate to={StaticRoutes.LogIn} />} />
    </Routes>
  );
};
