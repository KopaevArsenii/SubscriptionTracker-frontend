import { FC } from "react";
import { Subscription } from "@/entities/subscription/model/types.ts";
import { useSubscriptionSlice } from "@/entities/subscription/model/useSubscriptionSlice.ts";
import { toast } from "react-toastify";
import { Button } from "@mui/material";

interface DeleteSubscriptionConfirmation {
  onClose: () => void;
  subscription: Subscription;
}

export const DeleteSubscriptionConfirmation: FC<
  DeleteSubscriptionConfirmation
> = ({ onClose, subscription }) => {
  const { deleteSubscription } = useSubscriptionSlice();

  const handleYes = () => {
    deleteSubscription(subscription._id)
      .then(() => window.location.reload())
      .catch((e) => toast.error(e.message));
  };

  return (
    <div className="flex flex-col gap-4">
      <div>Are you sure you want delete this subscription?</div>
      <div className="flex justify-between">
        <Button variant="text" onClick={onClose}>
          No
        </Button>
        <Button variant="text" onClick={handleYes}>
          Yes
        </Button>
      </div>
    </div>
  );
};
