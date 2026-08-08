import { getUserRole } from '@/lib/core/session';
import React from 'react';

const AdminLayout = async ({children}) => {
    await getUserRole('librarian');
    return (
        <div>
            {children}
        </div>
    );
};

export default AdminLayout;