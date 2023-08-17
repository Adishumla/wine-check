/* console.log("Hello from content script!");
document.addEventListener("DOMContentLoaded", function () {
  function extractWineNames() {
    const wineContainers = document.querySelectorAll(".css-18q0zs4");
    const wineNames = [];

    wineContainers.forEach((wineContainer) => {
      const wineNameExtractor = wineContainer.querySelector("p").innerText;
      const wineName = wineNameExtractor.trim();
      wineNames.push(wineName);
    });

    console.log("Extracted Wine Names:", wineNames);

    // Send extracted wine names to the popup script
    chrome.runtime.sendMessage({ action: "displayWineNames", wineNames });
  }

  // Observer callback function
  function mutationCallback(mutationsList, observer) {
    console.log("Hello from mutation callback!");
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        extractWineNames();

        // Insert a div in the wine box
        const wineBoxes = document.querySelectorAll(".css-1spqwqt");
        wineBoxes.forEach((wineBox) => {
          const wineBoxDiv = document.createElement("div");
          wineBoxDiv.innerHTML = "Hello World";
          wineBox.appendChild(wineBoxDiv);
        });

        break;
      }
    }
  }

  // Create a MutationObserver to watch for changes
  const observer = new MutationObserver(mutationCallback);

  // Observe the target node for changes in its children
  const targetNode = document.body;
  const observerConfig = { childList: true, subtree: true };
  observer.observe(targetNode, observerConfig);

  // Call the function to initially extract wine names
  extractWineNames();
});
 */
