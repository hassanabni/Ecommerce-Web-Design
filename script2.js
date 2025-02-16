// // Login Form Handler
// document.getElementById('loginForm').addEventListener('submit', async (e) => {
//   e.preventDefault();
  
//   // Get values using proper IDs
//   const email = document.getElementById('loginEmail').value.trim().toLowerCase();
//   const password = document.getElementById('loginPassword').value;
//   const messageEl = document.getElementById('loginMessage');

//   try {
//     // Fetch user from JSON Server
//     const response = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(email)}`);
//     const users = await response.json();
    
//     if (users.length === 0) {
//       messageEl.textContent = "User not found";
//       messageEl.className = "message error";
//       return;
//     }

//     const user = users[0];
//     if (user.password !== password) {
//       messageEl.textContent = "Invalid password";
//       messageEl.className = "message error";
//       return;
//     }

//     // Store user session
//     localStorage.setItem('token', JSON.stringify({
//       id: user.id,
//       name: user.name,
//       email: user.email
//     }));
    
//     window.location.href = 'dashboard.html';
//   } catch (err) {
//     messageEl.textContent = "Login failed. Please try again.";
//     messageEl.className = "message error";
//   }
// });


//   // Registration Form Handler
// if (document.getElementById("registerForm")) {
//   document.getElementById("registerForm").addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const messageEl = document.getElementById("registerMessage");

//     // Get values using the CORRECT names
//     const name = formData.get("name");
//     const email = formData.get("email");
//     const password = formData.get("password");
//     const confirmPassword = formData.get("confirmPassword");

//     if (password !== confirmPassword) {
//       messageEl.textContent = "Passwords do not match";
//       messageEl.className = "message error";
//       return;
//     }

//     try {
//       // Check if email exists
//       const checkResponse = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(email)}`);
//       const existingUsers = await checkResponse.json();
      
//       if (existingUsers.length > 0) {
//         messageEl.textContent = "Email already registered";
//         messageEl.className = "message error";
//         return;
//       }

//       // Register user
//       const response = await fetch("http://localhost:3000/users", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: name,
//           email: email,
//           password: password,
//           shippingAddress: ""
//         })
//       });

//       if (response.ok) {
//         messageEl.textContent = "Registration successful! Please login.";
//         messageEl.className = "message success";
//         e.target.reset();
//       }
//     } catch (err) {
//       messageEl.textContent = "Registration failed";
//       messageEl.className = "message error";
//     }
//   });

//   // Mock API URL (using JSON Server)
// const API_URL = "http://localhost:3000";

// // Fetch and Display Orders
// async function fetchOrders() {
//   const token = JSON.parse(localStorage.getItem('token'));
//   if (!token) {
//     window.location.href = 'login.html';
//     return;
//   }

//   try {
//     const response = await fetch(`http://localhost:3000/orders?userId=${token.id}`);
//     const orders = await response.json();

//     const orderList = document.getElementById('orderList');
//     if (orders.length > 0) {
//       orderList.innerHTML = orders
//         .map(
//           (order) => `
//           <div class="order-item">
//             <h3>Order #${order.id}</h3>
//             <p>Date: ${new Date(order.date).toLocaleDateString()}</p>
//             <p>Total: $${order.total.toFixed(2)}</p>
//             <p>Status: ${order.status}</p>
//           </div>
//         `
//         )
//         .join('');
//     } else {
//       orderList.innerHTML = '<p class="no-orders">No orders found.</p>';
//     }
//   } catch (error) {
//     console.error('Error fetching orders:', error);
//     document.getElementById('orderList').innerHTML =
//       '<p class="error">Failed to load orders. Please try again later.</p>';
//   }
// }

// // Logout Functionality
// if (document.getElementById('logoutBtn')) {
//   document.getElementById('logoutBtn').addEventListener('click', () => {
//     localStorage.removeItem('token');
//     window.location.href = 'login.html';
//   });
// }

// // Fetch Orders on Page Load
// if (window.location.pathname.includes('dashboard.html')) {
//   fetchOrders();
// }

// // Handle account settings update
// document.getElementById("settingsForm").addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const formData = new FormData(e.target);
//   const updates = Object.fromEntries(formData.entries());

//   try {
//     // Simulate API call to update settings
//     await fetch(`${API_URL}/users/1`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updates),
//     });

//     document.getElementById("settingsMessage").textContent = "Settings updated successfully!";
//     document.getElementById("settingsMessage").className = "message success";
//   } catch (error) {
//     document.getElementById("settingsMessage").textContent = "Failed to update settings.";
//     document.getElementById("settingsMessage").className = "message error";
//   }
// });

