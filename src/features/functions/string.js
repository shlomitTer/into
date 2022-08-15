export const shorten_a_string = (str, num) => {
  if (str.length > num)
    return (str.substring(0, num) + "...");

  else
    return str;
}