import LibrarianOrderClient from '@/app/Components/LibrarianOrderClient';
import { libRianBooksOrderList } from '@/lib/api/booksOrder';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const LibraianBooksOrderList = async () => {
    const getUserData = await getUserSession();
    const userId = getUserData?.id; 
    
    // লাইব্রেরি আইডি অনুযায়ী ডাটা ফ্যাচ করা হচ্ছে
    let orderListData = [];
    try {
      orderListData = await libRianBooksOrderList(userId) || [];
      console.log(orderListData);
      
    } catch (error) {
      console.error("Failed to fetch order list:", error);
    }
    
    return (
        <LibrarianOrderClient initialOrders={orderListData} />
    );
};

export default LibraianBooksOrderList;