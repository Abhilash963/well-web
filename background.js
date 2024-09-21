// Listen for tab activation or update (whenever the active tab changes or loads)
chrome.tabs.onActivated.addListener(() => {
    updateUsage();
  });
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status == 'complete') {
      updateUsage();
    }
  });
  
  // Function to update usage and trigger notifications if time limit is exceeded
  function updateUsage() {
    chrome.storage.sync.get(['summary', 'timeSpent', 'timeLimit'], (result) => {
      let currentTimeSpent = result.timeSpent || {};
      let timeLimit = result.timeLimit || 30; // Default time limit if not set by the user
      
      // Get the active tab's URL and domain
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        let url = new URL(tabs[0].url);
        let domain = url.hostname;
  
        // Track time spent on this domain
        if (!currentTimeSpent[domain]) {
          currentTimeSpent[domain] = 0; // Initialize time if domain is new
        }
        currentTimeSpent[domain] += 1; // Increment by 1 minute (or any time unit)
  
        // Check if the time spent exceeds the user-defined limit
        if (currentTimeSpent[domain] >= timeLimit) {
          // Trigger notification if limit exceeded
          chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon.png',
            title: 'Health Alert',
            message: `You've spent more than ${timeLimit} minutes on ${domain}. Consider taking a break.`
          });
        }
  
        // Update summary message and save the time spent back to storage
        let summary = `You have spent ${currentTimeSpent[domain]} minutes on ${domain} today.`;
        chrome.storage.sync.set({summary: summary, timeSpent: currentTimeSpent});
      });
    });
  }
  