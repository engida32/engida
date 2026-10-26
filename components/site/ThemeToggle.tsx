"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ThemeToggle({ showTooltip = true }: { showTooltip?: boolean }) {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const isDark = mounted && resolvedTheme === "dark";
  const control = (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Dark theme"
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {mounted ? (
        isDark ? (
          <Moon aria-hidden="true" />
        ) : (
          <Sun aria-hidden="true" />
        )
      ) : (
        <Sun aria-hidden="true" className="opacity-0" />
      )}
    </Button>
  );

  if (!showTooltip) return control;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{control}</TooltipTrigger>
        <TooltipContent>{isDark ? "Switch to light" : "Switch to dark"}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
