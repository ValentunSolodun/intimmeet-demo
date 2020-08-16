export default () => {
  const current = localStorage.getItem('user')
  if (!current) return null;
  return JSON.parse(current)
}
