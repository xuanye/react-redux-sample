import React from 'react';
//import { DatePicker, Button } from 'antd';
import './index.less';
import OnlineTimeIndicator from './components/OnlineTimeIndicator';
import Toolbar from './components/Toolbar';
import AddressGrid from './components/AddressGrid';
const App = () => {
    return (
        <div className='app'>
            <h1 style={{ textAlign: 'center' }}>Address Book</h1>
            <OnlineTimeIndicator></OnlineTimeIndicator>
            <Toolbar></Toolbar>
            <AddressGrid></AddressGrid>
        </div>
    );
};

export default App;
