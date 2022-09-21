import { useAuth } from '../../hooks/useAuth';

export default function User() {
  const {  user } = useAuth();

  return (


      <h4 className="text-xl mb-4"> {user.displayName || user.email} </h4>

  );
}
  

