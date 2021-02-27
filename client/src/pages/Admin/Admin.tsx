import React, { useCallback } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  AccordionActions,
  Card,
  CardContent,
  Paper,
} from '@material-ui/core';

import { GetAllUsers } from '../../graphql/queries/user.queries';
import { User as UserI } from '../../types/app.types';
import { User } from '../User/User';
import { DeleteUser, UpgradeUser } from '../../graphql/mutations/user.mutations';

export const Admin: React.FC = () => {
  const { role, id } = JSON.parse(localStorage.getItem('user') as string);

  const { data, loading, error } = useQuery(GetAllUsers);
  const [ upgradeUser ] = useMutation(UpgradeUser);
  const [ deleteUser ] = useMutation(DeleteUser);

  const handleUpgrade = useCallback((userId: number) => {
    upgradeUser({
      variables: { userId },
      refetchQueries: [ 'GetAllUsers' ],
    });
  }, [ upgradeUser ]);

  const handleDelete = useCallback((userId: number) => {
    deleteUser({
      variables: { userId },
      refetchQueries: [ 'GetAllUsers' ],
    });
  }, [ deleteUser ]);

  if (role !== 'ADMIN') return <Redirect to={`/users/${id}`}/>;
  if (error) return <Redirect to="/auth"/>;

  return (
    <div className="admin">
      <div className="users-data">
        {!loading ? data.users.map((user: UserI) => (
          <Accordion key={user.id}>
            <AccordionSummary>{user.email}</AccordionSummary>
            <AccordionDetails>
              <User userId={user.id}/>
            </AccordionDetails>
            <AccordionActions>
              {user.role !== 'ADMIN' ?
                <Button color="primary" onClick={() => handleUpgrade(user.id)}>Upgrade User To Admin</Button>
                : null
              }
              <Button color="secondary" onClick={() => handleDelete(user.id)}>Delete User</Button>
            </AccordionActions>
          </Accordion>
        )) : <span>Loading...</span>}
      </div>

      <Card className="card" component={Paper}>
        {!loading
          ? <CardContent>
            <div className="card__info">
              Active Users: {data.users.length}
            </div>
            <div className="card__info">
              Active Profiles: {data.users.reduce((acc: number, val: UserI) => acc + val.profiles.length, 0)}
            </div>
          </CardContent>
          : <span>Loading...</span>
        }
      </Card>
    </div>
  );
};
