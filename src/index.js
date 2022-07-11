import $ from "jQuery";
import product from "../product";
import Filter from "./Filter";
$("document").ready(function (e) {
  const filter = new Filter(product);
  filter.renderOptions($);
  filter.bindEventHandler($);
});
