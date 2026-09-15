import { Redirect } from "wouter";
import { useAuth } from "../../features/user/user.context";
import LoadingPage from "../../pages/loading/page";

type Props = {
  children: React.ReactNode;
};

export default function PublicRoute({ children }: Props) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingPage />;
  }

  if (user) {
    return <Redirect to="/" />;
  }

  return children;
}
