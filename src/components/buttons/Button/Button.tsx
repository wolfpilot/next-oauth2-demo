"use client"

// Types
import { Props } from "./types"

// Styles
import React from "react"
import styles from "./Button.module.css"

const Button = ({
  children,
  className = "",
  variant = "primary",
  ...rest
}: Props) => (
  <button
    className={`
      ${variant === "primary" ? styles.wrapperPrimary : styles.wrapperSecondary}
      ${className}
    `}
    {...rest}
  >
    {children}
  </button>
)

export default Button
