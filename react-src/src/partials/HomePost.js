import React from 'react';
import { Link } from 'react-router-dom';
import WithConsumer from '../context/WithConsumer';
import PostMeta from './PostMeta';

const HomePost = ({ index, context }) => {
  const posts = () => context.posts;
  const item = posts()[index];

  let linkPrefix = item.type === 'page' ? '/page/' : '/post/';

  let theContent = '';
  
  switch (context.route) {
    case '/':
    case '/search/:term':
    case '/category/:catid':
      theContent = item.excerpt.rendered; // show excerpt only
      break;
    default:
      theContent = item.excerpt.rendered;
      break;
  }


  return (
    <div id={'post-id-' + item.id} className={'post-item'}>
      <h1><Link to={'/wordpress/' + item.slug}>{item.title.rendered}</Link></h1>
      <PostMeta index={index}></PostMeta>
      <div className="post-content" dangerouslySetInnerHTML={{ __html: theContent }}></div>
    </div>
  );
};

export default WithConsumer(HomePost);
