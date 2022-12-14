import { Route } from 'react-router-dom';
import NotAuthorized from '../pages/NotAuthorized';
import { useAuthCtx } from '../store/AuthContext';

function ProtectedRoute({ children, ...restOfProps }) {
  const { isUserLoggedIn } = useAuthCtx();
  return (
    <Route {...restOfProps}>
      {isUserLoggedIn ? children : <NotAuthorized />}
    </Route>
  );
}
export default ProtectedRoute;
