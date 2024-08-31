import { z } from "zod";

const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8,{message:"Password Mustbe at least 8 charechter long"}),
  })

  type TSignin = z.infer<typeof signupSchema>
  export  {signinSchema}
  export {type TSignin}