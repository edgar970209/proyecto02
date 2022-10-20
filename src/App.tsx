import './App.css';
import { AutProvider } from './context/AuthContext';
import { Contenedor } from './screen/Contenedor';

const AppState = ({ children }: any) =>{
    return(
      <AutProvider>
        { children }
      </AutProvider>
    )
}

const App = () => {
  return (
    <div className="App">
      <AppState>
        <Contenedor />
      </AppState>
    </div>
  );
}

export default App;
