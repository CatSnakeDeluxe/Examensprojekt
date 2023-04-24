import { PostContext } from '../context/PostContext';
import { useContext } from 'react';

export const usePostsContext = () => {
    const context = useContext(PostContext);

    if (!context) {
        throw Error('usePostsContext must be used inside an PostsContextProvider');
    }

    return context;
}