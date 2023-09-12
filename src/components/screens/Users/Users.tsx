import { ReactNode } from 'react'
import styles from './Users.module.scss'
import FormRegister from '@/components/ui/FormRegister/FormRegister'
import FormSignIn from '@/components/ui/FormSignIn/FormSignIn'
const Users = ():ReactNode => {
  return(
    <div className={styles.wrapper}> 
      <div className={styles.login}>
        <FormRegister />
        <FormSignIn />
      </div>
    </div>
  )
}

export default Users