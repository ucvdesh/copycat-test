import { useState } from "react";
import parse from "html-react-parser";
import "./App.css";

function App() {
  const [htmlCode, setHtmlCode] = useState("");
  const [repeated, setRepeated] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const processCode = () => {
    const body = JSON.stringify({
      html: htmlCode,
    });
    try {
      fetch("http://127.0.0.1:5000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      })
        .then((data) => data.json())
        .catch((error) => console.error("Error:", error))
        .then((res) => {
          setRepeated(res.duplicates);
          setShowResults(true);
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="container mx-auto bg-white">
      {!showResults ? (
        <div>
          <h1 className="text-5xl font-bold py-14">Find Similar Nodes</h1>
          <h6 className="font-bold">Paste HTML in textbox below</h6>
          <textarea
            className="container border-2 border-black mt-4 mb-11 bg-off-white h-[538px] p-2"
            onChange={(e) => setHtmlCode(e.target.value)}
            value={htmlCode}
          />
          <div className="container mx-auto flex flex-1 items-center">
            <button onClick={processCode}>Process Code</button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-1 justify-between items-center">
            <h1 className="text-5xl font-bold py-14 flex flex-1">Results</h1>
            <button onClick={() => setShowResults(false)}>Run Again</button>
          </div>
          <div className="flex justify-between flex-wrap">
            {repeated.map((rep) => (
              <div className="flex basis-1/2 mb-[110px]">
                <div className="flex basis-1/2 mx-auto flex-col card">
                  <div className="container mx-auto card-title">
                    {parse(rep.html)}
                  </div>
                  <div className="container card-content">
                    <h4>Name</h4>
                    {parse(rep.html).type}
                    <h4>Occurrences</h4>
                    {rep.occurrences}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
