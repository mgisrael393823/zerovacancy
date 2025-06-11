
import React from 'react';
import { Button } from '../ui/button';
import { ArrowUpDown } from '@/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface SortOption {
  label: string;
  value: string;
}

interface SortMenuProps {
  options: SortOption[];
  onSort?: (value: string) => void;
  defaultValue?: string;
}

export const SortMenu: React.FC<SortMenuProps> = ({
  options,
  onSort,
  defaultValue
}) => {
  const [selected, setSelected] = React.useState(defaultValue);
  const isMobile = useIsMobile();

  const handleSelect = (value: string) => {
    setSelected(value);
    onSort?.(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size={isMobile ? "sm" : "default"}
          className={cn(
            "inline-flex items-center justify-center",
            "border-0",
            "bg-transparent hover:bg-gray-50/30",
            "text-gray-700",
            "rounded-lg",
            "transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary/10",
            isMobile ? "h-7 px-2 text-xs" : "h-9 px-3.5 text-sm"
          )}
        >
          <div className="flex items-center gap-1.5">
            <ArrowUpDown className={cn("text-gray-500 flex-shrink-0", isMobile ? "w-3 h-3" : "w-3.5 h-3.5")} />
            {isMobile ? (
              <span className="text-gray-900 font-medium">
                {options.find(opt => opt.value === selected)?.label || "Sort"}
              </span>
            ) : (
              <>
                <span className="text-gray-600 font-normal">Sort By</span>
                {selected && options.find(opt => opt.value === selected) && (
                  <>
                    <span className="text-gray-400 mx-1">•</span>
                    <span className="text-gray-900 font-medium">
                      {options.find(opt => opt.value === selected)?.label}
                    </span>
                  </>
                )}
              </>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="start" 
        className="
          w-[180px] 
          bg-white 
          shadow-lg 
          border border-gray-200/80 
          rounded-lg 
          py-1
          animate-in fade-in-0 zoom-in-95
        "
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className={`
              px-3 py-1.5
              text-sm
              cursor-pointer
              transition-colors duration-200
              ${selected === option.value 
                ? 'bg-primary/5 text-primary font-medium' 
                : 'text-gray-700 hover:bg-gray-50/80'
              }
            `}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
