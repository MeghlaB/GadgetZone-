import React from 'react';
import Banner from '../Components/Banner/Banner';
import FeaturedCategory from '../Components/FeaturedCategory/FeaturedCategory';
import FeaturedProduct from '../Components/FeaturedProduct/FeaturedProduct';
import WhatsAppButton from '../Components/WhatsAppButton/WhatsAppButton';

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
              <WhatsAppButton />
        </div>
    );
};

export default Home;