'use client'
import { FormEvent, ReactNode } from 'react'
import styles from './FormAddPost.module.scss'
import { addPost } from '@/services/posts.service'

const FormAddPost = (): ReactNode => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    if(await addPost(form)) alert('Post added')
    else alert('Post not added')
    form.reset()
  }
  return (
    <form onSubmit={e => handleSubmit(e)} className={styles.form}>
      <label>
        <label>Заголовок поста</label>
        <input type="text" name="title" placeholder="Введите заголовок..." required />
      </label>
      <label>
        <label>Заголовок поста</label>
        <textarea name="description" placeholder="Введите описание..." cols={20} rows={20} maxLength={500} />
      </label>
      <button type="submit">Добавить пост</button>
    </form>
  )
}

export default FormAddPost