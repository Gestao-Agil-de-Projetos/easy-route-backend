export default {
  unauthenticated: (res, message = "Unauthenticated") => {
    return res.status(401).send({ success: false, message });
  },
  forbidden: (res, message = "Forbidden") => {
    return res.status(403).send({ success: false, message });
  },
  notFound: (res, data = null) => {
    return res
      .status(404)
      .send(data || { success: false, message: "Not Found" });
  },
  created: (res, data = { success: true, data: true }) => {
    return res.status(201).send(data || { success: true, message: "Created" });
  },
  unprocessableEntity: (res, data) => {
    return res.status(422).send(data);
  },
  ok: (res, data) => {
    return res.status(200).send(data);
  },
  deleted: (res) => {
    return res.status(204).send();
  },
  badRequest: (res, data) => {
    return res.status(400).send(data);
  },
  conflict: (res, data) => {
    return res.status(409).send(data);
  },
  serverError: (res, data) => {
    console.error(data || { success: false, message: "Internal server error" });
    return res
      .status(500)
      .send(data || { success: false, message: "Internal server error" });
  },
  internalServerError: (res, data) => {
    return res
      .status(500)
      .send(data || { success: false, message: "Internal server error" });
  },
  excelFile: (res, filename, buffer) => {
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=" + filename);
    return res.end(buffer);
  },
  imageFile: (
    res,
    fileBuffer,
    mimeType = "image/jpeg",
    cacheTime = "31536000"
  ) => {
    res.setHeader("Content-Type", mimeType);
    res.setHeader("Cache-Control", "public, max-age=" + cacheTime);
    res.send(fileBuffer);
  },
};
