import * as React from "react"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'accent';
  bordered?: boolean;
  compact?: boolean;
  imageUrl?: string;
  imageAlt?: string;
  title?: string;
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', bordered = true, compact = false, imageUrl, imageAlt, title, children, ...props }, ref) => {
    const baseClass = 'card'
    const variantClass = variant !== 'default' ? `card-${variant}` : ''
    const borderClass = bordered ? 'card-bordered' : ''
    const compactClass = compact ? 'card-compact' : ''
    
    const classes = [
      baseClass,
      variantClass,
      borderClass,
      compactClass,
      'bg-base-100',
      'shadow-xl',
      className
    ].filter(Boolean).join(' ')

    return (
      <div className={classes} ref={ref} {...props}>
        {imageUrl && (
          <figure>
            <img src={imageUrl} alt={imageAlt || ''} />
          </figure>
        )}
        <div className="card-body">
          {title && <h2 className="card-title">{title}</h2>}
          {children}
        </div>
      </div>
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className,  ...props }, ref) => (
  <div className={className} ref={ref} {...props} />
)
)
CardHeader.displayName = "CardHeader"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className,  ...props }, ref) => (
  <div className={className} ref={ref} {...props} />
)
)
CardContent.displayName = "CardContent"

export { Card, CardHeader, CardContent }