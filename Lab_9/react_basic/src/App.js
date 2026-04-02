import logo from './logo.svg';
import './App.css';
// import Exercise1 from './ex_1/Exercise1';
//import Exercise2 from './ex_2/Exercise2';
import Exercise3 from './ex_3/Exercise3';

/*
// Exercise -1
const App = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>University Portal</h1>
      
      <Exercise1 />
    </div>
  );
};
*/
/*
//Exercise -2
const App = () => {
  return (
    <div>
      <Exercise2 />
    </div>
  );
};
*/
//Exercise3
const App = () => {
  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', color: '#1f2937' }}>
        React State Management
      </h1>
      
      {/* Rendering the state-driven counter component */}
      <Exercise3 />
    </div>
  );
};

export default App;
