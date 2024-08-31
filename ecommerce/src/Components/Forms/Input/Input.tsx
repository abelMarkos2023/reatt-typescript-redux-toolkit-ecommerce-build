import { Form } from 'react-bootstrap'
import { Path, FieldValues, UseFormRegister } from 'react-hook-form';

type TInputProps<TFieldValue extends FieldValues> = {
    error?:string;
    type:string;
    label:string;
    title:Path<TFieldValue>;
    register:UseFormRegister<TFieldValue>;
    onBlur?:(e:React.FocusEvent<HTMLInputElement>) => void;
    validationText?:string;
    success?:string
}
const Input = <TFieldValue extends FieldValues>({error,type,label,title,register,onBlur,validationText,success}:TInputProps<TFieldValue>) => {

    const onBlurHandler = (e:React.FocusEvent<HTMLInputElement>) => {
        if(onBlur){
            onBlur(e)
            register(title).onBlur(e)
        }else{
            register(title).onBlur(e)
        }
    }
  return (
    <Form.Group className="mb-2" style={{width:"100%"}}>
    <Form.Label>{label}</Form.Label>
    <Form.Control 
        type={type} 
        {...register(title)} 
        onBlur={onBlurHandler}
         isInvalid={error? true:false}
         isValid={success && success.length > 0 ? true : false} />

    {validationText && <Form.Text muted>{validationText}</Form.Text>}
    <Form.Control.Feedback type="invalid">
      {error}
    </Form.Control.Feedback>   
     <Form.Control.Feedback type="valid">
      {success}
    </Form.Control.Feedback>
  </Form.Group>
  )
}

export default Input