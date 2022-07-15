import React from "react";
import "./style.css";
import { MyComponent } from "./MyComponent";
export default function App(props) {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <MyComponent context={props.context} />
    </div>
  );
}
