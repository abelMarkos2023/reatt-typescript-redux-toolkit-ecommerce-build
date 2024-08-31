import Heading from "@Components/Common/Heading/Heading"
import Input from "@Components/Forms/Input/Input"
import { zodResolver } from "@hookform/resolvers/zod"
import actAuthLogin from "@Store/Auth/act/actAuthLogin"
import { useAppDispatch, useAppSelector } from "@Store/hooks"
import { signinSchema, TSignin } from "@Validations/signinValidations"
import { Form,Button, Row, Col, Alert, Spinner } from "react-bootstrap"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate, useSearchParams } from "react-router-dom"

type TLoginForm = {
  firstname:string;
  lastname:string;
  email:string;
  password:string;
  confirmPassword:string
}

const Login = () => {
  const [searchParams,setSearchParams] = useSearchParams()
  const dispatch = useAppDispatch()
  const {loading,error} = useAppSelector(state => state.Auth)
  const navigate = useNavigate()
  const {register,handleSubmit,formState:{errors}} = useForm<TSignin>({
    mode:"onBlur",
    resolver:zodResolver(signinSchema)
  })

  const submitForm : SubmitHandler<TLoginForm> = (data) => {
    if(searchParams.get('account_created')){
      setSearchParams("")
    }
    dispatch(actAuthLogin(data)).unwrap().then(() => navigate('/'))
  } 
  return (
    <>
    <Heading title="Login Form"></Heading>
      <Row>
        <Col md={{span:6,offset:3}}>
        {searchParams.get('message') === 'account_created' && <Alert variant="success">Your Account Has Been Created Successfully Now You Can Use Your Credentials To Login</Alert>}
        {error && <Alert variant="danger">{}error</Alert>}
        <Form className="container" onSubmit={handleSubmit(submitForm)}>
        <Input type='text' label="Email" title="email" error={errors?.email?.message} register={register} />
        <Input type='password' label="Password" title="password" error={errors?.password?.message} register={register} />

      <Button variant="primary" type="submit" className="mt-4 text-lg">
        {
        loading === 'pending' ? <>
        <Spinner size='sm' animation="border" /> Logging You In...
        </> :'Register'
        }
        </Button>
    </Form>
        </Col>
      </Row>
    </>
   
  )
}

export default Login