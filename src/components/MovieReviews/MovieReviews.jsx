import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { getAccessKey } from "api/api-tmdb";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  const accessKey = getAccessKey();

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`;
    const options = {
      headers: {
        Authorization: accessKey,
      },
    };

    axios
      .get(url, options)
      .then((response) => setReviews(response.data.results))
      .catch((err) => console.error(err));
  }, [movieId, accessKey]);

  return (
    <div>
      <h3>Reviews</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <h4>{review.author}</h4>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
