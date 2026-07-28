import React from 'react';
import { DashBoardSidebar } from '../Components/dashboard/DashboradSideBar';

const DashBoard_layout = ({children}) => {
    return (
        <div>
            <div className='flex min-h-screen'>
                <DashBoardSidebar/>
                <div className='flex-1'>{children}</div>
            </div>
        </div>
    );
};

export default DashBoard_layout;