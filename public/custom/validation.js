function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
}


// function isTokenExpired(token) {
//   alert("refresh")
//   const expTime = getTokenExpTime(token);
//   return expTime && new Date() >= expTime;
// }

// const accessToken = document.cookie
//   .split("; ")
//   .find((row) => row.startsWith("accessToken="))
//   ?.split("=")[1];

// if (accessToken && isTokenExpired(accessToken)) {
//   alert("refresh token")
//   await refreshToken();
// }





async function checkToken() {
  const main = document.getElementById("main");
  if (main)
    main.style.display = "none";

  const currentPath = window.location.pathname;
  const token = getCookie("accessToken");
  console.log("Token from cookie:", token);

  if (!token && currentPath !== "/login" && currentPath !== "/register") {
    window.location.href = "/login";
  } else if (token && main) {
    main.style.display = "block";
  }
}


// isTokenExpired(accessToken);
checkToken();
