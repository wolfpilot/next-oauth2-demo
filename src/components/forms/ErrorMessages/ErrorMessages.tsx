// Types
import type { Props } from "./types"

// Styles
import styles from "./ErrorMessages.module.css"

const ErrorMessages = ({ className = "", errors }: Props) => {
  if (!errors?.length) return null

  return (
    <ul
      className={`
        ${styles.wrapper}
        ${className}
      `}
    >
      {errors.map((err, index) => (
        <li key={index} className={styles.item}>
          {err}
        </li>
      ))}
    </ul>
  )
}

export default ErrorMessages
