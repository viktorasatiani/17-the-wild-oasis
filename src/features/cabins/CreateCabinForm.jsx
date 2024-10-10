import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { useForm } from 'react-hook-form';
import { useEditCabin } from './useEditCabin';
import { useCreateCabin } from './useCreateCabin';

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { editCabin, isEditing } = useEditCabin();
  const { createCabin, isCreating } = useCreateCabin();
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const isWorking = isCreating || isEditing;
  function submitForm(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image: image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
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
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow
        label='Cabin name'
        error={errors?.name?.message}
      >
        <Input
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
          variation='secondary'
          type='reset'
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit Cabin' : 'Create cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
