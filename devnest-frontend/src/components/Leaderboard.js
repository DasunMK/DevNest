function loadLeaderboard() {
    fetch("/api/leaderboard")
      .then(res => res.json())
      .then(data => {
        const ol = document.getElementById("leaderboard");
        ol.innerHTML = "";
        data.forEach((u, i) => {
          const li = document.createElement("li");
          li.textContent = `${u.username} - ${u.points} pts`;
          ol.appendChild(li);
        });
      });
  }