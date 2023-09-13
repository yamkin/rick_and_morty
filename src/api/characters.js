import client from "./client";

const getCharacters = (page = 1, name = '') => client.get(`/character/?page=${page}&name=${name}`);

export default {
    getCharacters
};