import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css"
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


import Account from "./pages/Account";
import ContextProvider from "./context/context";
import Category0 from "./pages/Category0.jsx";
import Chat from "./pages/Chat.jsx";
import Cart2 from "./pages/Cart2.jsx";
import StoreContextProvider from "./context/StoreContext.jsx";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import Verify from "./pages/Verify/Verify.jsx";
import MyOrders from "./pages/MyOrders/MyOrders.jsx";
import Cart0 from "./pages/Cart0/Cart0.jsx";


// Define your routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "Category0",
    element: <Category0 />,
  },
  {
    path: "cart",
    element: <Cart0 />,
  },
  {
    path: "Account",
    element: <Account />,
  },
  {
    path: "Chat",
    element: <Chat />,
  },
  {
    path:"cart2",
    element:<Cart2/>,
  },
  {
    path:"/order",
    element:<PlaceOrder/>
  },
  {
    path:"/verify",
    element:<Verify/>
  },
  {
    path:"/myorders",
    element:<MyOrders/>
  },
]);

// Render the app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <ContextProvider>
    <StoreContextProvider>
      <RouterProvider router={router} />
    </StoreContextProvider>
  </ContextProvider>
</React.StrictMode>

);

// reportWebVitals is usually used with Create React App.
// You can remove it or set it up separately if needed.
