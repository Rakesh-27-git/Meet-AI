import { ResponsiveDialog } from "@/components/responsive-dailog";
import AgentForm from "./agent-form";
import { AgentGetOne } from "../../types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: AgentGetOne;
};

const UpdateAgentDialog = ({ open, onOpenChange, initialValues }: Props) => {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Update Agent"
      description="Update the agent's information"
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};

export default UpdateAgentDialog;
