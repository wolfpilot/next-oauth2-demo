// Types
import { Props } from "./types"

// Styles
import styles from "./InputField.module.css"

export const InputField = ({ type, id, name, label, ...rest }: Props) => {
  const isValidProps = id && name && label

  if (!isValidProps) return null

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>

      <input
        className={styles.input}
        type={type}
        id={id || name}
        name={name}
        {...rest}
      />
    </div>
  )
}
