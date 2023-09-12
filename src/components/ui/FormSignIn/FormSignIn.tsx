'use client'
import { FormEvent, ReactNode, useState } from 'react'
import styles from './FormSignIn.module.scss'
import useSWR from 'swr'
import { getUsers, isUserById } from '@/services/users.service'
import { useRouter } from 'next/navigation'

const FormSignIn = (): ReactNode => {
    const { data: users, isLoading } = useSWR('users', getUsers)
    const [userId, setUserId] = useState<string>('default')
    const [dataState, setDataState] = useState<Record<'login' | 'password', boolean>>({
        login: false,
        password: false,
    })
    const router = useRouter()
    const isDisabled = userId === 'default' || !dataState.login || !dataState.password 
    const handleSignIn = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        if(await isUserById(e.target as HTMLFormElement)) {
            router.push('/posts')
        } 
    }

    const handleChange = (field: keyof typeof dataState, value: string): void => {
        setDataState(prev => ({...prev, [field]: value.length ? true : false }))
    }
    return (
        <div className={styles.users}>
            <form onSubmit={e => handleSignIn(e)}>
                <div>Войти</div>
                {
                    isLoading ? <h1>Подождите...</h1> :
                        users?.length && 
                        <select value={userId} name='user' onChange={e => setUserId(e.target.value)}>
                            <option value='default'>Выберите пользователя</option>
                            {
                                users.map((user, i) => <option key={i} value={user.externalId}>{user.name}</option>)
                            }    
                        </select>
                }
                {
                    userId !== 'default' &&
                    <>
                        <input type='text' placeholder='Введите логин' name='login' onChange={(e) => handleChange("login", e.target.value)} />
                        <input type='password' placeholder='Введите пароль' name='password' onChange={(e) => handleChange("password", e.target.value)} />
                        <button type='submit' disabled={isDisabled}>Войти</button>
                    </>
                }
            </form>
        </div>
    )
}

export default FormSignIn