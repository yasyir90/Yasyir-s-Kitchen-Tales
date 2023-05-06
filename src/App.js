import './App.css';
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import NavbarH from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Home from './pages/home/home';
import About from './pages/about/about';
import AllFood from './pages/AllFood/AllFood';
import Login from './pages/login/login';
import Signin from './pages/signin/signIn';
import Profile from './pages/profile/profile';
import Error from './pages/Error/Error';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavbarH />
        <Outlet />
        {/* <Contact /> */}
        <Footer />
      </>
    ),
    // errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/allfood",
        element: <AllFood />,
      },
      // {
      //   path: "/favorite",
      //   element: localStorage.getItem("token") ? <Favorite /> : <Error />,
      // },
      // {
      //   path: "/add-food",
      //   element:
      //     localStorage.getItem("role") === "admin" ? <AddFood /> : <Error />,
      // },
      {
        path: "/profile",
        element: localStorage.getItem("token") ? <Profile /> : <Error />,
      },
      // {
      //   path: "/all-users",
      //   element:
      //     localStorage.getItem("role") === "admin" ? <AllUsers /> : <Error />,
      // },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/Signin",
    element: <Signin/>,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;