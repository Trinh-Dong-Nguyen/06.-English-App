import { HTMLInputTypeAttribute } from "react"
import { Control } from "react-hook-form"
import { cn } from "@/lib/utils"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form"
import { Input } from "./Input"

interface FormGroupProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  label: string
  name: string
  placeholder?: string
  type?: HTMLInputTypeAttribute
  autoFocus?: boolean
  inputClassName?: string
  disabled?: boolean
}

export default function FormGroup({
  control,
  label,
  name,
  placeholder,
  type,
  autoFocus,
  inputClassName,
  disabled,
}: FormGroupProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="text-sm font-medium text-black">{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={type}
              className={cn(inputClassName)}
              autoFocus={autoFocus}
              disabled={disabled}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