// // Fetch data on page load
// fetchData();

// }
// Define your API URL (using JSON Server)
const API_URL = "http://localhost:3000";

// Ensure script runs only after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // ----- Login Form Handler -----
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      // Get values using proper IDs
      const email = document.getElementById("loginEmail").value.trim().toLowerCase();
      const password = document.getElementById("loginPassword").value;
      const messageEl = document.getElementById("loginMessage");

      try {
        // Fetch user from JSON Server
        const response = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(email)}`);
        const users = await response.json();
        
        if (users.length === 0) {
          messageEl.textContent = "User not found";
          messageEl.className = "message error";
          return;
        }

        const user = users[0];
        if (user.password !== password) {
          messageEl.textContent = "Invalid password";
          messageEl.className = "message error";
          return;
        }

        // Store user session
        localStorage.setItem(
          "token",
          JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email
          })
        );
        
        window.location.href = "dashboard.html";
      } catch (err) {
        messageEl.textContent = "Login failed. Please try again.";
        messageEl.className = "message error";
      }
    });
  }

  // ----- Registration Form Handler -----
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const messageEl = document.getElementById("registerMessage");

      // Get values using the correct names
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
      const confirmPassword = formData.get("confirmPassword");

      if (password !== confirmPassword) {
        messageEl.textContent = "Passwords do not match";
        messageEl.className = "message error";
        return;
      }

      try {
        // Check if email exists
        const checkResponse = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(email)}`);
        const existingUsers = await checkResponse.json();
        
        if (existingUsers.length > 0) {
          messageEl.textContent = "Email already registered";
          messageEl.className = "message error";
          return;
        }

        // Register user
        const response = await fetch(`${API_URL}/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            shippingAddress: ""
          })
        });

        if (response.ok) {
          messageEl.textContent = "Registration successful! Please login.";
          messageEl.className = "message success";
          e.target.reset();
        }
      } catch (err) {
        messageEl.textContent = "Registration failed";
        messageEl.className = "message error";
      }
    });
  }

  // ----- Logout Functionality -----
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = "login.html"; // Redirect to login page
    });
  }

  // ----- Fetch Orders on Dashboard -----
  if (window.location.pathname.includes("dashboard.html")) {
    fetchOrders();
  }

  // ----- Account Settings Update -----
  const settingsForm = document.getElementById("settingsForm");
  if (settingsForm) {
    settingsForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const updates = Object.fromEntries(formData.entries());

      try {
        // Simulate API call to update settings
        await fetch(`${API_URL}/users/1`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });

        document.getElementById("settingsMessage").textContent = "Settings updated successfully!";
        document.getElementById("settingsMessage").className = "message success";
      } catch (error) {
        document.getElementById("settingsMessage").textContent = "Failed to update settings.";
        document.getElementById("settingsMessage").className = "message error";
      }
    });
  }

  // Optionally, if fetchData is defined elsewhere, call it here
  if (typeof fetchData === "function") {
    fetchData();
  }
});

// ----- Fetch and Display Orders -----
async function fetchOrders() {
  const token = JSON.parse(localStorage.getItem("token"));
  if (!token) {
    window.location.href = "login.html"; // Redirect if not logged in
    return;
  }

  // Display username on the dashboard
  const userNameEl = document.getElementById("userName");
  if (userNameEl) {
    userNameEl.textContent = token.name;
  }

  try {
    const response = await fetch(`http://localhost:3000/orders?userId=${token.id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    const orders = await response.json();
    const orderList = document.getElementById("orderList");
    orderList.innerHTML = ""; // Clear previous content

    if (orders.length === 0) {
      orderList.innerHTML = '<p class="no-orders">No orders found.</p>';
      return;
    }

    // Create order items and append to the order list
    orders.forEach((order) => {
      const orderItem = document.createElement("div");
      orderItem.classList.add("order-item");
      orderItem.innerHTML = `
        <h3>Order #${order.id}</h3>
        <p>Date: ${new Date(order.date).toLocaleDateString()}</p>
        <p>Total: $${order.total.toFixed(2)}</p>
        <p>Status: ${order.status}</p>
      `;
      orderList.appendChild(orderItem);
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    const orderList = document.getElementById("orderList");
    if (orderList) {
      orderList.innerHTML = '<p class="error">Failed to load orders. Please try again later.</p>';
    }
  }
}

