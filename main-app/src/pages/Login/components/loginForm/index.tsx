import { FC, memo, useState } from 'react'
import styles from './index.module.less'
import { ILoginFormProps } from './const'
import { EyeInvisibleOutlined, EyeOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import { Input, Button, Form } from 'antd'
// import { encryptPassword } from '../../const'
import { useModel, history } from '@umijs/max'
import { login } from '@/services/user/UserController'

const { Item, useForm } = Form

const Component: FC<ILoginFormProps> = (props) => {
  const { initialState, setInitialState } = useModel('@@initialState')

  const [form] = useForm()

  const [passwordType, setPasswordType] = useState('password')
  const [loading, setLoading] = useState(false)

  function handleFinish() {
    form.validateFields().then(async ({ username, pwd }) => {
      setLoading(true)
      try {
        const res = await login({
          userNo: "0",
          userName: username,
          pass: pwd
        }

        )
        console.log(res, 'res')
        // const encrypted = encryptPassword(pwd)

        // const { data = '' } = await api['/admin/public/login_POST']({ username, password: encrypted })
        // setAuthorization(data)
        // 更新用户信息

        // const user = await initialState!.fetchUserInfo!()
        const user = res.data.User
        await setInitialState((pre) => ({ ...pre, ...user }))
      
        // setTimeout(() => {
        //   history.push('/')
        // }, 10)
        // 重定向
        // const { query = {} } = history.location
        // query.redirect ? history.replace(query.redirect as string) : history.push('/home')
      } catch (error) { }

      setLoading(false)
    })
  }

  return (
    <Form
      labelCol={{ span: 6 }}
      labelAlign="left"
      form={form}
      onFinish={handleFinish}
      onValuesChange={(changedValues) => {
        if (changedValues.pwd !== undefined) {
          form.setFieldsValue({ pwd: changedValues.pwd.replace(/[\u4e00-\u9fa5]/g, '') })
        }
      }}
    >
      <Item
        name="username"
        validateFirst
        rules={[
          { required: true, message: '请输入账号' },
          {
            validator: (_, value) =>
              // isChinaMobilePhone(value) ? Promise.resolve() : Promise.reject(new Error('请输入正确的手机号码'))
              console.log(value) || value ? Promise.resolve() : Promise.reject(new Error('请输入正确的手机号码')),
          }
        ]}
      >
        <Input placeholder="请输入账号" size="large" prefix={<UserOutlined style={{ color: '#bfbfbf' }} />} />
      </Item>
      <Item name="pwd" rules={[{ required: true, message: '请输入密码' }]}>
        <Input
          placeholder="请输入密码"
          size="large"
          prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
          // type={passwordType}
          maxLength={20}
          suffix={
            passwordType === 'password' ? (
              <EyeInvisibleOutlined onClick={() => setPasswordType('text')} />
            ) : (
              <EyeOutlined onClick={() => setPasswordType('password')} />
            )
          }
          className={passwordType === 'password' ? 'pwd' : ''}
        />
      </Item>

      <Form.Item noStyle>
        <div className={styles.opeartions}>
          {/* <Button type="link" onClick={() => props.onClick(ECodeScene.FORGOT)}>
            忘记密码?
          </Button> */}
          {/* <Button type="link" onClick={() => props.onClick(ECodeScene.REG)}>
            前往注册
          </Button> */}
        </div>
      </Form.Item>

      <Item>
        <Button block size="large" htmlType="submit" loading={loading}>
          登录
        </Button>
      </Item>
    </Form>
  )
}

Component.displayName = 'LoginForm'

const LoginForm = memo(Component)
export default LoginForm
