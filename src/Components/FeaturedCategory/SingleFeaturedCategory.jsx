
import React from 'react';
import { Link } from 'react-router-dom';

const SingleFeaturedCategory = ({ category }) => {
    return (
        <div className="w-32 h-32 flex flex-col items-center justify-center text-center bg-base-100 shadow-2xl p-4 rounded-2xl">
            <Link to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="w-20 h-20 mb-2">
                    <img src={category.icon} alt={category.name} className="w-full h-full object-contain" />
                </div>
                <p className="text-sm font-medium">{category.name}</p>
            </Link>
        </div>

    );
};

export default SingleFeaturedCategory;