import React from 'react';
import Banner from '../Components/Banner/Banner';
import FeaturedCategory from '../Components/FeaturedCategory/FeaturedCategory';
import FeaturedProduct from '../Components/FeaturedProduct/FeaturedProduct';

const Home = () => {
    return (
        <div>
            <div>
                <Banner></Banner>
            </div>
            <div>
                <FeaturedCategory></FeaturedCategory>
                <FeaturedProduct/>
            </div>
        </div>
    );
};

export default Home;