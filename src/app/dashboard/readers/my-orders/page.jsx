import OrderListClient from '@/app/Components/OrderListClient';
import { userOrderList } from '@/lib/api/booksOrder';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const MyBooksOrdersPage = async () => {
    const getUserData = await getUserSession();
    const userId = getUserData?.id;

    // Fetch order list safely
    let orderListData = [];
    if (userId) {
      orderListData = await userOrderList(userId) || [];
    }
    
    return (
        <OrderListClient initialOrders={orderListData} />
    );
};

export default MyBooksOrdersPage;