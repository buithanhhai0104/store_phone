import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { googleLogin } from "../../service/user";
import { FcGoogle } from "react-icons/fc";
const Login: React.FC = () => {
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      await googleLogin();

      const user = JSON.parse(localStorage.getItem("user") || "no user");

      if (user === "no user") {
        alert("Đăng nhập không thành công");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-custom-gradient rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Đăng nhập</h2>
        <div className="flex justify-center">
          <button
            className="flex justify-center items-center gap-2 bg-white rounded-xl p-[10px] text-[18px] hover:bg-slate-400"
            onClick={handleLogin}
          >
            <FcGoogle className="text-[30px]" />
            Đăng nhập với Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
