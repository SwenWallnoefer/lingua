import { Text as RNText, type TextProps as RNTextProps } from 'react-native'

const variants = {
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
  h4: 'text-h4',
  bodyLg: 'text-body-lg',
  bodyMd: 'text-body-md',
  bodySm: 'text-body-sm',
  caption: 'text-caption',
} as const

const tones = {
  primary: 'text-ink',
  secondary: 'text-ink-secondary',
  brand: 'text-primary',
  inverse: 'text-background',
} as const

export type TextProps = RNTextProps & {
  variant?: keyof typeof variants
  tone?: keyof typeof tones
  className?: string
}

/** Themed text: variant sets the Poppins family/size/line-height, tone sets the color. */
export function Text({ variant = 'bodyMd', tone = 'primary', className, ...props }: TextProps) {
  const classes = [variants[variant], tones[tone], className].filter(Boolean).join(' ')
  return <RNText className={classes} {...props} />
}
