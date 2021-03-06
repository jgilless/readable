const headers = new Headers({
  Authorization: 'jvg',
  'Content-Type': 'application/json'
});

const postHeaders = data => {
  return {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  };
};

const deleteHeaders = () => {
  return {
    method: 'DELETE',
    headers: headers
  };
};

const putHeaders = data => {
  return {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(data)
  };
};

export const fetchCategories = () => {
  return fetch('http://localhost:3001/categories', { headers })
    .then(res => res.json())
    .then(({ categories }) => categories);
};

export const fetchCategoryPosts = category => {
  return fetch(`http://localhost:3001/${category}/posts`, {
    headers
  }).then(res => res.json());
};

export const fetchPosts = () => {
  return fetch('http://localhost:3001/posts', { headers }).then(res =>
    res.json()
  );
};

export const fetchPostByID = id => {
  return fetch(`http://localhost:3001/posts/${id}`, { headers }).then(res =>
    res.json()
  );
};

export const fetchCommentByID = id => {
  return fetch(`http://localhost:3001/comments/${id}`, { headers }).then(res =>
    res.json()
  );
};

export const fetchPostComments = id => {
  return fetch(`http://localhost:3001/posts/${id}/comments`, {
    headers
  }).then(res => res.json());
};

export const sendScoreUpdate = (id, type, option) => {
  const data = { option: option };
  return fetch(
    `http://localhost:3001/${type}/${id}`,
    postHeaders(data)
  ).then(res => res.json());
};

export const sendNewPost = data => {
  return fetch(`http://localhost:3001/posts`, postHeaders(data)).then(res =>
    res.json()
  );
};

export const sendNewComment = data => {
  return fetch(`http://localhost:3001/comments`, postHeaders(data)).then(res =>
    res.json()
  );
};

export const sendDeleteComment = id => {
  return fetch(`http://localhost:3001/comments/${id}`, deleteHeaders());
};

export const sendDeletePost = id => {
  return fetch(`http://localhost:3001/posts/${id}`, deleteHeaders());
};

export const sendUpdatePost = (id, data) => {
  return fetch(
    `http://localhost:3001/posts/${id}`,
    putHeaders(data)
  ).then(res => {
    res.json();
  });
};

export const sendUpdateComment = (id, data) => {
  return fetch(
    `http://localhost:3001/comments/${id}`,
    putHeaders(data)
  ).then(res => {
    res.json();
  });
};
