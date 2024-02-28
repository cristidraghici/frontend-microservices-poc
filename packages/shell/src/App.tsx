import { FunctionComponent, useEffect } from "react";
import MicroFrontendContainer from "./components/MicroFrontendContainer";
import EventBus from "common-state";

import { APP_INFO } from "./config";

import "./App.css";

const App: FunctionComponent = () => {
  useEffect(() => {
    setTimeout(() => {
      EventBus.publish("list:update", [
        "Item 1",
        "Item 2",
        "Item 3",
        "Item 4",
        "Item 5",
        "Item 6",
      ]);
    }, 2000);
  }, []);

  return (
    <div className="wrapper">
      {APP_INFO.map((app) => (
        <MicroFrontendContainer
          className="MicroFrontend"
          key={app.id}
          id={app.id}
          url={app.url}
        />
      ))}
    </div>
  );
};

export default App;
