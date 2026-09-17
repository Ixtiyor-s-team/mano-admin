import { Redirect } from "wouter";
import { useAuth } from "../../features/user/user.context";
import LoadingPage from "../../pages/loading/page";

type Props = {
  children: React.ReactNode;
};

const allowedRoles = ["admin", "superadmin", "moderator"];
export default function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingPage />;
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Redirect to="/access-denied" />;
  }

  return children;
}
