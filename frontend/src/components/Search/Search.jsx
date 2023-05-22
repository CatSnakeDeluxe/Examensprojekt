import React, { useState } from 'react';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import { useAuthContext } from '../../hooks/useAuthContext';
import URL from '../../url';
import Post from '../Post/Post';

const Search = () => {
  const { user } = useAuthContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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

  return (
    <div>
      <Header />
      <h2>Search</h2>
      <div>
        <input type="text" value={searchQuery} onChange={handleSearchInputChange} />
        <button onClick={handleSearch}>Search</button>
      </div>
      {searchResults.length > 0 ? (
        <div>
          <h3>Search Results</h3>
          {searchResults.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <p>No search results</p>
      )}
      <Nav />
    </div>
  );
};

export default Search;
