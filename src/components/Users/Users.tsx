import React, { useState } from "react";
import { UserCard } from "../UserCard";
import { getUsersList } from '../../api/users';
import './../../styles/components/Users.scss';
import { UserDataType } from "../../react-app-env";
import { Loader } from "../Loader";

type Props = {
  users: UserDataType[],
  setUsers: ( users: UserDataType[]) => void,
  next_api: string,
  setApi: (next_api: string) => void,
  apiIs: boolean,
  setApiIs: (apiIs: boolean) => void,
}

export const Users: React.FC<Props> = ({
  users,
  setUsers,
  next_api,
  setApi,
  apiIs,
  setApiIs,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <div className="Users" id="Users">
      <h1 className="Users__title">Working with GET request</h1>

      <div className="Users__cards">
        {users.length > 0 && (users.map(user => <UserCard user={user} key={user.id} />))}
      </div>

      {apiIs && (isLoading ? ( <Loader/> ) : (      
          <button
            className="button"
            type="button"
            onClick={() => {
              setIsLoading(true);
              getUsersList(next_api)
              .then(data => {
                console.log(data);
                if (data.page < data.total_pages) {
                  setApi(data.links.next_url.slice(0, -1) + '6');
                } else {
                  setApiIs(false);
                }
                setUsers(data.users)
                setIsLoading(false);
              });
            }}
          >
            Show more
          </button>
        ))
      }

    </div>
  );
};