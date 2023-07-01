import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import WithConsumer from '../context/WithConsumer';
import axios from 'axios';

const SinglePostMeta = ({ index, context }) => {
  const posts = () => context.posts;
  const [author, setAuthor] = useState('');
  const item = posts()[index];
  const authorID = item.author;
  let catLink = '';  

  useEffect(() => {
    const fetchAuthorByID = async () => {
      try {
        const response = await axios.get(
          `http://localhost/wordpress/wp-json/wp/v2/users?user=${authorID}`
        );
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          setAuthor(data[0].name); // Update to access the author's name property
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAuthorByID();
  }, [authorID]);

  if (item.categories) {
    catLink = (
      <span>
        Under{' '}
        <Link to={'/category/' + item.categories[0]}>{item.category_name}</Link>
      </span>
    );
  }

  let theMeta = '';
  if (item.type === 'post') {
    theMeta = (
      <div className="post-meta">
        Published: <Moment format="MM/DD/YYYY">{item.date}</Moment>,
        Written by {author}, {catLink}
      </div>
    );
  }

  return theMeta;
};

export default WithConsumer(SinglePostMeta);
