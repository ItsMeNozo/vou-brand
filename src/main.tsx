import React from "react";
import { ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "black",
          fontSize: 16,
        },
        components: {
          Button: {
            colorPrimary: "black",
          },
        },
      }}
    >
      <StyleProvider hashPriority="high">
        <App />
      </StyleProvider>
    </ConfigProvider>
  </React.StrictMode>,
);
