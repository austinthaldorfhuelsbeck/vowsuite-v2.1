const greeting = (name: string | null) => {
  const now = new Date();
  const hour = now.getHours();
  let message = "Hello! 👋";
  if (name) {
    message = `Hello, ${name}! 👋`;
    if (hour < 4) message = `Burning that midnight oil, ${name}? 💤`;
    if (4 <= hour && hour < 12) message = `Good morning, ${name}! 🔆`;
    if (12 <= hour && hour < 17) message = `Good afternoon, ${name}! 👋`;
    if (17 <= hour) message = `Good evening, ${name}! 🌙`;
  }
  return message;
};

export default greeting;
