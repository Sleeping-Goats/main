import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chat from "./components/Chat";
import Graph from "./component/Graph";
import SignIn from "./component/SignIn";
import { Link } from "@mui/material";
import Header from "./component/Header";


const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/graph",
    element: <Graph />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
]);

function App() {
  return (
    <div className="App">
      <Header/>
      <Link href="chat">chat</Link>
      <Link href="graph">graph</Link>
      <Link href="signin">signin</Link>
      <RouterProvider router={router} />


    </div>



  );
}

export default App;
