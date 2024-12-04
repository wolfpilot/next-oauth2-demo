"use client"

import { useState } from "react"

// Types
import { Props } from "./types"

// Styles
import styles from "./InputField.module.css"

// Components
import { ErrorMessages } from "@components/forms"

const PasswordInputField = ({ id, name, label, errors, ...rest }: Props) => {
  const isValidProps = id && name && label

  const [showPassword, setShowPassword] = useState(false)

  if (!isValidProps) return null

  const handleOnPasswordToggle = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>

      <div className={styles.inputWrapper}>
        <input
          className={`
            ${styles.input}
            ${styles.inputPassword}
          `}
          id={id || name}
          name={name}
          {...rest}
          type={showPassword ? "text" : "password"}
        />

        <button
          className={`
              ${styles.btnPassword}
              ${showPassword && styles.btnPasswordIsShown}
            `}
          type="button"
          onClick={handleOnPasswordToggle}
        >
          👁
        </button>
      </div>

      <ErrorMessages errors={errors} />
    </div>
  )
}

export default PasswordInputField
