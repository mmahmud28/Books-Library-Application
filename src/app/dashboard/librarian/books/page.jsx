"use client"
import { useSession } from '@/lib/auth-client';
import React from 'react';

const LibrarianAllBooksPage = () => {

     const { data: session, isPending } = useSession();
      const user = session?.user;
      const userEmail = user?.email
    
    return (
        <div>
            
        </div>
    );
};

export default LibrarianAllBooksPage;