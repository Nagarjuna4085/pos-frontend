import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      {/* 1. Sidebar stays its natural width but fills height */}
      <Sidebar />

      {/* 2. Main wrapper takes remaining width and full height */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header stays at the top */}
        <Header />

        {/* 3. Content area takes remaining height and scrolls if content is long */}
        <main className="flex-1 overflow-y-auto p-5">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
