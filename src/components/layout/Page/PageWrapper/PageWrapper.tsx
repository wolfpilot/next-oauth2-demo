// Styles
import styles from "./PageWrapper.module.css"

export interface Props {
  children: React.ReactNode
}

const PageWrapper = ({ children }: Props) => (
  <main className={styles.wrapper}>
    <div className={styles.content}>{children}</div>
  </main>
)

export default PageWrapper
