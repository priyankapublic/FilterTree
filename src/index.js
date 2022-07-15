import $ from "jQuery";
import React from "react";
import product from "../product";
import Filter from "./Filter";
import App from "./App.js";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

$("document").ready(function (e) {
  const filter = new Filter(product);
  filter.renderOptions($);
  filter.bindEventHandler($);
});

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App context={$("body")} />
  </StrictMode>
);
