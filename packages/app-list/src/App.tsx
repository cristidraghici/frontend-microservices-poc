import "./App.css";

import { DEFAULT_LIST } from "./constants";

function App() {
  return (
    <ul>
      {DEFAULT_LIST.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export default App;
