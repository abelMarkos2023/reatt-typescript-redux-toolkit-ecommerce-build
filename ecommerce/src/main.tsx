import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.tsx'
import '@Styles/global.css'

import { Provider } from 'react-redux'

import   { persistor,store }  from './Store'
import AppRouter from '@Routes/AppRouter.tsx'
import { PersistGate } from 'redux-persist/integration/react'
import '@Services/axios-global'



ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <AppRouter />
        </PersistGate>
    </Provider>
)
