import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { getAccessKey } from "api/api-tmdb";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  const accessKey = getAccessKey();

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
    const options = {
      headers: {
        Authorization: `Bearer ${accessKey}`,
      },
    };

    axios
      .get(url, options)
      .then((response) => setCast(response.data.cast))
      .catch((err) => console.error(err));
  }, [movieId, accessKey]);

  return (
    <div>
      <ul>
        {cast.map((member) => (
          <li key={member.cast_id}>{member.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
