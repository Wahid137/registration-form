import Joi from "joi";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Container, Form, FormField, Radio } from "semantic-ui-react";

const Register = () => {
    // Initialize React Hook Form
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    // State to hold errors
    const [formErrors, setFormErrors] = useState({});

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
        gender: Joi.string().required().messages({
            "any.required": "Gender is required",
        }),
    });

    const genderOptions = [
        { key: "male", text: "Male", value: "male" },
        { key: "female", text: "Female", value: "female" },
        { key: "other", text: "Other", value: "other" },
    ];

    const onSubmit = (data) => {
        // Validate using Joi schema
        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            const errorMessage = {};
            error.details.forEach((detail) => {
                errorMessage[detail.path[0]] = detail.message;
            });
            setFormErrors(errorMessage); // Set errors in component state
            return; // Exit early if there are errors
        }
        console.log(data);
        reset(); // Reset the form after successful submission
        setFormErrors({}); // Clear all errors after successful submission
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
                    <FormField error={formErrors.firstName !== undefined}>
                        <label>First Name</label>
                        <input
                            placeholder="First Name"
                            {...register("firstName")}
                            className={formErrors.firstName ? "error" : ""}
                        />
                        {formErrors.firstName && (
                            <div className="ui pointing red basic label">
                                {formErrors.firstName}
                            </div>
                        )}
                    </FormField>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <FormField error={formErrors.lastName !== undefined}>
                        <label>Last Name</label>
                        <input
                            placeholder="Last Name"
                            {...register("lastName")}
                            className={formErrors.lastName ? "error" : ""}
                        />
                        {formErrors.lastName && (
                            <div className="ui pointing red basic label">
                                {formErrors.lastName}
                            </div>
                        )}
                    </FormField>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <FormField error={formErrors.gender !== undefined}>
                        <label>Gender</label>
                        <Radio.Group>
                            {genderOptions.map(option => (
                                <Radio
                                    key={option.key}
                                    label={option.text}
                                    value={option.value}
                                    {...register("gender")}
                                    className={formErrors.gender ? "error" : ""}
                                />
                            ))}
                        </Radio.Group>
                        {formErrors.gender && (
                            <div className="ui pointing red basic label">
                                {formErrors.gender}
                            </div>
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
