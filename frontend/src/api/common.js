export const tokenHeader = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const header = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  };
  return header;
};

export const responseError = (e) => {
  if (e.response && e.response.status === 401) {
    localStorage.removeItem("auth");
  }
  const message = e.response ? e.response.data.message : e.message;
  return new Error(message);
}

