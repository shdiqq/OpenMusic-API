const putAuthentication = async (_this, request) => {
  _this._validator.validatePutAuthenticationPayload(request.payload);

  const { refreshToken } = request.payload;

  await _this._authenticationService.getRefreshTokenService(refreshToken);

  const { id } = _this._tokenManager.verifyRefreshToken(refreshToken);

  const accessToken = _this._tokenManager.generateAccessToken({ id });
  return {
    status: 'success',
    message: 'Access Token berhasil diperbarui',
    data: {
      accessToken,
    },
  };
};

module.exports = putAuthentication;
