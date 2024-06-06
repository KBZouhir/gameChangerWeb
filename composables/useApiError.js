import {useNuxtApp} from "nuxt/app";

const SERVER_ERROR_KEY = 'messages.errors.serverError';
const NOT_FOUND_KEY = 'messages.errors.notFound';
const UNAUTHENTICATED_KEY = 'messages.errors.unauthenticatedError';
const FORBIDDEN_KEY = 'messages.errors.forbiddenError';
import {errorAlert} from "~/composables/useAlert";


export const handleApiError = error => {
    // const {$__} = useNuxtApp();
    const status = error.statusCode;
    const apiError = {
        status:500,
        message: 'SERVER_ERROR_KEY'
    }

    if (!error.data)
    {
        errorAlert(apiError.message)
        return apiError;
    }

    if (status === 401)
    {
        apiError.status = 401;
        apiError.message ='UNAUTHENTICATED_KEY';
    }

    if (status === 404)
    {
        apiError.status = 404;
        apiError.message = 'NOT_FOUND_KEY';
    }

    if (status === 500)
        {
            apiError.status = 500;
            apiError.message = 'SERVER_ERROR';
        }

    if (status === 403)
    {
        apiError.status = 403;
        apiError.message = 'FORBIDDEN_KEY';
    }

    if (status === 422)
    {
        const errors = error.data.errors;
        const formattedErrors = Object.entries(errors).flatMap(([key, messages]) =>
            messages.map(message => ({ path: key, message }))
        );
        apiError.status = 422;
        apiError.message = error.data.message;
        apiError.errors = formattedErrors;
    }

    if (status === 400)
    {
        apiError.status = 400;
        apiError.message = error.data.message;
    }

    errorAlert(apiError.message)
    return apiError;
}
