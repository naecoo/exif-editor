import { useEffect, useState } from "react";
import logo from "./assets/images/logo-universal.png";
import "./App.css";
import { useGreet } from "./services";

function App() {
  const [resultText, setResultText] = useState(
    "Please enter your name below 👇"
  );

  const [name, setName] = useState("");
  const updateName = (e: any) => setName(e.target.value);

  const { data, loading, run } = useGreet();
  function greet() {
    run(name);
  }

  useEffect(() => {
    if (data) {
      setResultText(data);
    }
  }, [data]);

  return (
    <div id="App">
      <img src={logo} id="logo" alt="logo" />

      <div id="input" className="input-box">
        <input
          id="name"
          className="input"
          onChange={updateName}
          autoComplete="off"
          name="input"
          type="text"
        />
        <button className="btn" onClick={greet}>
          Greet
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div id="result" className="result">
          {resultText}
        </div>
      )}
    </div>
  );
}

export default App;
