import React, { useState, useEffect } from "react";

const App = () => {
  const [progress, setProgress] = useState(0);
  const [articleUrl, setArticleUrl] = useState("");

  // Fetch progress from local storage on component mount
  useEffect(() => {
    const fetchProgress = async () => {
      // Get the current tab's URL
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const url = tab.url;
      setArticleUrl(url);

      // Get progress for the current article from chrome.storage.local
      chrome.storage.local.get([url], (result) => {
        const savedProgress = result[url] || 0;
        setProgress(savedProgress);
      });
    };

    fetchProgress();
  }, []);

  return (
    <div style={{ "min-width": "700px" }} className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4 min-w-screen">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <header className="bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 text-white text-center p-4">
          <h1 className="text-2xl font-bold">Wikipedia Progress Tracker</h1>
          <p className="text-sm">Track your reading journey effortlessly</p>
        </header>
        <div className="p-6">
          {/* Progress Display */}
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32">
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-blue-500"
                style={{
                  clipPath: `polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)`,
                  transform: `rotate(${(progress / 100) * 360}deg)`,
                  transition: "transform 0.5s ease-in-out",
                }}
              ></div>
              <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center shadow-md">
                <p className="text-xl font-bold text-gray-800">{progress}%</p>
              </div>
            </div>
            <p className="mt-4 text-gray-600 text-sm text-center p-2">
              Progress for: <span className="font-semibold p-2">{articleUrl}</span>
            </p>
          </div>

          {/* Reset Button */}
          <div className="mt-6 flex justify-center">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
              onClick={() => {
                chrome.storage.local.set({ [articleUrl]: 0 }, () => {
                  setProgress(0);
                });
              }}
            >
              Reset Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
