import React, { useEffect } from 'react';
import Banner from './Banner';
import Options from './Options';
import ChooseUs from './ChooseUs';
import Featured from './Featured/Featured';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Home = () => {


    return (
        <div>
            <Helmet>
                <title>NestVibes | Home</title>
            </Helmet>
            <Banner></Banner>
            <Options></Options>
            <ChooseUs></ChooseUs>
            <Featured></Featured>
        </div>
    );
};

export default Home;