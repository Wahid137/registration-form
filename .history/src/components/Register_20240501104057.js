const Register = () => {
    // Initialize React Hook Form
    const { register, handleSubmit, errors } = useForm();

    // Define validation schema
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    // Handle form submit
    const onSubmit = (formData) => {
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
            return;
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
            <Form style={{ width: "70%" }} onSubmit={handleSubmit(onSubmit)}>
                <FormField>
                    <label>First Name</label>
                    <input
                        name="firstName"
                        placeholder="First Name"
                        ref={register}
                    />
                    {errors.firstName && (
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
                    {errors.lastName && (
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
                    {errors.email && (
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
                    {errors.password && (
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
