import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { PacmanLoader } from "react-spinners";
import LaptopCard from "../LaptopCard/LaptopCard";

const Home = () => {
    const axiosPublic = useAxiosPublic();

    const { data: laptops = [], isLoading } = useQuery({
        queryKey: ["laptops"],
        queryFn: async () => {
            const res = await axiosPublic.get("/laptops");
            return res.data;
        },
    });
    console.log(laptops);

    const homeLaptops = laptops.slice(0, 6);
    console.log(homeLaptops);

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <PacmanLoader color="#00203f" />
            </div>
        );
    }

    return (
        <div className="container mx-auto my-24">
            <h1 className="text-center uppercase text-4xl mb-10">Top Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {homeLaptops.map((laptop) => (
                    <LaptopCard key={laptop._id} laptop={laptop}></LaptopCard>
                ))}
            </div>
        </div>
    );
};

export default Home;
