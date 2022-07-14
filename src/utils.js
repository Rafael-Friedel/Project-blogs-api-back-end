// const throwNotFoundError = (message) => {
//     const err = new Error(message);
//     err.code = 404;
//     throw err;
//   };
  
//   const throwUnauthorizedError = (message = 'Não autorizado') => {
//     const err = new Error(message);
//     err.code = 401;
//     throw err;
//   };

  const throwConflictsError = (message) => {
    const err = new Error(message);
    err.code = 409;
    throw err;
  };

  const throwInvalidError = (message) => {
    const err = new Error(message);
    err.code = 400;
    throw err;
  };
  
  module.exports = {
    throwInvalidError,
    throwConflictsError,
  };