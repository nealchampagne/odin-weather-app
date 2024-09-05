import { clearChildren } from "./clearchildren";

// Display a loading message while waiting for data to come back from fetch
export const loadingScreen = () => {
  const content = document.getElementById("content");
  const loadingMessage = document.createElement("div");

  clearChildren(content);

  loadingMessage.classList.add("loadingmessage");

  loadingMessage.textContent = "Loading...";

  content.appendChild(loadingMessage);
};
