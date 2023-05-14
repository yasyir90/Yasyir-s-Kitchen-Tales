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
import AllUser from './pages/allUser/allUser';
import AddFood from './pages/addFood/addFood';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="App">
        <NavbarH />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
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
      {
        path: "/addfood",
        element: localStorage.getItem("token") ? <AddFood /> : <Error />,
      },
      // {
      //   path: "/add-food",
      //   element:
      //     localStorage.getItem("role") === "admin" ? <AddFood /> : <Error />,
      // },
      {
        path: "/profile",
        element: localStorage.getItem("token") ? <Profile /> : <Error />,
      },
      {
        path: "/all-users",
        element:
          localStorage.getItem("role") === "admin" ? <AllUser /> : <Error />,
      },
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
