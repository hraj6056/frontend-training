import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import { QueryClient, QueryClientProvider } from "react-query";
import "antd/dist/antd.css";

const queryClient = new QueryClient();


ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

