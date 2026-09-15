import { Redirect } from "wouter";
import { useAuth } from "../../features/user/user.context";
import LoadingPage from "../../pages/loading/page";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingPage />;
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  return children;
}
