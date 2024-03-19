import './styles/pages/App.scss';
import { Forms } from './components/Forms';
import { Header } from './components/Header';
import { MainScreen } from './components/MainScreen';
import { Users } from './components/Users';
import { useEffect, useState } from "react";
import { getUsersList } from './api/users';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [next_api, setApi] = useState('');
  const [apiIs, setApiIs] = useState(true);
  const base_api = `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6`;

  useEffect(() => {
    getUsersList(base_api)
      .then(data => {
        setUsers(data.users)
        setApi(data.links.next_url.slice(0, -1) + '6')
      });
    }, [base_api]);

  return (
    <div className="App">
      <Header />
      <MainScreen />
      <Users 
        users={users} 
        setUsers={setUsers}
        next_api={next_api} 
        setApi={setApi}
        apiIs={apiIs}
        setApiIs={setApiIs}
      />
      <Forms 
        setUsers={setUsers}
        setApi={setApi}
        base_api={base_api}       
      />
    </div>
  );
}

export default App;
