import { lazy, Suspense } from "react";
import { Loader } from "@mantine/core";
import ErrorBoundary from "./components/ErrorBoundary";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
// import DashboardLayout from "./components/layout/DashboardLayout.jsx";
const Chat = lazy(() => import("./pages/Chat.jsx"));
const DashboardLayout = lazy(() =>
  import("./components/layout/DashboardLayout.jsx")
);

const App = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<DashboardLayout />}>
              <Route path="/chat" element={<Chat />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
      <Toaster
        position="top-right"
        duration={1800}
        richColors={true}
        closeButton
      />
    </>
  );
};

export default App;
