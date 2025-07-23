import Login from "./login";
import { Browse } from "./Browse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
export default function Body() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  return (
    <>
      <RouterProvider router={appRouter}>
        <Login></Login>
      </RouterProvider>
    </>
  );
}
