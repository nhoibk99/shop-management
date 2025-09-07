import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const labelVariants = cva(
  "inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold",
  {
    variants: {
      variant: {
        new: "bg-green-500 text-white",
        used: "bg-yellow-400 text-black border-2 border-white shadow-lg",
        sale: "bg-red-500 text-white",
        featured: "bg-blue-500 text-white",
        default: "bg-gray-500 text-white"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

export interface LabelProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof labelVariants> {
  children: React.ReactNode
}

const Label = ({ className, variant, children, ...props }: LabelProps) => {
  return (
    <span
      className={cn(labelVariants({ variant, className }))}
      {...props}
    >
      {children}
    </span>
  )
}

export { Label, labelVariants }
