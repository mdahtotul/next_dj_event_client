import Layout from "@/components/Layout";
import { useAuthContext } from "@/context/AuthContext";

const DashboardPage = () => {
  const { user } = useAuthContext();
  return (
    <Layout title="Dashboard">
      <p>{user?.username}</p>
      <p>{user?.email}</p>
    </Layout>
  );
};

export default DashboardPage;
