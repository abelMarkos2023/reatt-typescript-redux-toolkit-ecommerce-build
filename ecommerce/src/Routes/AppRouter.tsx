import {MainLayout,ProfileLayout} from '@Layouts/index'
import { lazy, Suspense } from 'react';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';

 import Error404 from '@Pages/Error404/Error404';
import LottieHandler from '@Components/Feedback/LottieHandler/LottieHandler';
import Auth from '@Components/Common/Auth/Auth';
import Guest from '@Components/Common/Auth/Guest';

const Categories = lazy(() => import("@Pages/Categories/Categories"))
const Products = lazy(() => import("@Pages/Products/Products"))
const Wishlist = lazy(() => import("@Pages/Wishlist/Wishlist"))
const Cart = lazy(() => import("@Pages/Cart/Cart"))
const Home = lazy(() => import("@Pages/Home/Home"))
const AboutUs = lazy(() => import("@Pages/AboutUs/AboutUs"))
const Login = lazy(() => import("@Pages/Login/Login"))
const Register = lazy(() => import("@Pages/Register/Register"))
const Profile = lazy(() => import("@Pages/Profile/Profile"))
const Orders = lazy(() => import("@Pages/Orders/Orders"))

const routes = createBrowserRouter([
    {
      path:'/',
      element:<Suspense fallback={
        <div style={{marginTop:"10%"}}>
          <LottieHandler type="Loading" message="'Loading Please Wait...'" />
        </div>
      }><MainLayout /></Suspense>,
      errorElement:<Error404 />,
      children:[
        {
        index:true,
        element:<Suspense fallback={<LottieHandler type="Loading" message="'Loading Please Wait...'" />}><Home /></Suspense>
      },
      {
        path:'categories',
        element:<Suspense fallback={<LottieHandler type="Loading" message="'Loading Please Wait...'" />}><Categories /></Suspense>
      },
      {
        path:'/cart',
        element:<Suspense fallback={<LottieHandler type="Loading" message="'Loading Please Wait...'" />}><Cart /></Suspense>
      },
      {
        path:'/wishlist',
        element:<Suspense fallback={<LottieHandler type="Loading" message="'Loading Please Wait...'" />}><Wishlist /></Suspense>
      },
      {
        path:'products/:prefix',
        element:<Suspense fallback={<LottieHandler type="Loading" message="'Loading Please Wait...'" />}><Products /></Suspense>,
        // loader:  ({params}) => {
        //     if(!/^[a-zA-Z]+$/i.test(params.prefix as unknown as string)){
        //         throw new Response('Bad Request',{
        //             statusText:"Category not found"
        //         })
        //         return true;
        //     }
        // }
  
      },
      {
        path:'about-us',
        element:<Suspense fallback={<LottieHandler type="Loading" message="'Loading Please Wait...'" />}><AboutUs /></Suspense>
      },
      {
        path:'login',
        element:<Suspense fallback={<LottieHandler type="Loading" message="'Loading Please Wait...'" />}>
          <Guest><Login /></Guest>
        </Suspense>
      },
      {
        path:'register',
        element:<Suspense fallback={<LottieHandler type="Loading" message="'Loading Please Wait...'" />}>
          <Guest><Register /></Guest>
        </Suspense>
      },
      {
        path:'profile',
        element:<Suspense fallback={<LottieHandler type="Loading" message="'Loading Please Wait...'" />}>
          <Auth><ProfileLayout /></Auth>
        </Suspense>,
        children:[
          {
            index:true,
            element:<Suspense><Profile /></Suspense>
          },
          {
            path:'orders',
            element: <Orders />
          }

        ]
      }
    ],
    }
  ])
const AppRouter = () => {
  return (
    <RouterProvider router={routes}></RouterProvider>
  )
}

export default AppRouter