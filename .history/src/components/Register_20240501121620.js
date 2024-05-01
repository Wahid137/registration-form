import Joi from "joi";
import moment from "moment";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Container, Form, FormField } from "semantic-ui-react";

const Register = () => {
    // Initialize React Hook Form
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    // State to hold errors
    const [formErrors, setFormErrors] = useState({});

    // Calculate the minimum birth date (18 years ago from today)
    const minBirthDate = moment().subtract(18, "years").format("YYYY-MM-DD");
    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    // Joi schema for validation
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(20).pattern(nameRegex).required().messages({
            "string.base": "First name must be a string",
            "string.empty": "Please enter your first name",
            "string.min": "First name must have at least {#limit} characters",
            "string.max": "First name cannot exceed {#limit} characters",
            "string.pattern.base": "First name must contain only alphabets and spaces",
            "any.required": "First name is required",
        }),
        lastName: Joi.string().min(2).max(20).pattern(nameRegex).required().messages({
            "string.base": "Last name must be a string",
            "string.empty": "Please enter your last name",
            "string.min": "Last name must have at least {#limit} characters",
            "string.max": "Last name cannot exceed {#limit} characters",
            "string.pattern.base": "Last name must contain only alphabets and spaces",
            "any.required": "Last name is required",
        }),
        birthDate: Joi.date()
            .max(minBirthDate) // Set the maximum allowed birth date
            .required()
            .messages({
                "date.base": "Please enter a valid date",
                "date.max": "You must be at least 18 years old",
                "any.required": "Birth date is required",
            }),
        phoneNumber: Joi.string().pattern(phoneRegex).required().messages({
            "string.base": "Phone number must be a string",
            "string.empty": "Please enter your phone number",
            "string.pattern.base": "Phone number must be exactly 10 digits",
            "any.required": "Phone number is required",
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
                    <FormField error={formErrors.birthDate !== undefined}>
                        <label>Birth Date</label>
                        <input
                            type="date"
                            name="birthDate"
                            {...register("birthDate")}
                            className={formErrors.birthDate ? "error" : ""}
                        />
                        {formErrors.birthDate && (
                            <div className="ui pointing red basic label">
                                {formErrors.birthDate}
                            </div>
                        )}
                    </FormField>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <FormField error={formErrors.phoneNumber !== undefined}>
                        <label>Phone Number</label>
                        <input
                            placeholder="1234567890"
                            {...register("phoneNumber")}
                            className={formErrors.phoneNumber ? "error" : ""}
                        />
                        {formErrors.phoneNumber && (
                            <div className="ui pointing red basic label">
                                {formErrors.phoneNumber}
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
