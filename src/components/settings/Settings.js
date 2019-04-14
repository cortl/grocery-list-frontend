import React from 'react'
import Header from "../Header";
import {MainNavigation} from "../navigation/MainNavigation";

export const Settings = () => (
    <div className='container'>
        <MainNavigation offMainPage={true}/>
        <Header text='Settings'/>
    </div>
);
