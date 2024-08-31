
import { actgetCategories } from '@Store/Categories/CategoriesSlice';
import { useAppDispatch, useAppSelector } from '@Store/hooks'
import { useEffect } from 'react';

const useCategories = () => {
    const dispatch = useAppDispatch();

    const {records,error,loading} = useAppSelector(state => state.Categories)
  
    useEffect(() =>{
      //preventing The Dispatchment Of an Action if The Categories were already loaded
      if(records.length == 0){
        dispatch(actgetCategories())
  
      }
    },[])
  
    
  return {records,error,loading}
}

export default useCategories