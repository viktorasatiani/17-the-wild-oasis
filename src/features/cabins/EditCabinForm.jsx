import { useForm } from 'react-hook-form';
import { useEditCabin } from './useEditCabin';

import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import FileInput from '../../ui/FileInput';
import Button from '../../ui/Button';
import Textarea from '../../ui/Textarea';

function EditCabinForm({ cabinToEdit = {}, onCloseEditModal }) {
  const { editCabin, isEditing } = useEditCabin();
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function submitForm(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    editCabin(
      { newCabinData: { ...data, image: image }, id: editId },
      {
        onSuccess: () => {
          reset();
          onCloseEditModal?.();
        },
      }
    );
  }
  function onError(error) {
    console.log(error);
  }
  return (
    <Form
      onSubmit={handleSubmit(submitForm, onError)}
      type={onCloseEditModal ? 'modal' : 'regular'}
    >
      <FormRow
        label='Cabin name'
        error={errors?.name?.message}
      >
        <Input
          disabled={isEditing}
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
          disabled={isEditing}
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
          disabled={isEditing}
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
          disabled={isEditing}
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
          disabled={isEditing}
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
          disabled={isEditing}
          id='image'
          accept='image/*'
          {...register('image', {
            required: isEditSession ? false : 'This field required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          disabled={isEditing}
          variation='secondary'
          type='reset'
          onClick={onCloseEditModal}
        >
          Cancel
        </Button>
        <Button disabled={isEditing}>Edit Cabin</Button>
      </FormRow>
    </Form>
  );
}

export default EditCabinForm;
