import { useRouter } from "next/navigation";

import MeetingForm from "./meeting-form";
import { ResponsiveDialog } from "@/components/responsive-dailog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const NewMeetingDialog = ({ open, onOpenChange }: Props) => {
  const router = useRouter();
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="New Meeting"
      description="Create a new meeting"
    >
      <MeetingForm
        onSuccess={(id) => {
          onOpenChange(false);
          router.push(`/meetings/${id}`);
        }}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};

export default NewMeetingDialog;
