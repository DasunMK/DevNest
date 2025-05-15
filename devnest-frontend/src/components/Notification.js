function loadLeaderboard() {
  fetch("/api/leaderboard")
    .then(res => res.json())
    .then(data => {
      // Request permission if not already granted
      if (Notification.permission !== "granted") {
        Notification.requestPermission().then(permission => {
          if (permission !== "granted") return;
          showLeaderboardNotification(data);
        });
      } else {
        showLeaderboardNotification(data);
      }
    });

  function showLeaderboardNotification(data) {
    const topUsers = data.slice(0, 3) // show top 3 users
      .map((u, i) => `${i + 1}. ${u.username} - ${u.points} pts`)
      .join('\n');
    new Notification("🏆 Leaderboard", { body: topUsers });
  }
}
