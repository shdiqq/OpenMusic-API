const postAuthentication = async (_this, request, h) => {
  _this._validator.validatePostAuthenticationPayload(request.payload);

  const { username, password } = request.payload;

  const id = await _this._userService.getUserByUsernameAndPasswordService(username, password);

  const accessToken = _this._tokenManager.generateAccessToken({ id });
  const refreshToken = _this._tokenManager.generateRefreshToken({ id });

  await _this._authenticationService.postRefreshTokenService(refreshToken);

  const response = h.response({
    status: 'success',
    message: 'Authentication berhasil ditambahkan',
    data: {
      accessToken,
      refreshToken,
    },
  });
  response.code(201);
  return response;
}

module.exports = postAuthentication