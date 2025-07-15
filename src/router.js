import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './page/HomePage/HomePage.jsx';
import ManagePage from './page/ManagePage/ManagePage.jsx';

function Router() {
    const routes = [
        {
            path: '*',
            element: <HomePage />
        },
        {
            path: '/manage',
            element: <ManagePage />
        }
    ];

    return (
        <BrowserRouter>
            <Routes>
                {routes.map((route) => (
                    <Route key={route.path} {...route} />
                ))}
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
