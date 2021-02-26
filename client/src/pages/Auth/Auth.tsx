import React from 'react';
import { Grid, Card, CardContent, TextField, Button } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Login } from '../../graphql/mutations/user.mutations';

export const Auth: React.FC = () => {
  const [ signIn, { loading, error } ] = useMutation(Login);
  const history = useHistory();

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
  });

  const handleSubmit = async () => {
    const { email, password } = formik.values;
    const { data: { login } } = await signIn({ variables: { email, password } });
    localStorage.setItem('user', JSON.stringify({
      token: login.token,
      id: login.id,
    }));
    history.push(`/users/${login.id}`);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  return (
    <Grid className="auth-page" container justify="center" alignItems="center">
      <Grid item xs={12} sm={9} md={8} lg={6}>
        <Card>
          <CardContent>
            <form onSubmit={formik.handleSubmit} className="form">
              <TextField
                variant="standard"
                label="Email"
                type="email"
                size="small"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <TextField
                variant="standard"
                label="Password"
                type="password"
                size="small"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <Button className="submit-btn" type="submit">Sign In</Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
