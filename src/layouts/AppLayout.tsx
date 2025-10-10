import { Navigate, Outlet } from "react-router-dom";

const AppLayout = () => {
  const isAuthenticated = localStorage.getItem("accessToken");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white p-4 shadow">App Header</header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
