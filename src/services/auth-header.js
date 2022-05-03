export default function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user && user.accessToken) {
    // for Node.js Express back-end
    // return { 'x-access-token': user.accessToken };
    return { id: user.id, hash: user.accessToken };
  } else {
    return {};
  }
}
