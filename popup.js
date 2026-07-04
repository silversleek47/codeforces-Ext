const injectBtn = document.getElementById("injectBtn");
const statusEl = document.getElementById("status");

injectBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];

    if (!tab || !tab.url || !tab.url.includes("codeforces.com")) {
      statusEl.textContent = "Open a Codeforces page first.";
      return;
    }

    chrome.tabs.sendMessage(tab.id, { action: "injectTemplate" }, (response) => {
      if (chrome.runtime.lastError) {
        statusEl.textContent = "Couldn't reach the page, try refreshing it.";
        return;
      }

      if (response && response.success) {
        statusEl.textContent = "Template injected.";
      } else {
        statusEl.textContent = (response && response.error) || "Something went wrong.";
      }
    });
  });
});
