import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Chat from "./components/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/chat",
    element: <Chat/>
  }
]);

function App() {
  return (
    <div className="App">
      {/* <SignIn /> */}
      <RouterProvider router={router} />

    </div>
  );
}

export default App;
