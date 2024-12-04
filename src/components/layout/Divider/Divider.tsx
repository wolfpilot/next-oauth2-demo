// Types
import { Props } from "./types"

// Styles
import styles from "./Divider.module.css"

const Divider = ({ className = "", text }: Props) => (
  <div
    className={`
      ${styles.wrapper}
      ${className}
  `}
  >
    {text && <span>{text}</span>}
  </div>
)

export default Divider
