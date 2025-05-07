function loadChallenges() {
    fetch("/api/challenges/today")
      .then(res => res.json())
      .then(challenges => {
        const list = document.getElementById("challenges");
        list.innerHTML = "";
        challenges.forEach(c => {
          const div = document.createElement("div");
          div.innerHTML = `<h4>${c.title}</h4><p>${c.description}</p><button>Start</button>`;
          list.appendChild(div);
        });
      });
  }