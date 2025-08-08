
import React from 'react';
import { Link } from 'react-router-dom';

const SingleFeaturedCategory = ({ category }) => {

    return (
        <div className="flex flex-col items-center justify-center w-24 h-24 text-center shadow-2xl md:w-32 md:h-32 bg-base-100 md:p-4 rounded-2xl">
            <Link className='flex flex-col items-center' to={category.path}>
                <div className="w-14 h-14 md:w-20 md:h-20">
                    <img src={category.icon} alt={category.name} className="object-contain w-full h-full" />
                </div>
                <p className="text-sm font-medium">{category.name}</p>
            </Link>

        </div>

    );
};

export default SingleFeaturedCategory;