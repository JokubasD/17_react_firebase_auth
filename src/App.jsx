import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';
import AddPost from './pages/AddPost';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import PostsPage from './pages/PostsPage';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth'>
          <AuthPage />
        </Route>
        <ProtectedRoute path='/profile'>
          <UserProfile />
        </ProtectedRoute>
        <ProtectedRoute path='/posts'>
          <PostsPage />
        </ProtectedRoute>
        <ProtectedRoute path='/add-post'>
          <AddPost />
        </ProtectedRoute>
      </Switch>
    </Layout>
  );
}

export default App;
