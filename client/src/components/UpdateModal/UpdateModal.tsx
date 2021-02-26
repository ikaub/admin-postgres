import React from 'react';
import { Modal } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { ProfileForm } from '../ProfileForm/ProfileForm';
import { Profile } from '../../types/app.types';
import { UpdateProfile } from '../../graphql/mutations/profile.mutations';

type UpdateModalProps = {
  open: boolean;
  onClose: (id: number) => void;
  profileData: Partial<Profile>;
}

export const UpdateModal: React.FC<UpdateModalProps> = ({ open, onClose, profileData }: UpdateModalProps) => {
  const [ updateProfile ] = useMutation(UpdateProfile);

  const handleUpdate = async (values: Partial<Profile>) => {
    const updatedValues = { ...values };
    delete updatedValues.__typename;
    await updateProfile({
      variables: { profile: updatedValues },
      refetchQueries: [ 'GetProfilesById' ]
    });
    onClose(0);
  };

  return (
    <Modal className="modal" onClose={() => onClose(0)} open={open}>
      <ProfileForm submitText="Update Profile" initialValues={profileData} onSubmit={handleUpdate}/>
    </Modal>
  );
};
