import './App.css';
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import NavbarH from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Home from './pages/home/home';
import About from './pages/about/about';
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
      // {
      //   path: "/detail/:foodID",
      //   element: <Detail />,
      // },
      // {
      //   path: "/favorite",
      //   element: localStorage.getItem("token") ? <Favorite /> : <Error />,
      // },
      // {
      //   path: "/add-food",
      //   element:
      //     localStorage.getItem("role") === "admin" ? <AddFood /> : <Error />,
      // },
      // {
      //   path: "/profile",
      //   element: localStorage.getItem("token") ? <Profile /> : <Error />,
      // },
      // {
      //   path: "/all-users",
      //   element:
      //     localStorage.getItem("role") === "admin" ? <AllUsers /> : <Error />,
      // },
    ],
  },
  // {
  //   path: "/login",
  //   element: <Login />,
  // },
  // {
  //   path: "/register",
  //   element: <Register />,
  // },
]);

const App = () => <RouterProvider router={router} />;

export default App;