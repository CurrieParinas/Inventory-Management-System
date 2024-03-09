import './App.css';
import {
    createBrowserRouter,
    RouterProvider,
    Outlet
  } from "react-router-dom";
import Home from './pages/home/Home';
import Items from './pages/items/Items';
import Item from './pages/item/Item';
import Barcodes from './pages/barcodes/Barcodes';
import Navbar from './components/navbar/Navbar';
import Menu from './components/menu/Menu';
import Footer from './components/footer/Footer';
import Login from './pages/login/login';

function App() {
    const Layout = ()=> {
        return (
            <div className="main">
                <Navbar/>
                <div className="container">
                    <div className="menuContainer">
                        <Menu/>
                    </div>
                    <div className="contentContainer">
                        <Outlet />
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout/>,
            children: [
                {
                    path: "/",
                    element: <Home/>,
                },
                {
                    path: "items",
                    element: <Items/>,
                },
                {
                    path: "item",
                    element: <Item/>,
                },
                {
                    path: "barcodes",
                    element: <Barcodes/>,
                },
            ]
        },
        {
            path:"/login",
            element: <Login/>
        }
      ]);

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
