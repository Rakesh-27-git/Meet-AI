import { Dispatch, SetStateAction } from "react";

import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from "@/components/ui/command";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const DashboardCommand = ({ open, setOpen }: Props) => {
  return (
    <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Find a meeting or agent" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandResponsiveDialog>
  );
};

export default DashboardCommand;
