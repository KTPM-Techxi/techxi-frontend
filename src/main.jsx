import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

import RootPage from './routes/RootPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Contact from './routes/contact.jsx';

// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <RootPage />,
//         errorElement: <ErrorPage />,
//         children: [
//             {
//                 path: 'contacts/:contactId',
//                 element: <Contact />
//             }
//         ]
//     },
//     {
//         path: '/login',
//         element: <LoginPage />
//     }
// ]);

// ReactDOM.createRoot(document.getElementById('root')).render(
//     <React.StrictMode>
//         <RouterProvider router={router} />
//     </React.StrictMode>
// );
ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
