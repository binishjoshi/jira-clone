import { useMedia } from "react-use";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { Drawer, DrawerContent } from "./ui/drawer";

interface ResponsiveModalProps {
  children: React.ReactNode;
  open: boolean;
  title: string;
  description: string;
  onOpenChange: (open: boolean) => void;
}

export function ResponsiveModal({
  children,
  open,
  title,
  description,
  onOpenChange,
}: ResponsiveModalProps) {
  const isDesktop = useMedia("(min-width: 1024px)", true);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <VisuallyHidden.Root>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </VisuallyHidden.Root>
        <DialogContent className="w-full sm:max-w-lg p-0 border-none overflow-y-auto hide-scrollbar max-[85vh]">
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="overflow-y-auto hide-scrollbar max-[85vh]">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
