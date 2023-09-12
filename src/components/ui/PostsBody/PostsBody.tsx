'use client'
import { ReactNode, useDeferredValue } from 'react'
import styles from './PostsBody.module.scss'
import useSWR from 'swr'
import { deletePost, getAll } from '@/services/posts.service'
import PostCard from '../PostCard/PostCard'

const PostsBody = (): ReactNode => {
    const { data: posts, isLoading } = useSWR("posts", getAll)
    const defferedPosts = useDeferredValue(posts)
    const handleClick = async (id: number) => {
        if(await deletePost(id)) alert("Post deleted")
    }
    return (
        <div className={styles.posts}>
            {
                isLoading && <h1>Loading...</h1>
            }
            {
                defferedPosts && defferedPosts.map((post, i) =>
                    <PostCard key={i} title={post.title} description={post.description}>
                        <button onClick={() => handleClick(post.id)}>Delete</button>
                    </PostCard>
                )
            }
        </div>
    )
}

export default PostsBody