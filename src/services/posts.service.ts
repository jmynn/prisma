import { TPost } from '@/types/types'
import axios from 'axios'
export async function getAll(): Promise<TPost[]> {
    const {data: {posts}}: {data: {posts: TPost[]}} = await axios('/api/posts')
    return posts
}
export async function addPost(form: HTMLFormElement): Promise<boolean> {
    const formData = new FormData(form)
    const {data: {state}}: {data: {state: boolean}} = await axios.post('/api/posts', formData)
    return !!state
}
export async function deletePost(id: number): Promise<boolean> {
    const {data: {state}}: {data: {state: boolean}} = await axios.delete('/api/posts', {data:{id}})
    return !!state
}