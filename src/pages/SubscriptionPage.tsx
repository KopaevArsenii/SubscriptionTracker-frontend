import { FC, useEffect, useState } from "react";
import { Layout } from "@/widgets/Layouts/Layout.tsx";
import { useSubscriptionSlice } from "@/entities/subscription/model/useSubscriptionSlice.ts";
import { AppModal } from "@/shared/components/AppModal.tsx";
import { Button, MenuItem, TextField } from "@mui/material";
import { CreateSubscriptionForm } from "@/features/CreateSubscriptionForm/ui/CreateSubscriptionForm.tsx";
import { SubscriptionCard } from "@/entities/subscription/ui/SubscriptionCard.tsx";
import CloseIcon from "@mui/icons-material/Close";
import { Subscription } from "@/entities/subscription/model/types.ts";
import { toast } from "react-toastify";
import { EditSubscriptionForm } from "@/features/EditSubsctiptionForm/ui/EditSubscriptionForm.tsx";
import { DeleteSubscriptionConfirmation } from "@/features/DeleteSubscriptionConfirmation/ui/DeleteSubscriotionConfirmation.tsx";

export const SubscriptionPage: FC = () => {
  const { periods, subscriptions, getPeriods, getSubscriptions } =
    useSubscriptionSlice();
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedSubscription, setSelectedSubscription] =
    useState<Subscription | null>(null);
  const [search, setSearch] = useState("");
  const [filterPeriod, setFilterPeriod] = useState("");

  const handleClearFilter = () => {
    setSearch("");
    setFilterPeriod("");
  };
  const openCreateModal = () => setCreateModal(true);
  const closeCreateModal = () => setCreateModal(false);
  const openEditModal = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setEditModal(true);
  };
  const closeEditModal = () => {
    setSelectedSubscription(null);
    setEditModal(false);
  };
  const openDeleteModal = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setSelectedSubscription(null);
    setDeleteModal(false);
  };

  useEffect(() => {
    getSubscriptions().catch((e) => toast.error(e.message));
    getPeriods().catch((e) => toast.error(e.message));
  }, [getSubscriptions]);

  return (
    <Layout>
      <AppModal open={createModal} onClose={closeCreateModal}>
        <h2 className="text-xl font-semibold mb-4">Create Subscription</h2>
        <CreateSubscriptionForm />
      </AppModal>
      <AppModal open={editModal} onClose={closeEditModal}>
        <h2 className="text-xl font-semibold mb-4">Edit Subscription</h2>
        <EditSubscriptionForm
          subscription={selectedSubscription as Subscription}
        />
      </AppModal>
      <AppModal open={deleteModal} onClose={closeDeleteModal}>
        <h2 className="text-xl font-semibold mb-4">Delete Subscription</h2>
        <DeleteSubscriptionConfirmation
          onClose={closeDeleteModal}
          subscription={selectedSubscription as Subscription}
        />
      </AppModal>
      <div className="flex justify-between items-center gap-2 p-4">
        <TextField
          style={{ width: "150px" }}
          value={search}
          label="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <TextField
          style={{ width: "150px" }}
          select
          label="Period"
          value={filterPeriod}
          onChange={(e) => setFilterPeriod(e.target.value)}
        >
          {periods.map((period) => (
            <MenuItem key={period} value={period}>
              {period}
            </MenuItem>
          ))}
        </TextField>
        <CloseIcon onClick={handleClearFilter} />
        <div className="flex-1" />
        <Button onClick={openCreateModal}>Create</Button>
      </div>
      <div className="flex grid grid-cols-2 gap-4 p-4">
        {subscriptions
          .filter((subscription) =>
            subscription.name.toLowerCase().includes(search.toLowerCase()),
          )
          .filter((subscription) => {
            if (filterPeriod) {
              return subscription.billingPeriod === filterPeriod;
            }
            return true;
          })
          .map((subscription) => (
            <SubscriptionCard
              onEdit={() => openEditModal(subscription)}
              onDelete={() => openDeleteModal(subscription)}
              key={subscription._id}
              subscription={subscription}
            />
          ))}
      </div>
    </Layout>
  );
};
