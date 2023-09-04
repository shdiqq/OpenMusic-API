const getUserById = async (_this, request) => {
  const { id } = request.params;
  const user = await this._service.getUserById(id);
  return {
    status: 'success',
    data: {
      user,
    },
  };
};

module.exports = getUserById;
