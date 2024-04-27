import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './page/HomePage/HomePage.jsx';

function Router() {
    const routes = [
        {
            path: '*',
            element: <HomePage />
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
