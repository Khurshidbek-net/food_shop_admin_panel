async function fetchCategories() {
  const categoryTable = document.getElementById("categoryTable");
  categoryTable.innerHTML = "";

  try {
    const response = await fetch("http://localhost:2000/api/category/all");
    const categories = await response.json();

    if (categories.length === 0) {
      categoryTable.innerHTML = `<tr><td colspan="4" class="text-center">No categories found.</td></tr>`;
    } else {
      categories.forEach((category, index) => {
        categoryTable.innerHTML += `
          <tr>
            <td>${index + 1}</td>
            <td>${category.name}</td>
            <td>${category.description}</td>
            <td style="text-align:center">
            <button class="btn btn-warning btn-sm me-2" 
                    onclick="updateCategory('${category._id}', '${category.name}', '${category.description}')">
              <i class="ti ti-pencil"></i>
            </button>                  
            <button class="btn btn-danger btn-sm me-2" onclick="deleteCategory('${category._id}')"><i class="ti ti-trash"></i></button>
            </td>
          </tr>`;
      });
    }
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    Swal.fire({
      title: "Error",
      text: "Failed to fetch categories. Please try again later.",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
}

async function deleteCategory(id) {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      const response = await fetch(`http://localhost:2000/api/category/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete category with status ${response.status}`);
      }

      Swal.fire({
        title: "Deleted!",
        text: "Category has been deleted.",
        icon: "success",
        confirmButtonText: "OK",
      });

      fetchCategories();
    }
  } catch (error) {
    console.error("Error deleting category:", error.message);
    Swal.fire({
      title: "Error",
      text: "Failed to delete category. Please try again.",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
}

async function updateCategory(id, currentName, currentDescription) {
  const { value: formValues } = await Swal.fire({
    title: "Update Category",
    html: `
    <input type="text" id="name" class="swal2-input" value="${currentName}" placeholder="Category Name">
    <textarea id="description" class="swal2-textarea" placeholder="Category Description">${currentDescription}</textarea>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Update",
    preConfirm: () => {
      const name = document.getElementById("name").value;
      const description = document.getElementById("description").value;

      if (!name || !description) {
        Swal.showValidationMessage("Please fill out both fields");
        return null;
      }

      return { name, description };
    },
  });

  if (formValues) {
    try {
      const response = await fetch(`http://localhost:2000/api/category/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        Swal.fire({
          title: "Updated!",
          text: "Category has been updated.",
          icon: "success",
        });

      } else {
        throw new Error(`Failed to update category with status ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating category:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to update category. Please try again.",
        icon: "error",
      });
    }
  }
}


async function add() {
  const form = document.getElementById("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;


    try {
      const response = await fetch("http://localhost:2000/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Category created",
        showConfirmButton: false,
        timer: 1500
      });

      form.reset();
    }
    catch (error) {
      console.error("Error:", error.message);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to add the category. Please try again.",
        showConfirmButton: false,
        timer: 1500
      });
    }

  })
}

updateCategory();
deleteCategory();
fetchCategories();
add();