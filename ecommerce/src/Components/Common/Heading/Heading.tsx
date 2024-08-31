import React,{memo} from 'react'

const Heading = ({title}:{title:string}) => {
  
  return (
    <h1 className='font-weight-bold'>
        {title}
    </h1>
  )
}

export default Heading