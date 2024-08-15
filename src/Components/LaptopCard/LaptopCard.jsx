import React from "react";
import PropTypes from "prop-types";

const LaptopCard = ({ laptop }) => {
    // console.log(laptop);
    const { productImage, productName, description, ratings, brand, category, createdAt, price } = laptop;
    return (
        <div className="p-2 border border-[#00203f] rounded-xl">
            <div className="relative">
                <img className="w-full h-60 object-cover mb-3 rounded-t-xl" src={productImage} />
                <p className="bg-blue-600 py-2 px-4 absolute top-3 right-3 text-white rounded-2xl text-xs">Rating:- {ratings}</p>
                <p className="bg-blue-600 py-2 px-4 absolute top-3 left-3 text-white rounded-2xl text-xs">{brand}</p>
            </div>
            <div className="p-2">
                <p className="mb-3">
                    Name:- <span className="font-bold">{productName}</span>
                </p>
                <p className="mb-3">
                    <span className="font-bold">Category:-</span> {category}
                </p>
                <p className="mb-3">
                    <span className="font-bold">Created:-</span> {createdAt}
                </p>
                <p className="mb-3">
                    <span className="font-bold">Created:-</span> <span className="text-green-600 font-extrabold">${price}</span>
                </p>
                <p>
                    <span className="font-bold">Description:-</span> {description}
                </p>
            </div>
        </div>
    );
};

LaptopCard.propTypes = {
    laptop: PropTypes.object,
};

export default LaptopCard;
