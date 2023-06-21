import { useState, useEffect } from "react";
import  { createProductCard } from "./ProductCard";
import { Grid } from "@mui/material";

function ProductGrid({load_endpoint}) {
    const [productList, setProductList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                const response = await fetch(load_endpoint, {method: "POST"});
                if (!response.ok) {
                  throw new Error("Failed to fetch data");
                }
        
                const data = await response.json();
                setProductList(data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData()
    }, [])

    return(
        <Grid container spacing={2}>
            {productList && productList.map((product) => {
                return(
                    <Grid item xs={12} sm={4} md={2} lg={2}>
                        {createProductCard(product)}
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default ProductGrid