import Heading from "@Components/Common/Heading/Heading"
import { Form,Button, Row, Col, Spinner } from "react-bootstrap"
import { useForm,SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signupSchema, TSignup } from "@Validations/signupValidations";
import Input from "@Components/Forms/Input/Input";
import useCheckEmailAvailabilityStatus from "@Hooks/useCheckEmailAvailabilityStatus";
import { useAppDispatch, useAppSelector } from "@Store/hooks";
import actAuthRegister from "@Store/Auth/act/actAuthRegister";
import { useNavigate } from "react-router-dom";


type TRegisterForm = {
  firstname:string;
  lastname:string;
  email:string;
  password:string;
  confirmPassword:string
}



const Register = () => {
  const dispatch = useAppDispatch()
  const {error,loading} = useAppSelector(state => state.Auth)
  const navigate = useNavigate()

   const {emailAvailabilityStatus,checkEmailAvailability,email} = useCheckEmailAvailabilityStatus()
  
  const {register,handleSubmit,trigger,getFieldState,formState:{errors}} = useForm<TSignup>({
    mode:'onBlur',
    resolver:zodResolver(signupSchema)
  })

  const submitForm : SubmitHandler<TRegisterForm> = async (data) => {
    const {firstname,lastname,email,password} = data;
    dispatch(actAuthRegister({firstname,lastname,email,password})).unwrap().then(() => {
      navigate('/login?message=account_created')
    })
  }
  const onEmailBlur = async (e:React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value
    await trigger()
    const {isDirty,invalid} = getFieldState('email')
    if(isDirty && !invalid && value !== email){
      checkEmailAvailability(value)
    }
    console.log(e.target)
   }

  return (
    <>
    <Heading title="Registeration Form"></Heading>
      <Row>
        <Col md={{span:6,offset:3}}>
        {error && <span style={{color:"#0C3545",fontSize:"1.2rem",margin:".8rem"}}>{error}</span>}
        <Form className="container" onSubmit={handleSubmit(submitForm)}>


        <Input 
          type="text" 
          title='firstname' 
          label='First Name' 
          error={errors?.firstname?.message} 
          register={register} />


        <Input 
          type="text" 
          title='lastname' 
          label='Last Name' 
          error={errors?.lastname?.message} 
          register={register} />


        <Input 
          onBlur={onEmailBlur} 
          type="text" 
          title='email' 
          label='Email' 
          validationText={emailAvailabilityStatus === 'checking' ? "We are Currently Checking the Availability of this email please wait":""}
          error={errors?.email?.message ? errors.email.message : emailAvailabilityStatus === 'notAvailable' ? 'This Email Already in use':emailAvailabilityStatus == 'failed' ? 'Internal Server Errror ':''} 
          success={emailAvailabilityStatus === 'available' ? 'This is a valid Email to use' : ''}
          register={register} />


        <Input 
          type="password" 
          title='password' 
          label='Password' 
          error={errors?.password?.message} 
          register={register} />


        <Input 
          type="password" 
          title='confirmPassword' 
          label='Confirm Password' 
          error={errors?.confirmPassword?.message}
          register={register} />
      
      <Button variant="primary" size="lg" disabled={emailAvailabilityStatus === "checking"} className="mt-4 text-lg" type="submit">
        {
          loading == 'pending' ? <>
          <Spinner animation="border" size='sm' /> Loading....
          </> :'Register'
        }
      </Button>
    </Form>
        </Col>
      </Row>
    </>
   
  )
}

export default Register