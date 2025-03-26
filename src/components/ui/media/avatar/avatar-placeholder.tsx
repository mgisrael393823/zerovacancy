import { cn } from "@/lib/utils";

interface AvatarPlaceholderProps {
  initials: string;
  className?: string;
}

export function AvatarPlaceholder({ initials, className }: AvatarPlaceholderProps) {
  return (
    <div
      className={cn(
        // Smaller on mobile, normal size on desktop
        "w-5 h-5 sm:w-6 sm:h-6",
        "rounded-full",
        "bg-[#202028]",
        "border border-white/10",
        "flex items-center justify-center",
        "text-[10px] sm:text-[12px] font-medium text-white/90",
        className
      )}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}
