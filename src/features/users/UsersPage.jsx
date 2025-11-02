import React from 'react';
import UserList from '../../components/users/UserList';
import GlobalModal from '../../components/common/GlobalModal.jsx'

export default function UsersPage(){
  return (
    <main style={{padding:20}}>
      <UserList />
      
      <GlobalModal />
    </main>
  );
}