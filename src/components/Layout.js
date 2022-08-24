import { Outlet } from "react-router-dom";
import Header from "./Header";

// Header and footer can be included here
// Outlet = all the children
const Layout = () => {
  return (
    <>
      <Header />
      <main className="App">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
