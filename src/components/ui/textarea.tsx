import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-black/15 placeholder:text-black/30 focus-visible:border-black focus-visible:ring-black/10 flex field-sizing-content min-h-16 w-full border bg-transparent px-3 py-2 text-base shadow-none transition-[color,box-shadow] outline-none focus-visible:ring-[2px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
