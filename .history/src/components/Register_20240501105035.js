import React from "react";
import { useForm } from "react-hook-form";
import { Button, Container, Form, FormField } from "semantic-ui-react";

const Register = () => {
    // Initialize React Hook Form
    const { register, handleSubmit, errors } = useForm();



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
                <FormField>
                    <label>First Name</label>
                    <input
                        name="firstName"
                        placeholder="First Name"
                        ref={register}
                    />
                    {errors && errors.firstName && (
                        <div style={{ color: "red" }}>{errors.firstName.message}</div>
                    )}
                </FormField>
                <FormField>
                    <label>Last Name</label>
                    <input
                        name="lastName"
                        placeholder="Last Name"
                        ref={register}
                    />
                    {errors && errors.lastName && (
                        <div style={{ color: "red" }}>{errors.lastName.message}</div>
                    )}
                </FormField>
                <FormField>
                    <label>Email</label>
                    <input
                        name="email"
                        placeholder="Enter Your Email"
                        ref={register}
                    />
                    {errors && errors.email && (
                        <div style={{ color: "red" }}>{errors.email.message}</div>
                    )}
                </FormField>
                <FormField>
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        ref={register}
                    />
                    {errors && errors.password && (
                        <div style={{ color: "red" }}>{errors.password.message}</div>
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
