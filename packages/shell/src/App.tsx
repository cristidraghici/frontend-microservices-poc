import { FunctionComponent, useEffect } from "react";
import MicroFrontendContainer from "./components/MicroFrontendContainer";
import EventBus from "common-state";

import { APP_INFO } from "./config";

import "./App.scss";

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
    <div className="Shell">
      {APP_INFO.map(({ id, url, version }) => (
        <MicroFrontendContainer
          className="MicroFrontend"
          key={id}
          id={id}
          url={url}
          version={version}
        />
      ))}
    </div>
  );
};

export default App;
