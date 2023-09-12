'use client'
import { FormEvent, ReactNode } from 'react'
import styles from './FormRegister.module.scss'
import { createUser } from '@/services/users.service'
import { useRouter } from 'next/navigation'

const FormRegister = (): ReactNode => {
    const router = useRouter()
    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        if(await createUser(form)) {
            alert('User created')
            router.push('/posts')
        }
        else alert('User not created')
        form.reset()   
    }
    return (
        <div className={styles.register}>
            <form onSubmit={e => handleRegister(e)}>
                <div>Зарегистрироваться</div>
                <input type='text' placeholder='Введите имя' name='user' />
                <input type='text' placeholder='Введите логин' name='login' />
                <input type='password' placeholder='Введите пароль' name='password' />
                <button type='submit'>Зарегистрироваться</button>
            </form>
        </div>
    )
}

export default FormRegister