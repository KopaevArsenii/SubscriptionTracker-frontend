import { FC } from "react";
import { Subscription } from "@/entities/subscription/model/types.ts";
import { formatDate } from "@/shared/helpers/formatDate.ts";
import { IconButton, Switch } from "@mui/material";
import { useSubscriptionSlice } from "@/entities/subscription/model/useSubscriptionSlice.ts";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface SubscriptionCardProps {
  subscription: Subscription;
  onEdit: () => void;
  onDelete: () => void;
}

export const SubscriptionCard: FC<SubscriptionCardProps> = ({
  subscription,
  onEdit,
  onDelete,
}) => {
  const { switchSubscription } = useSubscriptionSlice();
  const handleChange = () => {
    switchSubscription(subscription._id)
      .then(() => window.location.reload())
      .catch((e) => toast.error(e.message));
  };

  return (
    <div className="bg-blue-300 rounded-xl p-4">
      <div className="flex items-center gap-2">
        <div
          className={`h-2 w-2 rounded-full pulse ${subscription.isActive ? "bg-green-300" : "bg-red-300"}`}
        />
        <a target="_blank" href={subscription.link} className="font-bold">
          {subscription.name}
        </a>
      </div>
      <div>{subscription.category.name}</div>
      <div>{`${subscription.price}₽ - ${subscription.billingPeriod}`}</div>
      <div>{formatDate(subscription.startDate)}</div>
      <div className="flex gap-2">
        <Switch checked={subscription.isActive} onChange={handleChange} />
        <IconButton onClick={onEdit}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};
