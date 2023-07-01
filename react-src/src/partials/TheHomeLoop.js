import React from 'react';
import WithConsumer from '../context/WithConsumer';
import HomePost from './HomePost';
import Loader from './Loader';
const TheHomeLoop = ({ context }) => {
    const posts = () => context.posts;
    const pos = posts();
    let results = '';
    if(context.appError){
      results = <div className="app-error">{context.appError}</div>;
    }else{
      if(pos.length === 0){
        results = <Loader />;
      }else{
        if (Array.isArray(pos)) {
          results = pos.map(function(item, i) {
            if (i < 3) {
            return <HomePost key={i} index={i}></HomePost>;
            }
          });
        }
        
      }
    }
    return (results);
};
export default WithConsumer(TheHomeLoop);