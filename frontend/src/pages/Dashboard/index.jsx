import DashboardView from "./DashboardView";
import { useDashboard } from "./useDashboard";

export default function Dashboard() {
  const { produtos, curiosidades, contato } = useDashboard();

  return (
    <DashboardView
      produtos={produtos}
      curiosidades={curiosidades}
      contato={contato}
    />
  );
}
