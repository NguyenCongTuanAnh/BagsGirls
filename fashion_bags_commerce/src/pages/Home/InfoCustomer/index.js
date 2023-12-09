import { Fragment, useEffect, useState } from 'react';
import ProfileView from './ProfileView/ProfileView';
import MainLayout from '../MainLayout';

function CustomerProfile() {
  return (
    <MainLayout>
      <ProfileView />
    </MainLayout>
  );
}

export default CustomerProfile;
