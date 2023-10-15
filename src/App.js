import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MiniDrawer from "./Pages/RootLayout";
import SessionsList from "./Pages/SessionsList";
import SessionDetails from "./Pages/SessionDetails";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MiniDrawer />,
      // errorElement: <ErrorPage />,
      children: [
        {
          index:true,
          element: <SessionsList />,
          path: "sessions",
        },
        { element: <SessionDetails />, path: "new-session" },
        { element: <SessionDetails />, path: "view-session/:session_id" },
        // { path: "products", element: <ProductsPage /> },
        // { path: "products/:productId", element: <ProductDetailPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
