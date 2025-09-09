"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "../../../src/lib/utils"

// ---------------- Toast Provider ----------------
const ToastProvider = ToastPrimitives.Provider

// ---------------- Toast Viewport ----------------
const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 " +
        "sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

// ---------------- Toast Variants ----------------
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between " +
    "space-x-4 overflow-hidden rounded-xl border p-4 pr-6 shadow-lg transition-all " +
    "data-[state=open]:animate-in data-[state=closed]:animate-out " +
    "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] " +
    "data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] " +
    "data-[swipe=cancel]:translate-x-0",
  {
    variants: {
      variant: {
        default:
          "border-gray-200 bg-white text-gray-900 " +
          "dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100",
        destructive:
          "border-red-500 bg-red-50 text-red-900 " +
          "dark:border-red-800 dark:bg-red-950 dark:text-red-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// ---------------- Toast Component ----------------
const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => (
  <ToastPrimitives.Root
    ref={ref}
    className={cn(toastVariants({ variant }), "transition-colors", className)}
    {...props}
  />
))
Toast.displayName = ToastPrimitives.Root.displayName

// ---------------- Toast Action ----------------
const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border " +
        "border-gray-200 bg-transparent px-3 text-sm font-medium " +
        "ring-offset-background transition-colors hover:bg-gray-100 " +
        "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 " +
        "disabled:pointer-events-none disabled:opacity-50 " +
        "dark:border-gray-700 dark:hover:bg-gray-800",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

// ---------------- Toast Close ----------------
const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-gray-500 opacity-0 " +
        "transition-opacity hover:text-gray-900 focus:opacity-100 focus:outline-none " +
        "focus:ring-2 group-hover:opacity-100 dark:text-gray-400 dark:hover:text-gray-100",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

// ---------------- Toast Title ----------------
const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

// ---------------- Toast Description ----------------
const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

// ---------------- Exports ----------------
export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
