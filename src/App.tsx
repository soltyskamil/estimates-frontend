import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/home/home";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { Dashboard } from "./pages/dashboard/dashboard";
import Estimates from "./pages/estimates/estimates";
import { PopupContextProvider } from "./context/popup-context";
import { EstimateSingle } from "./pages/estimate-single/estimate-single";
import { EstimatesLayout } from "./components/estimates-layout/estimates-layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DashboardWelcome from "./components/dashboard-welcome/dashboard-welcome";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>Wystapil błąd</div>,
    children: [
      // { path: "/", element: <Dashboard /> },
      {
        path: "/",
        element: <Dashboard />,
        errorElement: <div>Wystapil błąd</div>,
        children: [
          {
            path: "/",
            index: true,
            element: <DashboardWelcome />,
          },
          {
            path: "/dashboard/estimates",
            element: <EstimatesLayout />,
            children: [
              {
                index: true,
                element: <Estimates />,
              },
              {
                path: ":id",
                element: <EstimateSingle />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
    mutations: {
      retry: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PopupContextProvider>
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </PopupContextProvider>
    </QueryClientProvider>
  );
}

export default App;
