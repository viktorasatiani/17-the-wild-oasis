import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import UserSignup from './UserSignup';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { signUp, isLoading } = UserSignup();
  function submit({ fullName, email, password }) {
    signUp({ fullName, email, password }, { onSuccess: () => reset() });
  }
  return (
    <Form onSubmit={handleSubmit(submit)}>
      <FormRow
        label='Full name'
        error={errors?.fullName?.message}
      >
        <Input
          disabled={isLoading}
          type='text'
          id='fullName'
          {...register('fullName', { required: 'This field Required' })}
        />
      </FormRow>

      <FormRow
        label='Email address'
        error={errors?.email?.message}
      >
        <Input
          disabled={isLoading}
          type='email'
          id='email'
          {...register('email', {
            required: 'This field Required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Invalid email address',
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Password (min 8 characters)'
        error={errors?.password?.message}
      >
        <Input
          disabled={isLoading}
          type='password'
          id='password'
          {...register('password', {
            required: 'This field Required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Repeat password'
        error={errors?.passwordConfirm?.message}
      >
        <Input
          disabled={isLoading}
          type='password'
          id='passwordConfirm'
          {...register('passwordConfirm', {
            required: 'This field Required',
            validate: (value) =>
              value === getValues('password') || "password doesn't match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variations='secondary'
          type='reset'
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
