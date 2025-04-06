import { useState } from "react";
import TopNavBar from "./components/TopNavBar";
import WOTE1 from "./pages/WOTE1";
import WOTE2 from "./pages/WOTE2";
import CoCClassify from "./pages/CoCClassify";

function App() {
  const [currentPage, setCurrentPage] = useState('CoCClassify');

  const renderPage = () => {
    switch(currentPage) {
      case 'WOTE1':
        return <WOTE1/>
      case 'WOTE2':
        return <WOTE2/>
      case 'CoCClassify':
        return <CoCClassify/>
    }
  }

  return (
    <div className="app-container">
      <TopNavBar setCurrentPage={setCurrentPage}/>
      {renderPage()}
    </div>
  );
}

export default App;
