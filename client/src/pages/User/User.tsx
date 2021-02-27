import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { TableContainer, Table, TableCell, TableRow, TableHead, TableBody, Paper, Button } from '@material-ui/core';

import { Profile } from '../../types/app.types';
import { GetProfilesById } from '../../graphql/queries/profile.queries';
import { DeleteProfile } from '../../graphql/mutations/profile.mutations';
import { UpdateModal } from '../../components/UpdateModal/UpdateModal';

type UserProps = {
  userId?: number;
}

export const User: React.FC<UserProps> = ({ userId }: UserProps) => {
  const id = userId || JSON.parse(localStorage.getItem('user') as string).id;
  const { data, error } = useQuery(GetProfilesById, {
    variables: { userId: +id },
  });
  console.log(id, JSON.parse(localStorage.getItem('user') as string));
  const [ deleteProfile ] = useMutation(DeleteProfile);
  const [ modalId, setModalId ] = useState(0);

  const handleDelete = async (id: number) => {
    await deleteProfile({
      variables: { profileId: +id },
      refetchQueries: [ 'GetProfilesById' ]
    });
  };

  const toggleModal = (id: number) => {
    setModalId(id);
  };

  return (
    <>
      {data && modalId
        ? <UpdateModal
          profileData={data.profiles.find((profile: Profile) => profile.id === modalId)}
          onClose={toggleModal}
          open={!!modalId}
        /> : null}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Birth Date</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data ? data.profiles.map((profile: Profile) => (
              <TableRow key={profile.username}>
                {Object.keys(profile).map((key: string) => key !== '__typename' && key !== 'id'
                  ? <TableCell key={key}>{profile[key]}</TableCell>
                  : null
                )}
                <TableCell><Button onClick={() => toggleModal(profile.id)} color="primary">Update</Button></TableCell>
                <TableCell onClick={() => handleDelete(profile.id)}><Button
                  color="secondary">Delete</Button></TableCell>
              </TableRow>
            )) : 'Loading...'}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
