// Types
import { Props } from "./types"

// Styles
import styles from "./Container.module.css"

const Container = ({ children }: Props) => (
  <div className={styles.wrapper}>{children}</div>
)

export default Container
