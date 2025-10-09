import http from "../http/responses.js";

export const validate = (schema) => async (request, reply) => {
  try {
    await schema.validate(request.body, { abortEarly: false });
  } catch (err) {
    if (err.name === "ValidationError") {
      http.unprocessableEntity(reply, { errors: err.errors });
      return;
    }

    http.badRequest(reply, { error: "Ocorreu um erro inesperado na validação." });
    return;
  }
};