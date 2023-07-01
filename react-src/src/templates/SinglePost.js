import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WithConsumer from "../context/WithConsumer";
import axios from "axios";
import Loader from "../partials/Loader";
import Moment from "react-moment";

const SinglePost = ({ index, context }) => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [authorName, setAuthorName] = useState('');
  const [authorID, setAuthorID] = useState(''); // Move authorID declaration here

  useEffect(() => {
    const fetchPostBySlug = async () => {
      try {
        const response = await axios.get(
          `http://localhost/wordpress/wp-json/wp/v2/posts?slug=${slug}`
        );
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          setPost(data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    const fetchAuthorByID = async () => {
      try {
        const response = await axios.get(
          `http://localhost/wordpress/wp-json/wp/v2/users?user=${authorID}`
        );
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          setAuthorName(data[0].name); // Update to access the author's name property
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAuthorByID();

    fetchPostBySlug();
  }, [slug, authorID]);

  if (!post) {
    return <Loader />;
  }

  const { title, content, date, author } = post;
  const theContent = content.rendered;

  return (
    <div>
      <h1>{title.rendered}</h1>
      <div className="post-meta">
        Published: <Moment format="MM/DD/YYYY">{date}</Moment>,
        Written by {authorName}
      </div>
      
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: theContent }}
      ></div>
    </div>
  );
};

export default WithConsumer(SinglePost);
