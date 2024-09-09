import React from 'react';
import Banner from './Banner';
import Options from './Options';
import ChooseUs from './ChooseUs';
import Featured from './Featured/Featured';

const Home = () => {
    return (
        <div>
           <Banner></Banner> 
           <Options></Options>
           <ChooseUs></ChooseUs>
           <Featured></Featured>
        </div>
    );
};

export default Home;