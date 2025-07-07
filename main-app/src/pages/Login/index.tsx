import { FC, memo, useState } from 'react'
import { Card } from 'antd'
import styles from './index.module.less'
import Logo from '~/assets/images/logo.png'
import LoginForm from './components/loginForm'
import { useLocation } from '@umijs/max'

const Component: FC = () => {
  const { state } = useLocation()

  const [scene, setScene] = useState(state?.scene)

  return (
    <div className={styles.component}>
      <div className={styles.center}>
        <div className={styles.title}>烘焙365 Sass系统</div>

        <Card className={styles.card}>
          <div style={{ textAlign: 'center' }}>
            <img src={''} className={styles.logo} />
          </div>
            <LoginForm onClick={(scene) => setScene(scene)} />
        </Card>
      </div>
    </div>
  )
}

Component.displayName = 'MMPLogin'

const MMPLogin = memo(Component)
export default MMPLogin
