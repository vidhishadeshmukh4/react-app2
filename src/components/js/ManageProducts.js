import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/ManageProducts.css'; // Optional: Create a CSS file for styling

function ManageProducts() {
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState('');
    const [packageType, setPackageType] = useState('');
    const [flavour, setFlavour] = useState('');
    const [productType, setProductType] = useState(''); // New state for product_type
    const [editingProductId, setEditingProductId] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3008/products');
            console.log('Fetched products:', response.data); // Log the fetched data
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProductId) {
                // Update product
                await axios.put('http://localhost:3008/products/${editingProductId}', {
                    product_name: productName,
                    package_type: packageType,
                    flavour,
                    product_type: productType, // Include product_type
                });
                setMessage('Product updated successfully!');
            } else {
                // Add new product
                await axios.post('http://localhost:3008/add_product', {
                    product_name: productName,
                    package_type: packageType,
                    flavour,
                    product_type: productType, // Include product_type
                });
                setMessage('Product added successfully!');
            }
            // Reset form fields
            setProductName('');
            setPackageType('');
            setFlavour('');
            setProductType(''); // Reset product_type
            setEditingProductId(null);
            fetchProducts(); // Refresh the product list
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error: ' + (error.response?.data?.error || 'Something went wrong'));
        }
    };

    const handleEdit = (product) => {
        setProductName(product.product_name);
        setPackageType(product.package_type);
        setFlavour(product.flavour);
        setProductType(product.product_type); // Set product_type
        setEditingProductId(product.product_id);
    };

    const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete('http://localhost:3008/products/${productId}');
                setMessage('Product deleted successfully!');
                fetchProducts(); // Refresh the product list
            } catch (error) {
                console.error('Error deleting product:', error);
                setMessage('Error deleting product. Please try again.');
            }
        }
    };

    return (
        <div className="manage-products">
            <h2>Manage Products</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Product Name"
                    required
                />
                <input
                    type="text"
                    value={packageType}
                    onChange={(e) => setPackageType(e.target.value)}
                    placeholder="Package Type"
                    required
                />
                <input
                    type="text"
                    value={flavour}
                    onChange={(e) => setFlavour(e.target.value)}
                    placeholder="Flavour"
                    required
                />
                <input
                    type="text"
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    placeholder="Product Type"
                    required
                />
                <button type="submit">{editingProductId ? 'Update' : 'Add'} Product</button>
            </form>
            {message && <p>{message}</p>}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Package Type</th>
                        <th>Flavour</th>
                        <th>Product Type</th> {/* New column for product_type */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product.product_id}>
                                <td>{product.product_id}</td>
                                <td>{product.product_name}</td>
                                <td>{product.package_type}</td>
                                <td>{product.flavour}</td>
                                <td>{product.product_type}</td> {/* Display product_type */}
                                <td>
                                    <button onClick={() => handleEdit(product)}>Edit</button>
                                    <button onClick={() => handleDelete(product.product_id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No products available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ManageProducts;