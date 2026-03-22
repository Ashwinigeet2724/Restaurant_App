export const getCSRFToken = () => {
  const cookies = document.cookie.split("; ");
  for (let c of cookies) {
    const [name, value] = c.split("=");
    if (name === "csrftoken") return value;
  }
  return null;
};
