import React, { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LaptopCard from "../LaptopCard/LaptopCard";
import { PacmanLoader } from "react-spinners";
import { useLoaderData } from "react-router-dom";

const Products = () => {
    const axiosPublic = useAxiosPublic();
    const { count } = useLoaderData();

    const [currentPage, setCurrentPage] = useState(0);
    const itemperPage = 10;
    const numberOfPages = Math.ceil(count / itemperPage);
    const pages = [...Array(numberOfPages).keys()];
    // console.log(pages);

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

    const { data: laptops = [], isLoading } = useQuery({
        queryKey: ["laptops", currentPage, itemperPage],
        queryFn: async () => {
            const res = await axiosPublic.get(`/laptops?page=${currentPage}&size=${itemperPage}`);
            return res.data;
        },
    });

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
            <h1 className="text-center uppercase text-4xl mb-10">All Products - {count}</h1>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-5">
                <select className="select select-bordered w-full">
                    <option disabled selected>
                        Who shot first?
                    </option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
                </select>
                <select className="select select-bordered w-full">
                    <option disabled selected>
                        Who shot first?
                    </option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
                </select>
                <select className="select select-bordered w-full">
                    <option disabled selected>
                        Who shot first?
                    </option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
                </select>
                <select className="select select-bordered w-full">
                    <option disabled selected>
                        Who shot first?
                    </option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {laptops.map((laptop) => (
                    <LaptopCard key={laptop._id} laptop={laptop}></LaptopCard>
                ))}
            </div>
            <div className="flex items-center justify-center gap-1 pagination my-4">
                {/* <p>Cuttent Page {currentPage}</p> */}
                <button onClick={prevPage} className="btn text-[#00203f] bg-[#adefd1] h-auto hover:bg-[#adefd1] hover:text-[#00203f]">
                    Prev
                </button>
                {pages.map((page, index) => (
                    <button onClick={() => setCurrentPage(page)} key={index} className={`w-10 h-10 text-[#00203f] bg-[#adefd1] ${currentPage === page && "selected"} hover:bg-[#00203f] hover:text-white btn`}>
                        {index + 1}
                    </button>
                ))}
                <button onClick={nextPage} className="btn text-[#00203f] bg-[#adefd1] h-auto hover:bg-[#adefd1] hover:text-[#00203f]">
                    Next
                </button>
            </div>
        </div>
    );
};

export default Products;
