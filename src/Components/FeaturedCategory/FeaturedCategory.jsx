import React, { useEffect, useState } from 'react';
import SingleFeaturedCategory from './SingleFeaturedCategory';

const FeaturedCategory = () => {
    const [categories, setCategories] = useState([]); 

    useEffect(() => {
        fetch('FeaturedCategory.json') 
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCategories(data);
            });
    }, []);

    return (
        <div className='my-10 w-10/12 mx-auto'>
            <h1 className='text-lg text-center md:text-2xl'>Featured Category</h1>
            <p className='text text-center text-gray-600'>
                Get Your Desired Product from Featured Category!
            </p>
            <div className='flex flex-wrap justify-center my-4 mx-auto gap-4'>
                {
                    categories.map((category, idx) => (
                        <SingleFeaturedCategory category={category} key={idx} />
                    ))
                }
            </div>
        </div>
    );
};

export default FeaturedCategory;
