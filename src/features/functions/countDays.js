export const countDays = (_date) => {
  let days = Math.floor((new Date(_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  let str;
  let color;
  if (days > 1) {
    str = days + " days left"
    color = "green"
  }
  if (days == 1) {
    str = "tomorrow"
    color = "green"

  }
  if (days == 0) {
    str = "today"
    color = "orange"

  }
  if (days == -1) {
    str = "yesterday"
    color = "red"

  }
  if (days < -1) {
    days *= (-1)
    str = days + " days ago"
    color = "red"

  }
  return { str, color };
}