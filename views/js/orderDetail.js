const getAllOrderDetails = async (req, res) => {
    try {
        const data = await fetch("http://localhost:2000/api/orderDetail/all")
        console.log("data: ", data);
    } catch (error) {
        console.log(error.message);
    }
}

function display(data) {
  const List = document.getElementById("orderDetail-list");
  data.forEach((element) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${element.name} - ${element.quantity} - ${element.price}`;
    List.appendChild(listItem);
  });
}