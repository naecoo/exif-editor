import { useState } from "react";
import { GetGPSExif, SetGPSExif } from "../wailsjs/go/main/App";
import { main } from "../wailsjs/go/models";

function App() {
  const [output, setOutput] = useState("");

  const onClick = () => {
    GetGPSExif(
      new main.GetExifParams({
        image_path:
          "/Users/oceanpeng/Desktop/code/wails-app/examples/image.jpg",
      })
    )
      .then((data) => {
        setOutput(() => JSON.stringify(data));
      })
      .catch((err) => {
        console.log(err);
      });

    // GetGPSExif(
    //   new main.SetExifParams({
    //     image_path:
    //       "/Users/oceanpeng/Desktop/code/wails-app/examples/image.jpg",
    //     latitude: 1.1,
    //     longitude: 1.1,
    //   })
    // )
    //   .then((data) => {
    //     console.log("set", data);
    //   })
    //   .catch((err) => {
    //     console.log("set", err);
    //   });
  };

  return (
    <div id="App">
      <button className="mt-4" onClick={onClick}>
        Greet
      </button>
      <div>{output}</div>
    </div>
  );
}

export default App;
