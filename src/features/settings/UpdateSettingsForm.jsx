import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSettings';
import Spinner from '../../ui/Spinner';
import { useUpdateSettings } from './useUpdateSettings';

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      maxBookingLenght,
      maxGuestsPerBooking,
      minBookingLength,
      breakfastPrice,
    } = {},
  } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSettings();
  function handleUpdate(e, field) {
    const { value } = e.target;
    if (!value) return;
    updateSetting({ [field]: value });
  }
  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          disabled={isUpdating}
          type='number'
          defaultValue={minBookingLength}
          id='min-nights'
          onBlur={(e) => handleUpdate(e, 'minBookingLength')}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input
          disabled={isUpdating}
          type='number'
          defaultValue={maxBookingLenght}
          id='max-nights'
          onBlur={(e) => handleUpdate(e, 'maxBookingLenght')}
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          disabled={isUpdating}
          type='number'
          defaultValue={maxGuestsPerBooking}
          id='max-guests'
          onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          disabled={isUpdating}
          type='number'
          defaultValue={breakfastPrice}
          id='breakfast-price'
          onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
