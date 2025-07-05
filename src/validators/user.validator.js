import Joi from "joi";

export const registerSchema = {
    body: Joi.object({
        name: Joi.string().required().min(3).messages({
            'string.empty': 'Name is required',
            'any.required': 'Name is required',
            'string.min': 'Name must be at least 3 characters long',
        }),
        email: Joi.string().email().required().messages({
            'string.empty': 'Email is required',
            'any.required': 'Email is required',
            'string.email': 'Invalid email format',
        }),
        password: Joi.string().min(6).required().messages({
            'string.empty': 'Password is required',
            'any.required': 'Password is required',
            'string.min': 'Password must be at least 6 characters long',
        }),
    }),
};

export const loginSchema = {
    body: Joi.object({
        email: Joi.string().email().required().messages({
            'string.empty': 'Email is required',
            'any.required': 'Email is required',
            'string.email': 'Invalid email format',
        }),
        password: Joi.string().min(6).required().messages({
            'string.empty': 'Password is required',
            'any.required': 'Password is required',
            'string.min': 'Password must be at least 6 characters long',
        }),
    }),
};