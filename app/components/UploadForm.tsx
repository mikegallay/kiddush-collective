'use client';

import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form';

export default function UploadForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* First Name */}
      <label htmlFor="firstName">First Name</label>
      <Input
        id="firstName"
        {...register('firstName', { required: 'First Name is required' })}
        placeholder="Enter your first name"
      />
      {errors.firstName?.message && <span>{String(errors.firstName.message)}</span>}

      {/* Last Initial */}
      <label htmlFor="lastInitial">Last Initial</label>
      <Input
        id="lastInitial"
        {...register('lastInitial', { required: 'Last Initial is required' })}
        placeholder="Enter your last initial"
      />
      {errors.lastInitial?.message && <span>{String(errors.lastInitial.message)}</span>}

      
      <button type="submit">Submit</button>
    </form>
  );
}
