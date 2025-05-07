function getAISuggestions() {
    const code = document.getElementById("codeInput").value;
    fetch("/api/ai-review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: code })
    })
      .then(res => res.json())
      .then(data => {
        const ul = document.getElementById("suggestions");
        ul.innerHTML = "";
        data.suggestions.forEach(s => {
          const li = document.createElement("li");
          li.textContent = s;
          ul.appendChild(li);
        });
      });
  }