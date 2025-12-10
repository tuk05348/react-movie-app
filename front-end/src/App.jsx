import "./App.css";
import Home from "./pages/Home";

function App() {
  //only one parent/root element can be returned by a component
  //fragments are like a placeholder for a parent element, empty tag as wrapper
  return (
    <>
      <Home></Home>
    </>
  );
}

export default App;
