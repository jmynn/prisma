import { FunctionComponent, ReactNode } from 'react'
import styles from './PostCard.module.scss'

type TypePostCard = {
  children: ReactNode
  title: string
  description?: string
}

const PostCard:FunctionComponent<TypePostCard> = ({children, title, description}):ReactNode => {
  return(
    <div className={styles.card}>
      <div className={styles.title}>{title}</div>
      {description && <div className={styles.description}>{description}</div>}
      {children}
    </div>
  )
}

export default PostCard