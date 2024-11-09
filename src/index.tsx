import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./Context/userContext";
import { Provider } from "react-redux";
import store from "./redux/store";
// Khai báo kiểu cho rootElement
const rootElement = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <UserProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </UserProvider>
  </React.StrictMode>
);

// Nếu bạn muốn bắt đầu đo lường hiệu suất trong ứng dụng của mình, hãy truyền một hàm
// để ghi lại kết quả (ví dụ: reportWebVitals(console.log))
// hoặc gửi đến một điểm cuối phân tích. Tìm hiểu thêm: https://bit.ly/CRA-vitals
reportWebVitals();
