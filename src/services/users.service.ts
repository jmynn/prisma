import { TUser } from "@/types/types"
import axios from "axios"

export async function getUsers(): Promise<TUser[] | []>{
    const {data: {users}}: {data: {users: TUser[]}} = await axios(`/api/users`)
    return users
}
export async function isUserById(form: HTMLFormElement): Promise<boolean> {
    const formData = new FormData(form)
    formData.set('key', 'log')
    const {data: {state}}: {data: {state: boolean}} = await axios.post(`/api/users`, formData)
    return !!state
}
export async function createUser(form: HTMLFormElement){
    const formData = new FormData(form)
    formData.set('key', 'reg')
    const {data: {state}}: {data: {state: boolean}} = await axios.post(`/api/users`, formData)
    return !!state
}
export async function middlewareUser(){
    const {data: {state}}: {data: {state: boolean}} = await axios(`/api/users`)
    return !!state
}