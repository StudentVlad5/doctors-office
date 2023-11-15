import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from './SharedLayout/SharedLayout';


export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<h1>Verification</h1>} />

        <Route path="check_list_active" element={<h1>Активні чек-листи</h1>} />
        <Route path="check_list_active/:id" element={<h1>Деталізація активного чек-листа</h1>} />
        <Route path="check_list_closed" element={<h1>Архів чек-листів</h1>} />
        <Route path="check_list_closed/:id" element={<h1>Деталізація архівного чек-листа</h1>} />

        <Route path="*" element={<h1>Verification</h1>} />
      </Route>
    </Routes>
  );
};
