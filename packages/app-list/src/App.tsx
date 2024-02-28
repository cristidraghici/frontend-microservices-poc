import { useState, useEffect } from "react";
import EventBus from "common-state";
import "./App.scss";

import { DEFAULT_LIST } from "./constants";

function App() {
  const [list, setList] = useState<string[]>(DEFAULT_LIST);

  useEffect(() => {
    EventBus.subscribe("list:update", (newList: string[]) => {
      setList(newList);
    });
  }, []);

  return (
    <div className="AppList">
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
