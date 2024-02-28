import { FunctionComponent } from "react";
import MicroFrontendContainer from "./components/MicroFrontendContainer";

import { APP_INFO } from "./config";

import "./App.css";

const App: FunctionComponent = () => {
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
