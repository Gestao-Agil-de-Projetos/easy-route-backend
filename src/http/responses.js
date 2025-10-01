export default {
  unauthenticated: (reply, message = "Unauthenticated") => {
    return reply.code(401).send({ success: false, message });
  },
  forbidden: (reply, message = "Forbidden") => {
    return reply.code(403).send({ success: false, message });
  },
  notFound: (reply, data = null) => {
    return reply
      .code(404)
      .send(data || { success: false, message: "Not Found" });
  },
  created: (reply, data = { success: true, data: true }) => {
    return reply.code(201).send(data || { success: true, message: "Created" });
  },
  unprocessableEntity: (reply, data) => {
    return reply.code(422).send(data);
  },
  ok: (reply, data) => {
    return reply.code(200).send(data);
  },
  deleted: (reply) => {
    return reply.code(204).send();
  },
  badRequest: (reply, data) => {
    return reply.code(400).send(data);
  },
  conflict: (reply, data) => {
    return reply.code(409).send(data);
  },
  serverError: (reply, data) => {
    console.error(data || { success: false, message: "Internal server error" });
    return reply
      .code(500)
      .send(data || { success: false, message: "Internal server error" });
  },
  internalServerError: (reply, data) => {
    return reply
      .code(500)
      .send(data || { success: false, message: "Internal server error" });
  },
  excelFile: (reply, filename, buffer) => {
    reply.header(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    reply.header("Content-Disposition", "attachment; filename=" + filename);
    return reply.send(buffer);
  },
  imageFile: (
    reply,
    fileBuffer,
    mimeType = "image/jpeg",
    cacheTime = "31536000"
  ) => {
    reply.header("Content-Type", mimeType);
    reply.header("Cache-Control", "public, max-age=" + cacheTime);
    return reply.send(fileBuffer);
  },
};
