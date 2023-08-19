const mapGetAlbumByIdToModel = ({ id, name, year }) => ({
  id,
  name,
  year,
});

const mapGetSongByIdToModel = ({ id, title, performer }) => ({
  id,
  title,
  performer,
});

const mapGetSongToModel = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId,
});

module.exports = {
  mapGetAlbumByIdToModel,
  mapGetSongByIdToModel,
  mapGetSongToModel,
};
