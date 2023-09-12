'use server'
import FormAddPost from '@/components/ui/FormAddPost/FormAddPost'
import styles from './Posts.module.scss'
import PostsBody from '@/components/ui/PostsBody/PostsBody'

const Posts = async ():Promise<JSX.Element> => {
    return (
        <div className={styles.wrapper}>
            <FormAddPost />
            <PostsBody />
        </div>
    )
}

export default Posts