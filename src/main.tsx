import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Header from "./components/Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './Pages/HomePage';
import Layout from './components/Layout';
import RecipesPage from './Pages/RecipesPage';
import AboutUsPage from './Pages/AboutUsPage';
import LoginPage from './Pages/LoginPage';
import RecipesDetailedPage from './Pages/RecipesDetailedPage';

const router = createBrowserRouter([
	{
	  path: "/",
	  element: <Layout />,
	  children: [
		{
		  path: "/",
		  element: <HomePage />,
		},
  
		{
		  path: "/recipes",
		  element: <RecipesPage />,
		},
		{
			path: "/recipes/:id",
			element: <RecipesDetailedPage />
		},
		{
		  path: "/aboutus",
		  element: <AboutUsPage />,
		},
		{
		  path: "/login",
		  element: <LoginPage />,
		},
	  ],
	},
  ]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
