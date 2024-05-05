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
import "./styles/global.scss"
import Qrcodes from './pages/qrcodes/qrcodes';
import Barcode from './pages/barcode/Barcode';
import Qrcode from './pages/qrcode/Qrcode';
import Untrack from './pages/untrack/Untrack';


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
                    path: "untrack",
                    element: <Untrack/>,
                },
                {
                    path: "trackeditems/:id",
                    element: <Item/>,
                },
                {
                    path: "untrackeditems/:id",
                    element: <Item/>,
                },
                {
                    path: "barcodes/barcode/:id",
                    element: <Barcode/>,
                },
                {
                    path: "qrcodes/qrcode/:id",
                    element: <Qrcode/>,
                },
                {
                    path: "barcodes",
                    element: <Barcodes/>,
                },
                {
                    path: "qrcodes",
                    element: <Qrcodes/>,
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
