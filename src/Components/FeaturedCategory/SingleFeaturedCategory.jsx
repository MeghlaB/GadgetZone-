
import React from 'react';
import { Link } from 'react-router-dom';

const SingleFeaturedCategory = ({ category }) => {
    return (
        <div className="w-24 h-24 md:w-32 md:h-32 flex flex-col items-center justify-center text-center bg-base-100 shadow-2xl md:p-4 rounded-2xl">
            <Link className='flex flex-col items-center' to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="w-14 h-14 md:w-20 md:h-20 ">
                    <img src={category.icon} alt={category.name} className="w-full h-full object-contain" />
                </div>
                <p className="text-sm font-medium">{category.name}</p>
            </Link>
        </div>

    );
};

export default SingleFeaturedCategory;