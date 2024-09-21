document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get(['summary'], (result) => {
      const summaryDiv = document.getElementById('summary');
      summaryDiv.innerHTML = result.summary || "No data available.";
    });
  
    document.getElementById('settings').addEventListener('click', () => {
      chrome.runtime.openOptionsPage();
    });
  });
  