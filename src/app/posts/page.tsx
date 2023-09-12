'use server'
import Posts from '@/components/screens/Posts/Posts'

const page = async (): Promise<JSX.Element> => {
    return (
        <Posts />
    )
}

export default page