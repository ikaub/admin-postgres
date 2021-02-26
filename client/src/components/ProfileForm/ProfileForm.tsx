import React  from 'react';
import { Button, MenuItem, Select, TextField } from '@material-ui/core';
import { Profile } from '../../types/app.types';
import { useFormik } from 'formik';
import * as Yup from 'yup';

type ProfileFormProps = {
  onSubmit: (values: Partial<Profile>) => void;
  initialValues: Partial<Profile>;
  submitText: string;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, initialValues, submitText }: ProfileFormProps) => {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required().min(1),
    birthdate: Yup.string().required(),
    city: Yup.string().required().min(2),
  });

  const handleSubmit = () => {
    onSubmit(formik.values);
    formik.resetForm();
  };

  const formik = useFormik<Partial<Profile>>({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit} className='create-profile'>
      <TextField
        label="Username"
        name="username"
        type="text"
        value={formik.values.username}
        onChange={formik.handleChange}
      />
      <Select
        label="Gender"
        name="gender"
        type="text"
        value={formik.values.gender}
        onChange={formik.handleChange}
      >
        <MenuItem value="Man">Man</MenuItem>
        <MenuItem value="Woman">Woman</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </Select>
      <TextField
        name="birthdate"
        type="date"
        value={formik.values.birthdate}
        onChange={formik.handleChange}
      />
      <TextField
        label="City"
        name="city"
        type="text"
        value={formik.values.city}
        onChange={formik.handleChange}
      />
      <Button className="submit-btn" type="submit">{submitText}</Button>
    </form>
  );
};
