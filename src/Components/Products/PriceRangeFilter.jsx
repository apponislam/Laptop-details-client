import React, { useState, useCallback, useEffect } from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { debounce } from "lodash";

const PriceRangeFilter = ({ onPriceRangeChange, priceRange2 }) => {
    const [priceRange, setPriceRange] = useState([100, 4000]);

    // Sync internal state with prop changes
    useEffect(() => {
        setPriceRange(priceRange2);
    }, [priceRange2]);

    // Handle price range change with debounce
    const debouncedPriceChange = useCallback(
        debounce((newValue) => {
            onPriceRangeChange(newValue);
            // setPriceRange(priceRange2);
        }, 500), // Delay of 500ms
        []
    );

    const handlePriceRangeChange = (event, newValue) => {
        setPriceRange(newValue);
        debouncedPriceChange(newValue);
    };

    return (
        <Box>
            <Slider value={priceRange} onChange={handlePriceRangeChange} valueLabelDisplay="auto" min={0} max={5000} step={10} marks />
            <p className="mb-4">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
            </p>
        </Box>
    );
};

export default PriceRangeFilter;
