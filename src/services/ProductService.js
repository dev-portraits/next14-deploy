const BASE_URL =  "https://api.escuelajs.co/api/v1/products"; 

export const createProduct = async (newProduct) => {
    try {
        console.log('Sending request to:', BASE_URL);
        console.log('Request body:', newProduct);

        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });

        const responseData = await response.json();
        console.log('Response status:', response.status);
        console.log('Response body:', responseData);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return responseData;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

export const getAllProducts = async () => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    } 
};

export const getProductById = async (productId) => {
    try {
        const response = await fetch(`${BASE_URL}/${productId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching product with ID ${productId}:`, error);
        throw error;
    }
};

export const editProduct = async (productId, updatedProduct) => {
    try {
        const response = await fetch(`${BASE_URL}/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify(updatedProduct),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error(`Error editing product with ID ${productId}:`, error);
        throw error;
    }
};

export const deleteProduct = async (productId) => {
    try {
        const response = await fetch(`${BASE_URL}/${productId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return true;
    } catch (error) {
        console.error(`Error deleting product with ID ${productId}:`, error);
        throw error;
    }
};
