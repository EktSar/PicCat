export function getDate(fullDate) {
  const arrDate = fullDate.substring(0, 10).split('-');
  return `${arrDate[2]}.${arrDate[1]}.${arrDate[0]}`
}