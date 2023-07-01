import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

const storeContext = React.createContext();
export const Consumer = storeContext.Consumer;
Axios.defaults.baseURL = 'http://localhost/wordpress';

export const Provider = (props) => {
  const params = useParams();

  const [term, setTerm] = useState('');
  const [slug, setSlug] = useState('');
  const [restType, setRestType] = useState('');
  const [catid, setCatid] = useState('');
  const [route, setRoute] = useState('');
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [commentFields, setCommentFields] = useState({
    fullName: '',
    email: '',
    website: '',
    comment: ''
  });
  const [appError, setAppError] = useState('');
  const [commentErrors, setCommentErrors] = useState([]);

  useEffect(() => {
    setRestType(getRestType(params.path));
    setRoute(params.path);
    setSlug(params.slug ? params.slug : '');
    setTerm(params.term ? params.term : '');
    setCatid(params.catid ? params.catid : '');
  }, [params]);

  useEffect(() => {
    getPosts(buildUrl());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restType, currentPage, catid]);

  const getRestType = (path) => {
    let restType = 'post';
    switch (path) {
      case '/page/:slug':
        restType = 'page';
        break;
      case '/search/:term':
        restType = 'search';
        break;
      case '/category/:catid':
        restType = 'category';
        break;
      case '/post/:slug':
      default:
        restType = 'post';
        break;
    }
    return restType;
  };

  const updateTerm = (term) => {
    setTerm(term);
  };

  const updateCommentErrors = (errors) => {
    setCommentErrors(errors);
  };

  const submitSearch = () => {
    setRestType('search');
    setCurrentPage(1);
    props.router.history.push('/search/' + term);
  };

  const updateCommentFields = (key, val) => {
    setCommentFields((prevFields) => ({
      ...prevFields,
      [key]: val
    }));
  };

  const submitComment = () => {
    const postdata = {
      post: posts[0].id,
      author_name: commentFields.fullName,
      author_email: commentFields.email,
      author_url: commentFields.website,
      content: commentFields.comment
    };

    Axios.post('/wp-json/wp/v2/comments', postdata)
      .then((response) => {
        const cmnt = response.data;
        cmnt.waiting = 'Your comment is waiting approval';
        setComments((prevComments) => [...prevComments, cmnt]);
      })
      .catch((error) => {
        const err = [];
        err.push(error.message);
        setCommentErrors(err);
      });
  };

  const buildUrl = () => {
    let url = '/wp-json/wp/v2/';
    switch (restType) {
      case 'page':
        url += 'pages/?slug=';
        url += slug;
        break;
      case 'search':
        url += 'search/?s=';
        url += term;
        url += '&page=' + currentPage;
        break;
      case 'category':
        url += 'posts?categories=';
        url += catid;
        url += '&page=' + currentPage;
        break;
      case 'post':
      default:
        url += slug ? 'posts/?slug=' + slug : 'posts/?page=' + currentPage;
        break;
    }

    return url;
  };

  const getComments = (id) => {
    const url = '/wp-json/wp/v2/comments?post=' + id;
    Axios.get(url)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPosts = (url) => {
    Axios.get(url)
      .then((response) => {
        setPosts(response.data);
        setTotalPages(response.headers['x-wp-totalpages']);
        if (route === '/post/:slug' && response.data[0]) {
          getComments(response.data[0].id);
        }
      })
      .catch((error) => {
        console.log(error);
        setAppError('An unexpected error occurred');
      });
  };

  const nextClicked = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const previousClicked = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <storeContext.Provider
      value={{
        term,
        slug,
        restType,
        catid,
        route,
        posts,
        comments,
        currentPage,
        totalPages,
        commentFields,
        appError,
        commentErrors,
        nextClicked,
        previousClicked,
        submitSearch,
        updateTerm,
        submitComment,
        updateCommentFields,
        updateCommentErrors
      }}
    >
      {props.children}
    </storeContext.Provider>
  );
};


