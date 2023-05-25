import React, { useState } from 'react';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import { useAuthContext } from '../../hooks/useAuthContext';
import URL from '../../url';
import Post from '../Post/Post';
import { usePostsContext } from '../../hooks/usePostsContext';
import './Search.css';

const Search = () => {
  const { user } = useAuthContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { posts, dispatch } = usePostsContext();

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`${URL}/api/post/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ query: searchQuery }),
      });

      const data = await response.json();

      setSearchResults(data);
    } catch (error) {
      console.error('Error searching posts:', error);
    }
  };

  const handleLike = async (id) => {
    const response = await fetch(`${URL}/api/post/${id}/like`, {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: user.user._id }),
    });

    if (response.ok) {
        const updatedPost = await response.json();
        dispatch({ type: 'EDIT_POST', payload: updatedPost });
    }
};

  return (
    <div>
      <Header />
      <div className="searchbar">
        <input className="search" type="text" value={searchQuery} onChange={handleSearchInputChange} placeholder="Search for posts..."/>
        <i onClick={handleSearch} className="fa-solid fa-magnifying-glass"></i>
      </div>
      {searchResults.length > 0 ? (
        <div>
          <p className="searchResult">Posts Found :</p>
          <div className="searchPostsContainer">
            {searchResults.map((post) => (
              <div className="searchPosts">
                <Post key={post._id} post={post}handleLike={handleLike} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="searchResult">No Posts Found</p>
      )}
      <Nav />
    </div>
  );
};

export default Search;
