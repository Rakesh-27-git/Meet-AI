"use client";

import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import MeetingsIdViewHeader from "../components/meetings-id-view-header";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useConfirm } from "../../hooks/use-confirm";
import { useState } from "react";
import UpdateMeetingDialog from "../components/update-meeting-dialog copy";
import { UpcomingState } from "../components/upcoming-state";
import { ActivegState } from "../components/active-state";
import { CancelledState } from "../components/cancelled-state";
import { ProcessingState } from "../components/processing-state";

type Props = {
  meetingId: string;
};

export const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({
      id: meetingId,
    })
  );

  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );
        router.push("/meetings");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const [RemoveConfirmation, ConfirmRemove] = useConfirm(
    "Are you sure?",
    `The following action will remove this meeting.`
  );

  const handleRemoveMeeting = async () => {
    const ok = await ConfirmRemove();

    if (!ok) return;

    await removeMeeting.mutateAsync({ id: meetingId });
  };

  const isActive = data.status === "active";
  const isUpcoming = data.status === "upcoming";
  const isCancelled = data.status === "cancelled";
  const isCompleted = data.status === "completed";
  const isProcessing = data.status === "processing";

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={updateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <MeetingsIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setUpdateMeetingDialogOpen(true)}
          onRemove={handleRemoveMeeting}
        />
        {isCancelled && <CancelledState />}
        {isCompleted && <div>Completed </div>}
        {isProcessing && <ProcessingState />}
        {isActive && <ActivegState meetingId={meetingId} />}
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            onCancelMeeting={handleRemoveMeeting}
            isCanceling={false}
          />
        )}
      </div>
    </>
  );
};

export const MeetingsIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meeting"
      description="Please wait while we load the meeting."
    />
  );
};

export const MeetingsIdViewError = () => {
  return (
    <ErrorState
      title="Error Loading Meeting"
      description="There was an error loading the meeting."
    />
  );
};
