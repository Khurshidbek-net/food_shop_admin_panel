async function AllProducts() {
    const spinner = document.getElementById("loadingSpinner");
    const tableWrapper = document.getElementById("productsTableWrapper");

    try {
        const response = await fetch("http://localhost:2000/api/product", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            mode: "cors",
        });

        if (response.ok) {
            const products = await response.json();
            spinner.style.display = "none";
            tableWrapper.style.display = "block";
            displayProduct(products);
        } else {
            throw new Error("Failed to fetch products");
        }
    } catch (error) {
        spinner.style.display = "none";
        Swal.fire({
            title: "Error",
            text: "Error fetching products",
            icon: "error",
        });
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
}

function calculateFinalPrice(price, discountValue) {
    if (discountValue) {
        return price - (price * (discountValue / 100));
    }
    return price;
}







function displayProduct(products) {
    const productList = document.getElementById("productTable");
    let item = "";

    products.forEach((product) => {
        const formattedStartDate = formatDate(product?.discount_id?.valid_from);
        const formattedEndDate = formatDate(product?.discount_id?.valid_to);
        const finalPrice = calculateFinalPrice(product.price, product?.discount_id?.discount_value);

        item += `
        <tr>
            <td><img src="/uploads/${product.image}" alt="Product Image" width="70" /></td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>$${product.price}</td>
            <td>${product.stock}</td>
            <td>${product?.category_id?.name}</td>
            <td>${product?.discount_id?.discount_value || "No Discount"}</td>
            <td>${formattedStartDate}</td>
            <td>${formattedEndDate}</td>
            <td>$${finalPrice.toFixed(2)}</td> <!-- Final Price with Discount -->
            <td>
                <button class="btn btn-success" data-bs-toggle="modal" onclick="editProduct('${product._id}')" data-bs-target="#editProductModal"><i class="fas fa-edit"></i> Edit</button>
                <button class="btn btn-danger" onclick="deleteProduct('${product._id}')"><i class="fas fa-trash"></i> Delete</button>
            </td>
        </tr>`;
    });

    productList.innerHTML = item;
}

async function editProduct(productId) {
    try {
        const response = await fetch(`http://localhost:2000/api/product/id/${productId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            mode: "cors",
        });

        if (response.ok) {
            const product = await response.json();
            document.getElementById("productName").value = product.name;
            document.getElementById("productDescription").value = product.description;
            document.getElementById("productPrice").value = product.price;
            document.getElementById("productStock").value = product.stock;
            document.getElementById("editProductForm").setAttribute("data-product-id", productId);
        } else {
            Swal.fire({
                title: "Error",
                text: "Failed to fetch product details",
                icon: "error",
            });
        }
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "Failed to fetch product details",
            icon: "error",
        });
    }
}

document.getElementById("editProductForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const productId = this.getAttribute("data-product-id");
    const formData = new FormData(this);

    const name = document.getElementById("productName").value;
    const description = document.getElementById("productDescription").value;
    const price = document.getElementById("productPrice").value;
    const stock = document.getElementById("productStock").value;
    const imageFile = document.getElementById("productImage").files[0];

    formData.append("data", JSON.stringify({ name, description, price, stock }));
    if (imageFile) formData.append("image", imageFile);

    try {
        const response = await fetch(`http://localhost:2000/api/product/update/${productId}`, {
            method: "PUT",
            body: formData,
        });

        if (response.ok) {
            Swal.fire({
                title: "Success",
                text: "Product updated successfully",
                icon: "success",
            });
            setTimeout(() => window.location.reload(), 1000);
        } else {
            Swal.fire({
                title: "Error",
                text: "Failed to update product",
                icon: "error",
            });
        }
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "Failed to update product",
            icon: "error",
        });
    }
});

async function deleteProduct(productId) {
    try {
        const response = await fetch(`http://localhost:2000/api/product/delete/${productId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            Swal.fire({
                title: "Success",
                text: "Product deleted successfully",
                icon: "success",
            });
            setTimeout(() => window.location.reload(), 1000);
        } else {
            throw new Error("Failed to delete product");
        }
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "Failed to delete product",
            icon: "error",
        });
    }
}



async function getDiscounts() {
    try {
        const response = await fetch("http://localhost:2000/api/discount", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            mode: "cors",
        })
        console.log(response)
        if (response.ok) {
            const data = await response.json()
            console.log(data)
        } else {
            Swal.fire({
                title: "Error",
                title: "fetching products",
                icon: "error"
            })
        }
    } catch (error) {
        Swal.fire({
            title: "Error",
            title: error.message,
            icon: "error"
        })
    }
}
AllProducts();
getDiscounts();
