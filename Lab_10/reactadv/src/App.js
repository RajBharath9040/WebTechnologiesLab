import logo from './logo.svg';
import './App.css';
//import Exercise1 from './ex_1/Exercise1';
//import Exercise2 from './ex_2/Exercise2';
import Exercise3 from './ex_3/Exercise3';

/*
//Exercise1
const App = () => {
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '20px' }}>
    
      <Exercise1 />
    </div>
  );
};

*/
/*
//Exercise2
const App = () => {
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', fontFamily: 'Arial', color: '#1e293b' }}>
        React List Management
      </h1>
      
      
      <Exercise2 />
    </div>
  );
};
*/
//Exercise3

const App = () => {
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Rendering the data fetching component */}
      <Exercise3 />
    </div>
  );
};

export default App;
