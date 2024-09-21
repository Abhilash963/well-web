document.getElementById('save').addEventListener('click', () => {
    let limit = document.getElementById('limit').value;
    
    chrome.storage.sync.set({ timeLimit: limit }, () => {
      alert('Settings saved.');
    });
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get('timeLimit', (data) => {
      document.getElementById('limit').value = data.timeLimit || 30;
    });
  });
  