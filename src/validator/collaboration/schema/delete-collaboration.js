const Joi = require('joi');

const DeleteCollaborationPayloadSchema = Joi.object({
  playlistId: Joi.string().required(),
  userId: Joi.string().required(),
});

module.exports = DeleteCollaborationPayloadSchema;
