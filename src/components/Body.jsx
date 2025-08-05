import Login from "./Login";
import { Browse } from "./Browse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GptSearchPage from "./GptSearchPage";
import MovieDetails from "./MovieDetails";
import MovieVideo from "./MovieVideo";
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
    {
      path: "/GptSearch",
      element: <GptSearchPage />,
    },
    {
      path: "/movie/:id",
      element: <MovieDetails />,
    },
    {
      path: "/video/:id",
      element: <MovieVideo />,
    },
  ]);

  return (
    <>
      <RouterProvider router={appRouter}></RouterProvider>
    </>
  );
}
