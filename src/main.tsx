import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './Pages/HomePage';
import Layout from './components/Layout';
import RecipesPage from './Pages/RecipesPage';
import AboutUsPage from './Pages/AboutUsPage';
import LoginPage from './Pages/LoginPage';
import RecipesDetailedPage from './Pages/RecipesDetailedPage';
import './index.css';
import AddRecipePage from './Pages/AddRecipePage';
import { UserContextProvider } from './context/userContext';

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
			path: "/recipe/:id",
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
		{
			path: "/addrecipe",
			element: <AddRecipePage />
		}
	  ],
	},
  ]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
	<UserContextProvider>
    	<RouterProvider router={router} />
	</ UserContextProvider>
  </StrictMode>,
)
