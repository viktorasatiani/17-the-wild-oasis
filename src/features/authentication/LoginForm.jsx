import { useState } from 'react';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import FormRowVertical from '../../ui/FormRowVertical';
import UserLogin from './userLogin';
import SpinnerMini from '../../ui/SpinnerMini';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isPending } = UserLogin();
  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;
    login({ email, password });
  }

  return (
    <Form
      type='regular'
      onSubmit={handleSubmit}
    >
      <FormRowVertical label='Email address'>
        <Input
          type='email'
          id='email'
          // This makes this form better for password managers
          autoComplete='username'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />
      </FormRowVertical>
      <FormRowVertical label='Password'>
        <Input
          type='password'
          id='password'
          autoComplete='current-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button
          size='large'
          type='submit'
          disabled={isPending}
        >
          {isPending ? <SpinnerMini /> : 'Login'}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
