import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const MainLayout = ({ children }) => {
  return (
    <div className="flex bg-slate-100">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
