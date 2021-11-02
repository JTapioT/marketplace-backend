export const badRequestHandler = (error, req, res, next) => {
  console.log(error.errorsList);
  if (error.status === 400) {
    res.status(400).send({ message: error.errorsList });
  } else {
    next(error);
  }
};

export const notFoundHandler = (error, req, res, next) => {
  if (error.status === 404) {
    res.status(404).send({ message: error.message || "Resource not found!" });
  } else {
    next(error);
  }
};

export const genericErrorHandler = (error, req, res, next) => {
  console.log("Generic server error: ", error);
  res.status(500).send({
    message: "Generic Server Error",
  });
};
