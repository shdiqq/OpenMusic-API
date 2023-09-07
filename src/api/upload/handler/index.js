const postUploadImage = require('./post-upload-image');

class UploadHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  postUploadImageHandler = async (request, h) => {
    const result = await postUploadImage(this, request, h);
    return result;
  };
}

module.exports = UploadHandler;
