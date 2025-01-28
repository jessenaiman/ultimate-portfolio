import * as React from "react"
import { forwardRef } from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'ghost' | 'link' | 'outline' | 'error';
  size?: 'lg' | 'md' | 'sm' | 'xs';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'md', ...props }, ref) => {
    const baseClass = 'btn'
    const variantClass = variant !== 'default' ? `btn-${variant}` : ''
    const sizeClass = size !== 'md' ? `btn-${size}` : ''
    
    const classes = [
      baseClass,
      variantClass,
      sizeClass,
      className
    ].filter(Boolean).join(' ')

    return (
      <button
        className={classes}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }