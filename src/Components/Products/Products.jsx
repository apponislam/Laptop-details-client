import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LaptopCard from "../LaptopCard/LaptopCard";
import { PacmanLoader } from "react-spinners";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const Products = () => {
    const axiosPublic = useAxiosPublic();
    // const { count } = useLoaderData();

    // // Range
    const [priceRange, setPriceRange] = useState([0, 4000]);
    const [price1, setPrice1] = useState(0);
    const [price2, setPrice2] = useState(4000);

    const handlePriceRangeChange = (value) => {
        setPriceRange(value);
        setPrice1(priceRange[0]);
        setPrice2(priceRange[1]);
        // const price1 = priceRange[0];
        // const price2 = priceRange[1];
        // console.log(price1, price2);
        // console.log("Selected Price Range:", value);
    };

    // Select Brand
    const [Brand, setBrand] = useState("");
    const changeBrand = (e) => {
        setBrand(e.target.value);
        setCurrentPage(0);
    };

    // Select Category
    const [Category, setCategory] = useState("");
    const changeCategory = (e) => {
        setCategory(e.target.value);
        setCurrentPage(0);
    };

    // Select Price
    const [Price, setPrice] = useState("");
    const changePrice = (e) => {
        setPrice(e.target.value);
    };

    // // console.log(Price);
    // console.log(Category);
    // // console.log(Brand);

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const {
        data: count = 0,
        isLoading: isCountLoading,
        refetch: refetchCount,
    } = useQuery({
        queryKey: ["laptopsCount", Category, Brand],
        queryFn: async () => {
            const res = await axiosPublic.get(`/LaptopsCount?category=${Category}&brand=${Brand}`);
            return res.data.count;
        },
    });

    const [currentPage, setCurrentPage] = useState(0);
    const itemperPage = 10;
    const numberOfPages = Math.ceil(count / itemperPage);
    const pages = [...Array(numberOfPages).keys()];
    // console.log(pages);

    const {
        data: laptops = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["laptops", currentPage, itemperPage, Brand, Category, Price],
        queryFn: async () => {
            const res = await axiosPublic.get(`/laptops?page=${currentPage}&size=${itemperPage}&brand=${Brand}&category=${Category}&priceSort=${Price}`);
            return res.data;
        },
    });

    useEffect(() => {
        refetch();
        refetchCount();
    }, [Category]);

    // useEffect(() => {

    // }, [Category]);

    // console.log(laptops);

    // const homeLaptops = laptops.slice(0, 6);
    // console.log(homeLaptops);

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <PacmanLoader color="#00203f" />
            </div>
        );
    }

    return (
        <div className="container mx-auto my-20">
            <h1 className="text-center uppercase text-4xl mb-10">Products - {count}</h1>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-5">
                <select onChange={changeBrand} value={Brand} className="select select-bordered w-full">
                    <option value="">Brand</option>
                    <option>Apple</option>
                    <option>Dell</option>
                    <option>HP</option>
                    <option>Microsoft</option>
                    <option>Acer</option>
                    <option>Dell</option>
                    <option>Razer</option>
                    <option>Asus</option>
                    <option>MSI</option>
                    <option>Gigabyte</option>
                    <option>Lenovo</option>
                    <option>Samsung</option>
                    <option>Google</option>
                </select>
                <select onChange={changeCategory} value={Category} className="select select-bordered w-full">
                    <option value="">Category</option>
                    <option>Normal</option>
                    <option>Gaming</option>
                    <option>Heavy</option>
                </select>
                <select onChange={changePrice} value={Price} className="select select-bordered w-full">
                    <option value="">Price</option>
                    <option value="lowtohigh">Low to High</option>
                    <option value="hightolow">High to Low</option>
                </select>
                <div className="flex items-center">
                    <div className="w-full">
                        <RangeSlider
                            className="mb-2"
                            min={0}
                            max={4000}
                            defaultValue={priceRange} // Set the default values
                            onInput={handlePriceRangeChange} // Handle changes to the range
                        />
                        <div className="flex justify-between items-center px-3">
                            <p className="text-xs">{price1}</p>
                            <p className="text-xs">{price2}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {laptops.map((laptop) => (
                    <LaptopCard key={laptop._id} laptop={laptop}></LaptopCard>
                ))}
            </div>
            <div className="flex items-center justify-center gap-1 pagination my-4">
                {/* <p>Cuttent Page {currentPage}</p> */}
                <button onClick={prevPage} className="btn text-white bg-blue-600 h-auto hover:bg-blue-600 hover:text-white">
                    Prev
                </button>
                {pages.map((page, index) => (
                    <button onClick={() => setCurrentPage(page)} key={index} className={`w-10 h-10 text-white bg-blue-600 ${currentPage === page && "selected"} hover:bg-[#00203f] hover:text-white btn`}>
                        {index + 1}
                    </button>
                ))}
                <button onClick={nextPage} className="btn text-white bg-blue-600 h-auto hover:bg-blue-600 hover:text-white">
                    Next
                </button>
            </div>
        </div>
    );
};

export default Products;
