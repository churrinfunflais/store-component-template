declare module 'vtex.styleguide' {
  import { ComponentType } from 'react'

  export const Spinner: ComponentType<SpinnerProps>

  interface InputProps {
    [key: string]: any
  }
}
