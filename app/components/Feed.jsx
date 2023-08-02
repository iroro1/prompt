"use client";
import React, { useCallback, useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ posts, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {posts?.map((post) => (
        <PromptCard
          post={post}
          key={post._id}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPosts(data);
      setTemp(data);
    };

    fetchPosts();
  }, []);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();

      setSearchText(e.target.value);
      const nArr = [];
      temp.map((post) => {
        if (
          post.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
          post.tag.toLowerCase().includes(searchText.toLowerCase()) ||
          post.creator?.username
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          post.creator?.email.toLowerCase().includes(searchText.toLowerCase())
        ) {
          nArr.push(post);
        }
      });
      console.log(nArr);
      nArr.length > 0 ? setPosts(nArr) : setPosts(temp);
    },
    [searchText]
  );
  const handleTagClick = (tag) => {
    const nArr = [];
    temp.map((post) => {
      if (post.tag.toLowerCase().includes(tag.toLowerCase())) {
        nArr.push(post);
      }
    });
    nArr.length > 0 ? setPosts(nArr) : setPosts(temp);
  };
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          value={searchText}
          onChange={handleSearch}
          required
          type="text"
          placeholder="Search for a tag or username"
          className="search_input peer"
        />
      </form>

      <PromptCardList handleTagClick={handleTagClick} posts={posts} />
    </section>
  );
};

export default Feed;
