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
import GeneralItems from './pages/generalItems/GeneralItems';
import Location from './pages/location/Location';
import Medium from './pages/medium/Medium';
import Archive from './pages/archive/Archive';


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
                {
                    path: "general-items",
                    element: <GeneralItems/>,
                },
                {
                    path: "general-items/general-item/:id",
                    element: <Item/>,
                },
                {
                    path: "location",
                    element: <Location/>,
                },
                {
                    path: "medium",
                    element: <Medium/>,
                },
                {
                    path: "location/:id",
                    element: <Item/>,
                },
                {
                    path: "medium/:id",
                    element: <Item/>,
                },
                {
                    path: "archive",
                    element: <Archive/>,
                },
                {
                    path: "archive/:id",
                    element: <Item/>,
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
