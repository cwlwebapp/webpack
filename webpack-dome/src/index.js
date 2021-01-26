import _ from "lodash";
import printMe from "./print.js";
import jquery from 'jquery';
console.log('one');

function component() {
  let element = document.createElement("div");
  let btn = document.createElement("button");

  element.innerHTML = _.join(["Hello", "webpack"], " ");

  btn.innerHTML = "Click me and check the console!";
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());




if (module.hot) {
  module.hot.accept("./print.js", function () {
    console.log("Accepting the updated printMe module!!!");
    printMe();
  });
}
