function isTokenExpired(token) {
  const expTime = getTokenExpTime(token);
  return expTime && new Date() >= expTime;
}



async function login() {
  const login = document.getElementById("login");
  const form = document.getElementById("login-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:2000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire({
          title: "Error",
          text: data.message || "Login failed. Please try again.",
          icon: "error",
        });
        return;
      }
      
      login.style.display = "none";

      Swal.fire({
        title: "Success",
        text: "Login successful!",
        icon: "success",
      }).then(() => {
        window.location.href = "/";
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to log in. Please check your internet connection and try again.",
        icon: "error",
      });
      console.error("Error during login:", error);
    }
  });
}

async function register() {
  const form = document.getElementById("register-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;

    try {
      const response = await fetch("http://localhost:2000/api/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ first_name, last_name, email, password, phone })
      });

      if (response.ok) {
        Swal.fire({
          title: "Created!",
          text: "Admin registered successfully.",
          icon: "success",
        }).then(() => {
          window.location.href = "/";
          form.reset();
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: "Error",
          text: errorData.message || "Failed to register admin. Please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to register admin. Please check your internet connection and try again.",
        icon: "error",
      });
      console.error("Error during registration:", error);
    }
  });
}


async function refreshToken() {
  try {
    const response = await fetch("http://localhost:2000/api/admin/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      console.log("Refresh token failed");
      document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/login";
      return null;
    }

    const data = await response.json();
    if (data.message && data.message == "jwt expired") {
      console.log("Refresh expired");
      window.location.href = "/admin_login";
    }
    document.cookie = `accessToken=${data.accessToken}; path=/; secure; SameSite=Strict`;

    return data.accessToken;
  } catch (error) {
    console.error("Refresh token error: ", error);
    window.location.href = "/login";
  }
}


async function logout() {
  try {
    const response = await fetch("http://localhost:2000/api/admin/logout", {
      method: "POST",
      credentials: "include", 
    });

    if (response.ok) {
      Swal.fire({
        title: "Logged Out",
        text: "You have successfully logged out.",
        icon: "success",
      }).then(() => {
        window.location.href = "/login";
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Failed to log out. Please try again.",
        icon: "error",
      });
    }
  } catch (error) {
    console.error("Logout error:", error);
    Swal.fire({
      title: "Error",
      text: "An error occurred while logging out. Please try again.",
      icon: "error",
    });
  }
}



register();
login();