import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { RecoilRoot } from "recoil";
import { AppContainer } from "./AppContainer";

function App() {
  return (
    <RecoilRoot>
      <AppContainer />
    </RecoilRoot>
  );
}

export default App;
