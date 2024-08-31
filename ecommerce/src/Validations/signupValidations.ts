import { z } from "zod";

const signupSchema = z.object({
  
    firstname: z.string().min(3,{message:"Firstname Mustbe More than more than 2 charachters"}).max(50),
    lastname: z.string().min(3,{message:"Lastname Mustbe More than more than 2 charachters"}).max(50),
    email: z.string().email(),
    password: z.string().min(8,{message:"Password Mustbe at least 8 charechter long"}).regex(/.*[!@#%&*()_+{}|[\]\\;:'"<>?./].*/,{message:"Password Must Contain at least one special charechter"}).max(20),
    confirmPassword: z.string().min(8).max(20)
  }).refine(input => input.password === input.confirmPassword,{message:"confirm Password doesn't match passwor",path:['confirmPassword']})

  type TSignup = z.infer<typeof signupSchema>
  export  {signupSchema}
  export {type TSignup}