import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-[400px] rounded-xl bg-white p-6 shadow">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
