import "./App.css";
import { useState } from "react";

function App() {
  const [dummyarr, setdummyarr] = useState([]);
  const addElement = (event) => {
    event.preventDefault();
    const data = event.target.userinput.value;
    event.target.userinput.value = "";
    setdummyarr((current) => {
      return [...current, data.toString()];
    });
    // console.log(dummyarr);
  };
  return (
    <div className="App">
      <div className="textspace">
        {dummyarr.map((element, index) => {
          return <h3 key={index}>{element}</h3>;
        })}
      </div>
      <form onSubmit={addElement}>
        <input
          type="text"
          className="inputfield"
          name="userinput"
          id="userinput"
        />
      </form>
    </div>
  );
}

export default App;
