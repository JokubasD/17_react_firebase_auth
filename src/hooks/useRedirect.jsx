import { useHistory } from 'react-router-dom';

export default function useRedirect(where) {
  if (!where) return;
  const history = useHistory();
  return () => history.push(where);
}
