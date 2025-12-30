let notifyTimer = null;

self.addEventListener("message", event => {
  if (event.data.type === "schedule") {
    if (notifyTimer) clearTimeout(notifyTimer);

    const interval = 105 * 60 * 1000;
    const lastBoss = event.data.lastBoss;
    const before = event.data.before * 60 * 1000;

    let now = Date.now();
    let nextBoss = lastBoss + interval;
    while (nextBoss <= now) {
      nextBoss += interval;
    }

    let notifyTime = nextBoss - before;
    let delay = notifyTime - now;

    if (delay > 0) {
      notifyTimer = setTimeout(() => {
        self.registration.showNotification("暗黑 4 世界 Boss 即将刷新", {
          body: `还有 ${event.data.before} 分钟`,
          icon: "icon.png"
        });
      }, delay);
    }
  }
});
