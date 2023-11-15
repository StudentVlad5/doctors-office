import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from './SharedLayout/SharedLayout';

const AuthPage = lazy(() => import('pages/AuthPage'));
const ActivePage = lazy(() => import('pages/ActivePage'));
const DetailsPage = lazy(() => import('pages/DetailsPage'));
const ArchivePage = lazy(() => import('pages/ArchivePage'));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<AuthPage />} />

        <Route path="checklist" element={<ActivePage />} />
        <Route path="checklist/:id" element={<DetailsPage />} />
        <Route path="archive" element={<ArchivePage />} />
        <Route path="archive/:id" element={<DetailsPage />} />

        <Route path="*" element={<AuthPage />} />
      </Route>
    </Routes>
  );
};
