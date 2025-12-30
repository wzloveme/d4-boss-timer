self.addEventListener("message", event => {
  if (event.data.type === "schedule") {
    schedule(event.data.lastBoss, event.data.before);
  }
});

function schedule(lastBoss, beforeMinutes) {
  const interval = 105 * 60 * 1000;
  const before = beforeMinutes * 60 * 1000;

  let now = Date.now();
  let nextBoss = lastBoss + interval;

  while (nextBoss <= now) {
    nextBoss += interval;
  }

  let notifyTime = nextBoss - before;
  let delay = notifyTime - now;

  if (delay > 0) {
    setTimeout(() => {
      self.registration.showNotification("暗黑 4 世界 Boss", {
        body: `还有 ${beforeMinutes} 分钟刷新`,
        icon: "icon.png"
      });

      // 🔄 自动安排下一次
      schedule(nextBoss, beforeMinutes);
    }, delay);
  }
}
