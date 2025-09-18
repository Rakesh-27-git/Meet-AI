import MeetingForm from "./meeting-form";
import { ResponsiveDialog } from "@/components/responsive-dailog";
import { MeetingGetOne } from "../../types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MeetingGetOne;
};

const UpdateMeetingDialog = ({ open, onOpenChange, initialValues }: Props) => {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Meeting"
      description="Edit the meeting details"
    >
      <MeetingForm
        onSuccess={() => {
          onOpenChange(false);
        }}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};

export default UpdateMeetingDialog;
