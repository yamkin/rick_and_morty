import CharactersList from './components/pages/charactersListPage/charactersList';
import { Route, Routes } from 'react-router-dom';
import './App.scss';

export default function App() {
  
  return (
    <Routes>
      <Route path={`/`} element={<CharactersList />} />
    </Routes>
  );
}