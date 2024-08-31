import Heading from '@Components/Common/Heading/Heading'
import {useAppSelector} from '@Store/hooks'

const Profile = () => {
  const user = useAppSelector(state => state.Auth.user)
  return (
    <div>
      <Heading title="AccountInfo"/>
      <h3>First Name : {user.firstname}</h3>
      <h3>Las Name : {user.lastname}</h3>
      <h3>Email : {user.email}</h3>

    </div>
  )
}

export default Profile