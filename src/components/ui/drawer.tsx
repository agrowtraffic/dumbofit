"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"
import { Tooltip, type TooltipProps } from "recharts"

import { cn } from "@/lib/utils"

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
)
Drawer.displayName = "Drawer"

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
))
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

// Components for Charts
type ChartContainerProps = React.ComponentProps<"div"> & {
  config: ChartConfig
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  ChartContainerProps
>(({ config, className, children, ...props }, ref) => {
  const id = React.useId()
  const style = React.useMemo(() => {
    return Object.entries(config).map(([key, value]) => {
      return value.color ? `.${id} .recharts-bar-${key} { fill: ${value.color}; }` : ""
    }).join("\n")
  }, [config, id])

  return (
    <div
      ref={ref}
      className={cn(id, "flex w-full items-center justify-center", className)}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: style }} />
      {children}
    </div>
  )
})
ChartContainer.displayName = "ChartContainer"

const ChartStyle = ({
  className,
  ...props
}: React.ComponentProps<"style">) => (
  <style
    dangerouslySetInnerHTML={{
      __html: `
        :root {
          --chart-primary: hsl(var(--primary));
          --chart-secondary: hsl(var(--secondary));
          --chart-accent: hsl(var(--accent));
          --chart-muted: hsl(var(--muted));
          --chart-background: hsl(var(--background));
          --chart-foreground: hsl(var(--foreground));
          --chart-border: hsl(var(--border));
          --chart-input: hsl(var(--input));
          --chart-ring: hsl(var(--ring));
        }
      `,
    }}
    {...props}
  />
)
ChartStyle.displayName = "ChartStyle"

const ChartLegend = ({
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    className={cn("flex items-center justify-end gap-4", className)}
    {...props}
  />
)
ChartLegend.displayName = "ChartLegend"

const ChartLegendContent = ({
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    className={cn(
      "flex items-center gap-2 text-sm text-muted-foreground",
      className
    )}
    {...props}
  />
)
ChartLegendContent.displayName = "ChartLegendContent"

const ChartTooltip = Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  TooltipProps<any, any> & React.ComponentProps<"div">
>(({ active, payload, label, className }, ref) => {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn(
        "grid min-w-[8rem] items-start gap-1.5 rounded-lg border bg-background p-2.5 text-sm shadow-xl",
        className
      )}
    >
      <div className="font-medium">{label}</div>
      <div className="grid gap-1.5">
        {payload.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2"
          >
            <div className="flex flex-col">
              <span className="font-medium text-muted-foreground">{item.name}</span>
              <span className="font-bold">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"

type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode
    color?: string
    icon?: React.ComponentType
  }
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  ChartContainer,
  ChartStyle,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
}
export type { ChartConfig }