import React, { useState } from "react";
import axios from "axios";

function ProductForm() {
    // State for product details
    const [product, setProduct] = useState({
        name: "",
        description: "",
        unitPrice: "",
        sku: "",
        unitsInStock: "",
        categoryId: "",
    });

    // State for the image
    const [image, setImage] = useState(null);

    // Handle input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    // Handle image file change
    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        // Append product data as a JSON string
        formData.append("product", JSON.stringify(product));
        // Append the selected image file
        formData.append("image", image);

        try {
            // Make POST request to backend API
            const response = await axios.post("http://localhost:8080/api/products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Handle successful response
            console.log("Product uploaded successfully", response.data);
            alert("Product uploaded successfully!");
        } catch (error) {
            // Handle error
            console.error("Error uploading product", error);
            alert("Error uploading product");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Upload Product</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                    <label>Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                        style={{ padding: "8px", width: "100%" }}
                    />
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                        style={{ padding: "8px", width: "100%" }}
                    />
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <label>Unit Price</label>
                    <input
                        type="number"
                        name="unitPrice"
                        value={product.unitPrice}
                        onChange={handleChange}
                        required
                        style={{ padding: "8px", width: "100%" }}
                    />
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <label>SKU</label>
                    <input
                        type="text"
                        name="sku"
                        value={product.sku}
                        onChange={handleChange}
                        required
                        style={{ padding: "8px", width: "100%" }}
                    />
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <label>Units in Stock</label>
                    <input
                        type="number"
                        name="unitsInStock"
                        value={product.unitsInStock}
                        onChange={handleChange}
                        required
                        style={{ padding: "8px", width: "100%" }}
                    />
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <label>Category ID</label>
                    <input
                        type="number"
                        name="categoryId"
                        value={product.categoryId}
                        onChange={handleChange}
                        required
                        style={{ padding: "8px", width: "100%" }}
                    />
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <label>Product Image</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        required
                        style={{ padding: "8px", width: "100%" }}
                    />
                </div>

                <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}>
                    Upload Product
                </button>
            </form>
        </div>
    );
}

export default ProductForm;
