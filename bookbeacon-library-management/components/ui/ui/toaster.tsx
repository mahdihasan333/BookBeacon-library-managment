"use client"

import * as React from "react"
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose } from "./toast"
// import { useToast } from 'components/ui/hooks/use-toast';
import { useToast } from '../../../src/components/hooks/use-toast';

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, ...props }) => (
        <Toast
          key={id}
          {...props}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg"
        >
          <div className="flex flex-col space-y-1 pr-8">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}
