import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../components/button';
import { yupLoginSchema } from '../validator';
import { useMutation, useQueryClient } from 'react-query';
import { API_URL } from '../env';

const newUserHandler = async (data) => {
    const { email, password } = data;

    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!response.ok) {
            throw new Error('Something went wrong');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        throw new Error(error.message);
    }
};

const NewUser = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(yupLoginSchema),
    });

    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation(newUserHandler, {
        onSuccess: (data) => {
            reset();
            queryClient.invalidateQueries('users');
        },
        onError: (error) => {
            alert(error.message);
        },
        onMutate: (data) => {
            // sedang memproses data
            console.log(data);
        },
    });

    const onSubmit = async (data) => {
        mutate(data);
    };

    return (
        <div className='w-full max-w-xs mx-auto space-y-12 bg-transparent rounded-lg shadow-lg p-7'>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='email'>Alamat Email</label>
                    <input
                        {...register('email', {
                            required: true,
                            pattern: `^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$`,
                        })}
                        autoFocus={true}
                        autoComplete='email'
                        className='px-2 py-1 border border-gray-400 rounded-md'
                        type='email'
                        name='email'
                        id='email'
                    />
                    <span className='text-xs text-red-500'>
                        {errors.email?.message}
                    </span>
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='password'>Password</label>
                    <input
                        {...register('password', { required: true })}
                        autoComplete='current-password'
                        className='px-2 py-1 border border-gray-400 rounded-md'
                        type='password'
                        name='password'
                        id='password'
                    />
                    <span className='text-xs text-red-500 break-all'>
                        {errors.password?.message}
                    </span>
                </div>

                <div className='space-y-2'>
                    {isLoading ? (
                        <Button
                            title='Sedang di Proses...'
                            className='bg-red-500 hover:bg-red-600'
                            disabled={true}
                            children={
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-5 h-5 animate-spin'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
                                    />
                                </svg>
                            }
                        />
                    ) : (
                        <Button
                            title='Create'
                            className='bg-red-500 hover:bg-red-600'
                            type='submit'
                        />
                    )}
                </div>
            </form>
        </div>
    );
};

export default NewUser;
