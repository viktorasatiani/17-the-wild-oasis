import styled from 'styled-components';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

const FormRow2 = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

function CreateCabinForm() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('Cabin has been Created');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  function submitForm(data) {
    mutate({ ...data, image: data.image[0] });
  }
  function onError(error) {
    console.log(error);
  }
  return (
    <Form onSubmit={handleSubmit(submitForm, onError)}>
      <FormRow
        label='Cabin name'
        error={errors?.name?.message}
      >
        <Input
          disabled={isCreating}
          type='text'
          id='name'
          {...register('name', {
            required: 'This field required',
            minLength: {
              value: 3,
              message: 'At least 3 characters',
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Maximum capacity'
        error={errors?.maxCapacity?.message}
      >
        <Input
          disabled={isCreating}
          type='number'
          id='maxCapacity'
          {...register('maxCapacity', {
            required: 'This field required',
            min: {
              value: 1,
              message: 'Minimum capacity is 1',
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Regular price'
        error={errors?.regularPrice?.message}
      >
        <Input
          disabled={isCreating}
          type='number'
          id='regularPrice'
          {...register('regularPrice', {
            required: 'This field required',
            min: {
              value: 1,
              message: 'Price should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Discount'
        error={errors?.discount?.message}
      >
        <Input
          disabled={isCreating}
          type='number'
          id='discount'
          defaultValue={0}
          {...register('discount', {
            required: 'This field required',
            validate: (value) =>
              value <= getValues().regularPrice ||
              'Discount should be at least equal to the regular price',
          })}
        />
      </FormRow>

      <FormRow
        label='Description for website'
        error={errors?.description?.message}
      >
        <Textarea
          disabled={isCreating}
          type='number'
          id='description'
          defaultValue=''
          {...register('description', {
            required: 'This field required',
          })}
        />
      </FormRow>

      <FormRow
        label='Cabin photo'
        error={errors?.image?.message || ''}
      >
        <FileInput
          disabled={isCreating}
          id='image'
          accept='image/*'
          {...register('image', {
            required: 'This field required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          disabled={isCreating}
          variation='secondary'
          type='reset'
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>Create cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
