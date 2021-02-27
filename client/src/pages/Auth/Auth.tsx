import React, { useState } from 'react';
import { Grid, Card, CardContent, TextField, Button } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { CreateUser, Login } from '../../graphql/mutations/user.mutations';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';

export const Auth: React.FC = () => {
  const [ signIn ] = useMutation(Login);
  const [ signUp ] = useMutation(CreateUser);
  const [ errorMessage, setErrorMessage ] = useState('');
  const history = useHistory();

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
  });

  const handleSubmit = async (actionType?: 'signin' | 'signup') => {
    const { email, password } = formik.values;
    try {
      if (actionType === 'signup') {
        await signUp({ variables: { email, password } });
      } else {
        const { data: { login } } = await signIn({ variables: { email, password } });
        localStorage.setItem('user', JSON.stringify({
          token: login.token,
          id: login.id,
          role: login.role,
        }));
        console.log(localStorage.getItem('user'));
        history.push(`/users/${login.id}`);
      }
    } catch (e: any) {
      setErrorMessage(e.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: () => handleSubmit(),
    validationSchema,
  });

  return (
    <Grid className="auth-page" container justify="center" alignItems="center">
      {errorMessage ? <ErrorMessage message={errorMessage} onClose={() => setErrorMessage('')}/> : null}
      <Grid item xs={12} sm={9} md={8} lg={6}>
        <Card>
          <CardContent>
            <form className="form">
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
              <div>
                <Button onClick={() => handleSubmit('signin')}>Sign In</Button>
                <Button onClick={() => handleSubmit('signup')} color="primary">Sign up</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
