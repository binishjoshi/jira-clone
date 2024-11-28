import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface MemberAvatarProps {
  name: string;
  className?: string;
  fallbackClassName?: string;
}

export function MemberAvatar({
  name,
  className,
  fallbackClassName,
}: MemberAvatarProps) {
  return (
    <Avatar
      className={cn(
        "size-5 transition border-neutral-300 rounded-full",
        className
      )}
    >
      <AvatarFallback
        className={cn(
          "bg-neutral-200 font-medium flex items-center justify-center",
          fallbackClassName
        )}
      >
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
