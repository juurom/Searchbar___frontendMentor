import './App.css';
import Job from './Job';
import jobData from './data.json';


function App() {

  return (
    <div className="App">
      <Job data={jobData}/>
    </div>
  );
}



export default App;
