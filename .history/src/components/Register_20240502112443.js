import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Container, Form, FormField, Icon } from "semantic-ui-react";

/* //schema
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
    gender: Joi.string().valid('male', 'female', 'other').required().messages({
        "any.required": "Gender is required",
        "any.only": "Please select a valid gender",
    }),
    birthDate: Joi.date()
        .max(minBirthDate)
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
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        "string.base": "Email must be a string",
        "string.empty": "Please enter your email",
        "string.email": "Please enter a valid email address",
        "any.required": "Email is required",
    }),
    password: Joi.string().pattern(passwordRegex).required().messages({
        "string.base": "Password must be a string",
        "string.empty": "Please enter your password",
        "string.pattern.base": "Password must be 3 to 30 characters long and contain at least one lowercase letter, one uppercase letter, and one digit",
        "any.required": "Password is required",
    }),
    confirmPassword: Joi.string().valid().required().messages({
        "any.required": "Confirm password is required",
        "any.only": "Passwords do not match",
    }),
    country: Joi.string().required().messages({
        "any.required": "Please select a country",
        "string.empty": "Please select a country",
    }),
}); */

const schema = Joi.object({
    firstName: Joi.string().min(2).max(20).required().label("First Name"),
    middleName: Joi.string().min(2).max(20).required().label("Last Name"),
    birthDate: Joi.date().max('now').max('2004-01-01').iso().required().label("Birth Date").messages({
        'date.max': 'You must be at least 18 years old',
        'date.iso': 'Please enter a valid date',
    }),
    phoneNumber: Joi.string().length(10).required().label("Phone Number"),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().label("Email"),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{3,}$/).required().label("Password"),
    confirmPassword: Joi.any().equal(Joi.ref('password')).required().label('Confirm Password').options({ messages: { 'any.only': '{{#label}} does not match' } })
});

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    //useForm
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: joiResolver(schema) });



    //submit handler
    const onSubmit = (data) => {
        console.log(data);
        reset();
        alert("Registration Successfully done!")
    };

    return (
        <Container
            style={{
                paddingTop: "20px",
                paddingBottom: "20px",
                display: "flex",
                width: "50%",
                justifyContent: "center",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                borderRadius: "8px",
            }}
        >

            <Form style={{ width: "70%" }} onSubmit={handleSubmit(onSubmit)}>
                <div className="form-field">
                    <FormField>
                        <label>First Name</label>
                        <input
                            placeholder="First Name"
                            {...register("firstName")}

                        />
                        {errors.firstName && (
                            <div className="ui pointing red basic label">
                                {errors.firstName.message}
                            </div>
                        )}
                    </FormField>
                </div>
                <div className="form-field">
                    <FormField>
                        <label>Last Name</label>
                        <input
                            placeholder="Last Name"
                            {...register("middleName")}

                        />
                        {errors.middleName && (
                            <div className="ui pointing red basic label">
                                {errors.middleName.message}
                            </div>
                        )}
                    </FormField>
                </div>

                <div className="form-field">
                    <FormField>
                        <label>Birth Date</label>
                        <input
                            type="date"
                            name="birthDate"
                            {...register("birthDate")}

                        />
                        {errors.birthDate && (
                            <div className="ui pointing red basic label">
                                {errors.birthDate.message}
                            </div>
                        )}
                    </FormField>
                </div>

                {/*  <div className="form-field">
                    <FormField>
                        <label>Gender</label>
                        <div className="gender-field">
                            <div className="gender-option">
                                <input type="radio" id="male" {...register("gender")} value="male" />
                                <label htmlFor="male">Male</label>
                            </div>
                            <div className="gender-option">
                                <input type="radio" id="female" {...register("gender")} value="female" />
                                <label htmlFor="female">Female</label>
                            </div>
                            <div className="gender-option">
                                <input type="radio" id="other" {...register("gender")} value="other" />
                                <label htmlFor="other">Other</label>
                            </div>
                        </div>
                        {errors.gender && (
                            <div className="ui pointing red basic label">
                                {errors.gender.message}
                            </div>
                        )}
                    </FormField>
                </div> */}

                <div className="form-field">
                    <FormField>
                        <label>Phone Number</label>
                        <input
                            placeholder="Phone Number"
                            {...register("phoneNumber")}

                        />
                        {errors.phoneNumber && (
                            <div className="ui pointing red basic label">
                                {errors.phoneNumber.message}
                            </div>
                        )}
                    </FormField>
                </div>

                <div className="form-field">
                    <FormField>
                        <label>Email</label>
                        <input
                            placeholder="Email"
                            {...register("email")}

                        />
                        {errors.email && (
                            <div className="ui pointing red basic label">
                                {errors.email.message}
                            </div>
                        )}
                    </FormField>
                </div>
                <div className="form-field">
                    <FormField>
                        <label>Password</label>
                        <div className="ui input">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                {...register("password")}

                            />
                            <Icon
                                name={showPassword ? "eye slash" : "eye"}
                                link
                                onClick={togglePasswordVisibility}
                                style={{ cursor: "pointer", position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }}
                            />
                        </div>
                        {errors.password && (
                            <div className="ui pointing red basic label">
                                {errors.password.message}
                            </div>
                        )}
                    </FormField>
                </div>
                <div className="form-field">
                    <FormField>
                        <label>Confirm Password</label>
                        <div className="ui input">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                {...register("confirmPassword")}

                            />
                            <Icon
                                name={showConfirmPassword ? "eye slash" : "eye"}
                                link
                                onClick={toggleConfirmPasswordVisibility}
                                style={{ cursor: "pointer", position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }}
                            />
                        </div>
                        {errors.confirmPassword && (
                            <div className="ui pointing red basic label">
                                {errors.confirmPassword.message}
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


{/*
             
             
             
              
                <div className="form-field">
                    <FormField error={formErrors.country !== undefined}>
                        <label>Country</label>
                        <select {...register("country")} className={formErrors.country ? "error" : "ui search dropdown"}>
                            <option value="">Select your country</option>
                            {
                                countryOptions?.map((country) => <option key={country?.key} value={country?.value}>{country?.text}</option>)
                            }
                        </select>
                        {formErrors.country && (
                            <div className="ui pointing red basic label">
                                {formErrors.country}
                            </div>
                        )}
                    </FormField>
                </div>
            
                */}