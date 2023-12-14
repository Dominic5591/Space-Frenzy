import Example from "./scripts/example";

document.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("main");
  // debugger;
  new Example(main);
  console.log("hello world");
});
