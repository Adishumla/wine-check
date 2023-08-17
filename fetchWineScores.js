export async function fetchWineScores(wineNames) {
  const wineObjects = [];

  for (const wineName of wineNames) {
    const apiUrl = `https://vivino.com/search/wines?q=${encodeURIComponent(
      wineName
    )}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.text();

      // Create a temporary DOM element to parse the data
      const tempElement = document.createElement("div");
      tempElement.innerHTML = data;

      // Find the first wine card element
      const wineCard = tempElement.querySelector(".wine-card__averages");

      if (wineCard) {
        // Find the element with the average score
        const averageNumberElement = wineCard.querySelector(".average__number");

        if (averageNumberElement) {
          // Extract the average score
          const averageScore = averageNumberElement.textContent.trim();
          console.log("Average Score:", averageScore);

          // Create a wine object with name and score
          const wineObject = { name: wineName, score: averageScore };
          wineObjects.push(wineObject);
        }
      }
    } catch (error) {
      console.error("Error fetching wine score:", error);
    }
  }

  console.log("Wine Objects with Scores:", wineObjects);
}
