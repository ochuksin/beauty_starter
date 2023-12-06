import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "../header/Header";
import SchedulePage from "../../pages/schedule/SchedulePage";
import HistoryPage from "../../pages/history/HistoryPage";
import AppointmentContextProvider from "../../context/appointments/AppointmentContext";
import PageNorFound from "../../pages/404/404";

import "./app.scss";

const router = createBrowserRouter([
  // когда закгужается определенный путь - рендерится соответствующий элемент, не перезагружая всю страницу - single page application
  // например path: "/schedule", и   element: <SchedulePage />,
  {
    path: "/",
    element: <Root />,
    errorElement: <PageNorFound />,
    children: [
      {
        path: "/",
        element: <SchedulePage />,
      },
      {
        path: "/schedule",
        element: <SchedulePage />,
      },
      {
        path: "/history",
        element: <HistoryPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
  // return (
  // <main className="board">
  // {/* <Header />
  // <AppointmentContextProvider>
  // <SchedulePage />
  // </AppointmentContextProvider> */}
  // {/* <HistoryPage /> */}
  // {/* <CancelModal /> */}
  // </main>
  // );
}

function Root() {
  return (
    <main className="board">
      <Header />
      <AppointmentContextProvider>
        <Outlet />
      </AppointmentContextProvider>
    </main>
  );
}

export default App;
