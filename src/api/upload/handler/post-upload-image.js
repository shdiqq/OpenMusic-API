const postUploadImage = async (_this, request, h) => {
  const { data } = request.payload;
  this._validator.validateImageHeaders(data.hapi.headers);

  const filename = await this._service.writeFile(data, data.hapi);

  const pictureUrl = `http://${process.env.HOST}:${process.env.PORT}/api/album/file/cover/${filename}`;

  const response = h.response({
    status: 'success',
    data: {
      pictureUrl,
    },
  });
  response.code(201);
  return response;
};

module.exports = postUploadImage;
