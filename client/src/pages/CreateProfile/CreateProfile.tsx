import React from 'react';
import { useMutation } from '@apollo/client';

import { CreateProfile as CreateProfileMutation } from '../../graphql/mutations/profile.mutations';
import { ProfileForm } from '../../components/ProfileForm/ProfileForm';
import { Profile } from '../../types/app.types';

const initialValues = {
  username: '',
  gender: 'Man',
  birthdate: '',
  city: '',
};

export const CreateProfile: React.FC = () => {
  const [ createProfile ] = useMutation(CreateProfileMutation,);

  const handleSubmit = async (values: Partial<Profile>) => {
    await createProfile({
      variables: {
        profile: { ...values }
      },
      refetchQueries: [ 'GetProfilesById' ],
    });
  };

  return (
    <ProfileForm submitText="Create Profile" initialValues={initialValues} onSubmit={handleSubmit}/>
  );
};
