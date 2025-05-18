import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StaticRoutes } from "@/app/AppRoutes.tsx";
import { useAuthSlice } from "@/entities/auth/model/useAuthSlice.ts";
import { calculateYearExpense } from "@/shared/helpers/calculateYearExpense.ts";
import { useSubscriptionSlice } from "@/entities/subscription/model/useSubscriptionSlice.ts";
import { toast } from "react-toastify";

export const Header: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logOut } = useAuthSlice();
  const { subscriptions, getSubscriptions } = useSubscriptionSlice();

  useEffect(() => {
    getSubscriptions().catch((e) => toast.error(e.message));
  }, []);

  return (
    <div className="bg-gray-300 h-12 rounded-b-xl p-4 flex justify-between items-center gap-4">
      <div
        onClick={() => navigate(StaticRoutes.Subscription)}
        className={`cursor-pointer transitions-all hover:text-gray-500 ${location.pathname === StaticRoutes.Subscription && "text-blue-900"}`}
      >
        Subscriptions
      </div>
      <div
        onClick={() => navigate(StaticRoutes.Category)}
        className={`cursor-pointer transitions-all hover:text-gray-500 ${location.pathname === StaticRoutes.Category && "text-blue-900"}`}
      >
        Categories
      </div>
      <div className="flex-1" />
      <div>{`Your year expense ~${calculateYearExpense(subscriptions)}₽`}</div>
      <div
        onClick={() => logOut()}
        className="cursor-pointer transitions-all hover:text-red-500"
      >
        Log out
      </div>
    </div>
  );
};
