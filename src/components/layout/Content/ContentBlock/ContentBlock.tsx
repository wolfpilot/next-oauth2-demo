// Types
import { Props } from "./types"

// Styles
import styles from "./ContentBlock.module.css"

const ContentBlock = ({ children, className = "" }: Props) => (
  <div
    className={`
      ${styles.wrapper}
      ${className}
    `}
  >
    {children}
  </div>
)

export default ContentBlock
