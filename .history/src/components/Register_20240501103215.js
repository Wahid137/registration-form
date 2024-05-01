import Joi from "joi-browser";
import React, { useState } from "react";
import { Button, Container, Form, FormField } from "semantic-ui-react";

const Register = () => {
    // Define validation schema
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    // Form state
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    // Form errors state
    const [errors, setErrors] = useState({});

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form data
        const validationResult = schema.validate(formData, {
            abortEarly: false,
        });

        // Check for validation errors
        if (validationResult.error) {
            const newErrors = {};
            validationResult.error.details.forEach((detail) => {
                newErrors[detail.context.key] = detail.message;
            });
            setErrors(newErrors);
        } else {
            // If no validation errors, proceed with form submission
            console.log("Form submitted successfully:", formData);
        }
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
            <Form style={{ width: "70%" }} onSubmit={handleSubmit}>
                <FormField>
                    <label>First Name</label>
                    <input
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    {errors.firstName && (
                        <div style={{ color: "red" }}>{errors.firstName}</div>
                    )}
                </FormField>
                <FormField>
                    <label>Last Name</label>
                    <input
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    {errors.lastName && (
                        <div style={{ color: "red" }}>{errors.lastName}</div>
                    )}
                </FormField>
                <FormField>
                    <label>Email</label>
                    <input
                        name="email"
                        placeholder="Enter Your Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
                </FormField>
                <FormField>
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && (
                        <div style={{ color: "red" }}>{errors.password}</div>
                    )}
                </FormField>
                <Button type="submit" color="blue">
                    Submit
                </Button>


            </Form>
        </Container>
    );
};

export default Register;
