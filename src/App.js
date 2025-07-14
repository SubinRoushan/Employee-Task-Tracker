
import './App.css';
import { useState } from 'react';
import AddEmployee from './component/employeePage/AddEmployee';
import ControlPanel from './component/ControlPanel';
import Header from './component/Header';
import ContextProvider from './store/ContextProvider';
import EmployeePage from './component/employeePage/EmployeePage';

function App() {
  const [isVisibleForm, setIsVisibleFrom] = useState(false);

  function formVisibleHandle(value) {
    setIsVisibleFrom(value);
  }
  
  return (
    <ContextProvider>
      <div >
        {!isVisibleForm && <Header />}
        {!isVisibleForm && <ControlPanel formVisibleHandle={formVisibleHandle} />}
        {/* {isVisibleForm && <AddEmployee formVisibleHandle={formVisibleHandle} />} */}
       <EmployeePage formVisibleHandle={formVisibleHandle} isVisibleForm={isVisibleForm}/>
      </div>
    </ContextProvider>
  );
}

export default App;
