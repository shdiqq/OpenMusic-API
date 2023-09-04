const deleteAuthentication = async (_this, request) => {
  _this._validator.validateDeleteAuthenticationPayload(request.payload);

  const { refreshToken } = request.payload;

  await _this._authenticationService.getRefreshTokenService(refreshToken);

  await _this._authenticationService.deleteRefreshTokenService(refreshToken);

  return {
    status: 'success',
    message: 'Refresh token berhasil dihapus',
  };
};

module.exports = deleteAuthentication;
