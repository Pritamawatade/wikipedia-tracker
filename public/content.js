let userID = 1;
// Listener for messages from the popup or background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "getProgress") {
    const progress = calculateReadingProgress();
    sendResponse({ progress }); // Send the calculated progress back to the popup
    sendProgressToBackend(userID, window.location.href, progress);
  }
});


// Function to calculate reading progress
function calculateReadingProgress() {
  const scrollPosition = window.scrollY; // Current scroll position
  const pageHeight = document.body.scrollHeight - window.innerHeight; // Total scrollable height
  const progress = Math.round((scrollPosition / pageHeight) * 100);
  sendProgressToBackend(userID, window.location.href, progress);
  return progress;
}

console.log(calculateReadingProgress());


// Function to save progress using the fetch API
async function saveProgress(progress) {
  const currentUrl = window.location.href; // Get the current page URL

  try {
    // Make a POST request to save the progress
    const response = await fetch("http://127.0.0.1:8000/api/progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: userID,
        url: currentUrl,
        progress: progress,
      }),
    });

    if (!response.ok) {
      console.error("Failed to save progress:", response.statusText);
    } else {
      console.log("Progress saved successfully");
    }
  } catch (error) {
    console.error("Error while saving progress:", error);
  }
}


function sendProgressToBackend(userId, articleUrl, progressPercentage) {
  fetch("http://127.0.0.1:8000/api/progress", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          user_id: userId,
          article_url: articleUrl,
          progress_percentage: progressPercentage,
      }),
  })
  .then(response => response.json())
  .then(data => {
      console.log("Progress saved successfully:", data);
  })
  .catch(error => {
      console.error("Error saving progress:", error);
  });
}






window.addEventListener("scroll", () => {
  const progress = calculateReadingProgress();
  console.log(progress);
  chrome.runtime.sendMessage({ type: "updateProgress", progress });
  chrome.storage.local.set({ [window.location.href]: progress });

});
