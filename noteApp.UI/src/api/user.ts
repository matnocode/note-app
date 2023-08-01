export const url = "https://localhost:5001/";

export const registerUser = (name: string, password: string) => {
  return fetch(
    url + `api/user/registerUser?username=${name}&password=${password}`
  );
};

export const loginUser = (name: string, password: string) => {
  return fetch(
    url + `api/user/loginUser?username=${name}&password=${password}`
  );
};
