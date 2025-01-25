async function getAllOrderDetails() {
  const orderDetailTable = document.getElementById("orderDetailTable");
  orderDetailTable.innerHTML = ""; // Clear the table before adding new data

  try {
    await fetch("http://localhost:2000/api/orderDetail/all")
    .then((response) => {
      if (!response.ok) {
      // Check if the response status is not OK
      throw new Error(`Error: ${response.status}`);
    }
    return response.json()
    }).then((data) => {
      // console.log(data.data[0]._id);
      // window.alert(data.data[0]._id)
    const orderDetails = data.data

    if (orderDetails.length === 0) {
      orderDetailTable.innerHTML = `<tr><td colspan="4" class="text-center">No order details found.</td></tr>`;
    } else {
      orderDetails.forEach((orderDetail, index) => {
        orderDetailTable.innerHTML += `
          <tr>
            <td>${index + 1}</td>  <!-- Display the correct index -->
            <td>${orderDetail.name}</td>
            <td>${orderDetail.quantity}</td>
            <td>${orderDetail.price}</td>
            <td style="text-align:center">
              <button class="btn btn-warning btn-sm me-2" 
                      onclick="updateOrderDetail('${orderDetail._id}', '${orderDetail.name}, ${orderDetail.quantity}, ${orderDetail.price}')">
                <i class="ti ti-pencil"></i>
              </button>
              <button class="btn btn-danger btn-sm me-2" onclick="deleteOrderDetail('${orderDetail._id}')">
                <i class="ti ti-trash"></i>
              </button>
            </td>
          </tr>`;
      });
    }
    })
    .catch((err) => {
      window.alert(err)
    });
  } catch (error) {
    console.error("Error fetching order details:", error.message);
    Swal.fire({
      title: "Error",
      text: "Failed to fetch order details. Please try again later.",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
}

getAllOrderDetails();


async function updateOrderDetail(id, currentName) {
  const name = currentName.split(",")[0]
  const quantity = currentName.split(",")[1]
  const price = currentName.split(",")[2]
  const { value: formValues } = await Swal.fire({
    title: "Update orderDetail",
//     html: `
//     <form action="/action_page.php">
//   <label for="status">Choose a status:</label>
//   <select name="status" id="status">
//     <option value="to'langan">to'langan</option>
//     <option value="tolanmagan">tolanmagan</option>
//   </select>
// </form>
//     `,
    html: `
      <form action="/action_page.php">
        <label for="name">Choose a name:</label>
        <input type="text" id="name" class="swal2-input" placeholder="${name}">
        <label for="quantity">Choose a quantity:</label>
        <input type="text" id="quantity" class="swal2-input" placeholder="${quantity}">
        <label for="price">Choose a price:</label>
        <input type="text" id="price" class="swal2-input" placeholder="${price}">
        
      </form>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Update",
    preConfirm: () => {
      const name = document.getElementById("name").value
      const quantity = document.getElementById("quantity").value
      const price = document.getElementById("price").value

      if (!name || !quantity || !price) {
        Swal.showValidationMessage("Please fill out both fields");
        return null;
      }

      return { name, quantity, price };
    },
  });

  if (formValues) {
    try {
      const response = await fetch(`http://localhost:2000/api/orderDetail/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      if (response.ok) {
        Swal.fire({
          title: "Updated!",
          text: "OrderDetail has been updated.",
          icon: "success",
        });
        getAllOrderDetails()

      } else {
        throw new Error(`Failed to update orderDetail with status ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating orderDetail:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to update orderDetail. Please try again.",
        icon: "error",
      });
    }
  }
}


async function deleteOrderDetail(id) {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    })
    if(result.isConfirmed){
      const response = await fetch(`http://localhost:2000/api/orderDetail/delete/${id}`, {
        method: "DELETE",
      });
      if(!response.ok){
        throw new Error(`Failed to delete category with status ${response.status}`);
      }
      Swal.fire({
        title: "Deleted!",
        text: "Category has been deleted.",
        icon: "success",
        confirmButtonText: "OK",
      });
        getAllOrderDetails()

    }
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "Failed to delete orderDetail. Please try again.",
      icon: "error",
      confirmButtonText: "OK"
    })
  }
}