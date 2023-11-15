import { Navigate, Route, Routes } from 'react-router-dom';
import { SharedLayout } from './SharedLayout/SharedLayout';
import { RestrictedRoute } from 'routes/RestrictedRoute';
import { PrivateRoute } from 'routes/PrivateRoute';


export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={
          <RestrictedRoute redirectTo='/check_list_active' component={<h1>Verification</h1>} />}/>
        <Route path="check_list_active" element={
        <PrivateRoute redirectTo="/" component={<h1>Активные чек-листы</h1>}/>
        }/>
        <Route path="check_list_active/:id" element={<PrivateRoute redirectTo="/" component={<h1>Детализация чек-листа</h1>} />}/>
        <Route path="check_list_closed" element={<PrivateRoute redirectTo="/" component={<h1>Архів чек-листов</h1>} />}/>
        <Route path="check_list_closed/:id" element={<PrivateRoute redirectTo="/" component={<h1>Деталізація архівного чек-листа</h1>}/>}/>
        <Route path="*" element={<Navigate to='/'/>} />
      </Route>
    </Routes>
  );
};
