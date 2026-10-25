"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(timeout.current);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.clearTimeout(timeout.current);
      timeout.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={copy}
            aria-label="Copy email address"
            className="h-10 px-3 font-mono text-xs uppercase tracking-[0.08em]"
          >
            {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
            <span className="hidden sm:inline">Copy email</span>
            <span className="sm:hidden">Copy</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Copy email address</TooltipContent>
      </Tooltip>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Copied" : ""}
      </span>
    </TooltipProvider>
  );
}
