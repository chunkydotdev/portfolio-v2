import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center border px-2 py-0.5 text-xs w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:ring-[2px] focus-visible:ring-black/20 transition-[color,box-shadow] overflow-hidden tracking-wider",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-black text-white [a&]:hover:bg-black/80",
        secondary:
          "border-transparent bg-black/5 text-black/70 [a&]:hover:bg-black/10",
        destructive:
          "border-transparent bg-black text-white [a&]:hover:bg-black/80",
        outline:
          "text-black/60 border-black/15 [a&]:hover:bg-black/5 [a&]:hover:text-black",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
