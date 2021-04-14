import './App.css';
import MainContainer from "./components/Main/MainContainer";
import MonthReport from "./components/MonthReport/MonthReport";
import {Switch, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route  exact path="/" component={MainContainer} />
        <Route exact path="/monthreport" component={MonthReport}/>
      </Switch>
    </div>
  );
}

export default App;
