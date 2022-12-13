import { navigate } from "gatsby"
import { useAdminLogin } from "medusa-react"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Button from "../../fundamentals/button"
import SigninInput from "../../molecules/input-signin"

type FormValues = {
  email: string
  password: string
}

type LoginCardProps = {
  toResetPassword: () => void
}

const LoginCard: React.FC<LoginCardProps> = ({ toResetPassword }) => {
  const [isInvalidLogin, setIsInvalidLogin] = useState(false)
  const { register, handleSubmit, reset } = useForm<FormValues>()
  const login = useAdminLogin()

  useEffect(() => {
    const valuesDemo = { email: "some@email.com", password: "some-password" }

    // console.log("vlaues", values)
    console.log("valuesDemo", valuesDemo)

    login.mutate(valuesDemo, {
      onSuccess: () => {
        navigate("/a/orders")
      },
      onError: () => {
        setIsInvalidLogin(true)
        reset()
      },
    })
  }, [])

  // console.log("email", email)

  return null
}

export default LoginCard
