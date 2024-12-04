"use client"

// Types
import { Props } from "./types"

// Styles
import styles from "./InputField.module.css"

// Components
import { ErrorMessages } from "@components/forms"

const InputField = ({ id, name, label, errors, ...rest }: Props) => {
  const isValidProps = id && name && label

  if (!isValidProps) return null

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>

      <input className={styles.input} id={id || name} name={name} {...rest} />

      <ErrorMessages errors={errors} />
    </div>
  )
}

export default InputField
