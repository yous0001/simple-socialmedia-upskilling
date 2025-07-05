
const reqKeys = ['body', 'headers', 'query', 'params']
export const validationMiddleware = (schema) => {
    return async (req, res, next) => {
        let validationErrors = [];
        for (const key of reqKeys) {
            const validationResult = schema[key]?.validate(req[key], { abortEarly: false })
            if (validationResult?.error) {
                validationErrors.push(validationResult.error.details);
            }
        }
        if (validationErrors.length > 0) {
            const formattedErrors = validationErrors.flat().map(err => ({
                message: err.message,
                path: err.path.join('.')
            }));
            return res.status(400).json({ message: "Validation error", errors: formattedErrors });
        }
        next();

    }
}
