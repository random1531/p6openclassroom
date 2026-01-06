import "./App.css";
import { Outlet } from "react-router";
import Header from "./components/Hearder/Header";
import { DataProvider } from "./lib/DataProvider";
import Footer from "./components/footer/footer";
function App() {
  return (
    <>
      <main>
        <Header />
        <DataProvider>
          <Outlet />
        </DataProvider>
      </main>
      <Footer />
    </>
  );
}

export default App;
