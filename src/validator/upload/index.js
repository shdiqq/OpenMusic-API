const InvariantError = require('../../exception/InvariantError');
const ImageHeaderSchema = require('./schema/image-header-schema');

const UploadsValidator = {
  validateImageHeaders: (header) => {
    const validationResult = ImageHeaderSchema.validate(header);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = UploadsValidator;
