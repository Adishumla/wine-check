console.log("Hello from popup script!");

const WINE_CONTAINER_SELECTOR = ".css-18q0zs4.e3wog7r1";
const WINE_NAME_SELECTOR = "p.css-54mqg2.e3wog7r0";
const WINE_BOX_SELECTOR = ".css-1spqwqt .e3whs8q0";
const FETCH_DELAY = 10000; // 10 seconds

// Create a MutationObserver to watch for changes in the wine boxes
const observer = new MutationObserver((mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      extractAndLogWineNames();
      applyStylesToWineBoxes();
      break;
    }
  }
});

async function fetchWineScores(wineNames) {
  const scores = [];
  for (const wineName of wineNames) {
    const proxyUrl = "https://api.allorigins.win/get?url=";
    const url = `https://vivino.com/search/wines?q=${encodeURIComponent(
      wineName
    )}`;
    const response = await fetch(proxyUrl + encodeURIComponent(url));
    const json = await response.json();
    const parser = new DOMParser();
    const htmlDocument = parser.parseFromString(json.contents, "text/html");
    const scoreElement = htmlDocument.querySelector(".average__number__1WVAW");
    if (scoreElement) {
      const score = scoreElement.textContent.trim();
      scores.push(score);
    } else {
      scores.push("Score not found");
    }
  }
  return scores;
}

// Observe the target node for changes in its children
const targetNode = document.body;
const observerConfig = { childList: true, subtree: true };
observer.observe(targetNode, observerConfig);

// Function to extract wine names and log them
async function extractAndLogWineNames() {
  const wineContainers = document.querySelectorAll(WINE_CONTAINER_SELECTOR);
  const wineNames = Array.from(wineContainers).map((wineContainer) => {
    const wineNameExtractor =
      wineContainer.querySelector(WINE_NAME_SELECTOR).innerText;
    return wineNameExtractor.trim();
  });

  console.log("Extracted Wine Names:", wineNames);

  // Fetch wine scores
  const wineScores = await fetchWineScores(wineNames);

  // Create array of wine objects with name and score
  const wines = wineNames.map((wineName, index) => {
    const wineScore = wineScores[index];
    return { name: wineName, score: wineScore };
  });

  console.log("Wines:", wines);

  // Add wine scores to wine containers
  wineContainers.forEach((wineContainer, index) => {
    const wineScore = wineScores[index];
    const wineScoreElement = document.createElement("p");
    wineScoreElement.innerText = `Score: ${wineScore}`;
    wineContainer.appendChild(wineScoreElement);
  });
}

// Function to apply styles to wine boxes
function applyStylesToWineBoxes() {
  const wineBoxes = document.querySelectorAll(WINE_BOX_SELECTOR);
  wineBoxes.forEach((wineBox) => {
    wineBox.style.color = "blue";
  });
}

// Call the functions initially
extractAndLogWineNames();
applyStylesToWineBoxes();
