import React from 'react';
import { useForm } from "react-hook-form";

const AddService = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        fetch("https://genius-car-services-server-2etrtww8e.vercel.app/service", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(result => console.log(result))
        // console.log(data)
    };

    return (
        <div className='w-50 mx-auto'>
            <h1>Add Service</h1>
            <form className='d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <input className='mb-2' placeholder='Service Name' {...register("name", { required: true })} />

                {/* in placeholder=''clude validation with required or other standard HTML validation rules */}
                <textarea className='mb-2' placeholder='Description' {...register("description", { required: true })} />
                <input className='mb-2' placeholder='Price' {...register("price", { required: true })} />
                <input className='mb-2' placeholder='Image URL' {...register("img", { required: true })} />
                {/* errors will return when field validation fails  */}
                {errors.name && <span>Please fill all fields</span>}

                <input type="submit" />
            </form>
        </div>
    );
};

export default AddService;