import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import * as React from "react";
import { getProductsUpdatedBefore } from "../services/ProductService.js";

export default function ProductName() {
    const [productUpdated, setProductUpdated] = React.useState('');
    const [products, setProducts] = React.useState([]); // Stores fetched products as an array
    const [error, setError] = React.useState(null);

    const handleFetchProduct = async () => {
        try {
            const response = await getProductsUpdatedBefore(productUpdated);
            setProducts(response);
            console.log('Fetched products: ', response);
        } catch (error) {
            setError('Error fetching products: ' + error.message);
            setProducts([]); // Clears products if error occurs
        }
    };

    const handleProductUpdatedChange = (event) => {
        setProductUpdated(event.target.value);
    };

    return (
        <div>
            <Box>
                <TextField
                    label="Product date YYYY/MM/DD"
                    value={productUpdated}
                    onChange={handleProductUpdatedChange}
                    margin="normal"
                />
                <Button
                    variant="contained"
                    sx={{ width: 250, height: 56, margin: 2 }}
                    onClick={handleFetchProduct}
                >
                    Get by date updated
                </Button>

                {/* Render products if available */}
                {products.length > 0 ? (
                    <Grid container spacing={2}>
                        {products.map((product) => (
                            <Grid item xs={12} sm={6} md={4} key={product.id}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        alt={product.name}
                                        height="500"
                                        image={product.images?.imageUrl1 || '/placeholder.png'}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="body2" component="div">
                                            Product ID: {product.id}
                                        </Typography>
                                        <Typography gutterBottom variant="body2" component="div">
                                            Name: {product.name}
                                        </Typography>
                                        <Typography variant="body2" component="div">
                                            Description: {product.description}
                                        </Typography>
                                        <Typography gutterBottom variant="body2" component="div">
                                            Price: R{product.price}
                                        </Typography>
                                        <Typography gutterBottom variant="body2" component="div">
                                            Stock: {product.stock}
                                        </Typography>
                                        <Typography gutterBottom variant="body2" component="div">
                                            Category ID: {product.categoryId}
                                        </Typography>
                                        <Typography gutterBottom variant="body2" component="div">
                                            Created date: {product.createdAt}
                                        </Typography>
                                        <Typography gutterBottom variant="body2" component="div">
                                            Updated date: {product.updatedAt}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    error && <Typography color="error">{error}</Typography>
                )}
            </Box>
        </div>
    );
}