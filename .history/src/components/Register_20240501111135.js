import Joi from "joi";
import React from "react";
import { useForm } from "react-hook-form";
import { Button, Container, Form, FormField } from "semantic-ui-react";

const Register = () => {
    // Initialize React Hook Form
    const { register, handleSubmit, formState: { errors } } = useForm();

    console.log(errors)
    // Joi schema for validation
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(20).required().messages({
            "string.base": "First name must be a string",
            "string.empty": "Please enter your first name",
            "string.min": "First name must have at least {#limit} characters",
            "string.max": "First name cannot exceed {#limit} characters",
            "any.required": "First name is required",
        }),
        lastName: Joi.string().min(2).max(20).required().messages({
            "string.base": "Last name must be a string",
            "string.empty": "Please enter your last name",
            "string.min": "Last name must have at least {#limit} characters",
            "string.max": "Last name cannot exceed {#limit} characters",
            "any.required": "Last name is required",
        }),
    });

    const onSubmit = (data) => {
        // Validate using Joi schema
        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            const errorMessage = {};
            error.details.forEach((detail) => {
                errorMessage[detail.path[0]] = detail.message;
            });
            console.log(errorMessage)
            return errorMessage;
        }
        console.log(data);
    };

    return (
        <Container
            style={{
                marginTop: "30px",
                display: "flex",
                width: "50%",
                justifyContent: "center",
                paddingTop: "50px",
                paddingBottom: "50px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // Add shadow effect
                borderRadius: "8px", // Add border radius for rounded corners
            }}
        >
            <Form style={{ width: "70%" }} onSubmit={handleSubmit(onSubmit)}>
                <div style={{ marginBottom: "1rem" }}>
                    <FormField>
                        <label>First Name</label>
                        <input
                            placeholder="First Name"
                            {...register("firstName")}
                        />
                        {errors && errors.firstName && (
                            <div style={{ color: "red" }}>{errors.firstName.message}</div>
                        )}
                    </FormField>

                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <FormField>
                        <label>Last Name</label>
                        <input
                            placeholder="Last Name"
                            {...register("lastName")}
                        />
                        {errors && errors.lastName && (
                            <div style={{ color: "red" }}>{errors.lastName.message}</div>
                        )}
                    </FormField>

                </div>
                <Button type="submit" color="blue">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default Register;
