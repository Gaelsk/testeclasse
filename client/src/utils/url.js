const host = 'http://localhost:3001'
const getAvatar = avatar => `${host}/avatar/${avatar}`;
const getPostImage = name => `${host}/post/${name}`;
export { getAvatar, getPostImage }