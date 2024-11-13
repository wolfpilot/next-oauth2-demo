// Types
import { Props } from "./types"

// Styles
import React from "react"
import styles from "./Button.module.css"

const Button = ({
  children,
  className,
  variant = "primary",
  ...rest
}: Props) => (
  <button
    className={`
      ${styles.wrapper}
      ${className}
      ${variant === "primary" ? styles.wrapperPrimary : styles.wrapperSecondary}
    `}
    {...rest}
  >
    {children}
  </button>
)

export default Button
