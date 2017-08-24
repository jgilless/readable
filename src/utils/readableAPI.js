const headers = new Headers({
    'Authorization': 'jvg'
});

export const fetchCategories = () => {
    return fetch('http://localhost:5001/categories', {headers})
        .then((res) => res.json())
        .then(({categories}) => categories);
};

export const fetchCategoryPosts = (category) => {
    return fetch(`http://localhost:5001/${category}/posts`, {headers})
        .then((res) => res.json())
};

export const fetchPosts = () => {
    return fetch('http://localhost:5001/posts', {headers})
        .then((res) => res.json())
};

export const fetchPostByID = (id) => {
    return fetch(`http://localhost:5001/posts/${id}`, {headers})
        .then((res) => res.json())
};

export const fetchPostComments = (id) => {
    return fetch(`http://localhost:5001/posts/${id}/comments`, {headers})
        .then((res) => res.json())
};