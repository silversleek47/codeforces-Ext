const CPP_TEMPLATE = `#include <bits/stdc++.h>

using namespace std;

void solve() {
    // Your code here
}

int main() {
    // Optimize standard I/O operations for speed
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int t;
    cin >> t;
    while (t--) {
        solve();
    }
    
    return 0;
}`;

function clickbox() {
  // 1. Force Codeforces into plain text mode to avoid background JS errors
  const toggleCheckbox = document.getElementById("toggleEditorCheckbox");
  if (toggleCheckbox && !toggleCheckbox.checked) {
    toggleCheckbox.click(); 
  }
}

  clickbox();

function injectTemplate() {
  const textarea = document.getElementById("sourceCodeTextarea");

  if (!textarea) {
    return { success: false, error: "Couldn't find the editor on this page." };
  }

  textarea.value = CPP_TEMPLATE;
  textarea.dispatchEvent(new Event("input", { bubbles: true }));

  return { success: true };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action !== "injectTemplate") {
    return;
  }

  sendResponse(injectTemplate());
});
