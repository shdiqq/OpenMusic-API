const postUser = async (_this, request, h) => {
  _this._validator.validatePostUserPayload(request.payload);
  const { username, password, fullname } = request.payload;
  const userId = await _this._service.postUserService({
    username,
    password,
    fullname,
  });

  const response = h.response({
    status: 'success',
    message: 'User berhasil ditambahkan',
    data: {
      userId,
    },
  });
  response.code(201);
  return response;
};

module.exports = postUser;
