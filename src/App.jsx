import { ToastContainer } from "react-toastify";
import { RoutesPage } from "./routes/Routes";

function App() {
  return (
    <>
    <RoutesPage/>
    <ToastContainer
      position="bottom-center"
      theme="dark"
      toastStyle={{
        backgroundColor: '#15133a'
      }}
    />
    </>
  );
}

export default App;