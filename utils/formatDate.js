export const formatDate = (date) => {
  let d = new Date(date);

  const dateString = d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const timeString = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  console.log(dateString + ", " + timeString);

  return dateString + " " + timeString;
};
