import React from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LaptopCard from "../LaptopCard/LaptopCard";
import { PacmanLoader } from "react-spinners";

const Products = () => {
    const axiosPublic = useAxiosPublic();

    const { data: laptops = [], isLoading } = useQuery({
        queryKey: ["laptops"],
        queryFn: async () => {
            const res = await axiosPublic.get("/laptops");
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
            <h1 className="text-center uppercase text-4xl mb-10">Products</h1>
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
        </div>
    );
};

export default Products;
