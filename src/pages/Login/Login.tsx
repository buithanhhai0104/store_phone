import React, { useState, FormEvent, useContext } from "react";
import { UserContext } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";

interface User {
  id: number;
  username: string;
  admin: boolean;
  img: string;
  password: string;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/users");
      const users: User[] = await response.json();
      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        const { password, ...userWithoutPassword } = user;
        dispatch(setUser(userWithoutPassword));
        setMessage("Đăng nhập thành công!");
        if (userContext && userContext.setUser) {
          userContext.setUser(user);
          navigate("/");
        }
      } else {
        setMessage("Tên đăng nhập hoặc mật khẩu không đúng.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessage("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-custom-gradient rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Đăng nhập</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full p-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Đăng nhập
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
