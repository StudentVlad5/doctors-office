import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Main } from './SharedLayout.styled';
import { Header } from 'components/Header/Header';

export const SharedLayout = () => {
  return (
    <>
      <Suspense fallback={'Loading...'}>
        <Header />
        <Main>
          <Outlet />
        </Main>
      </Suspense>
    </>
  );
};
