"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const validator = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        if (!result.success) {
            const errors = result.error.issues.map(({ path, message }) => {
                return {
                    path: path.join("."),
                    message,
                };
            });
            return next({
                message: "Validation error",
                statusCode: 400,
                status: "fail",
                errors,
            });
        }
        //if sucess
        req.body = result.data.body;
        //req.query = result.data.query as Record<string,any>;
        Object.assign(req.params, result.data.params);
        Object.assign(req.query, result.data.query);
        next();
    };
};
exports.validator = validator;
