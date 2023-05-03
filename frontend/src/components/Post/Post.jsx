// import { usePostsContext } from '../../hooks/usePostsContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useEffect, useState } from 'react';
import './Post.css';

const Post = ({ post }) => {
    // const { dispatch } = usePostsContext();
    const { user } = useAuthContext();
    const [username, setUsername] = useState('');
    const [profileImg, setProfileImg] = useState('');

    function timeSince(timestamp) {
        let time = Date.parse(timestamp);
        let now = Date.now();
        let secondsPast = (now - time) / 1000;
        let suffix = 'ago';
      
        let intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
            second: 1
        };
      
        for (let i in intervals) {
              let interval = intervals[i];
              if (secondsPast >= interval) {
                  let count = Math.floor(secondsPast / interval);
                  return `${count} ${i}${count > 1 ? 's' : ''} ${suffix}`;
                }
        }
    }

    // const fetchPostedBy = async () => {
    //     const singleUser = await fetch('/api/user/' + post.postedBy, {
    //         headers: {
    //             'Authorization': `Bearer ${user.token}`
    //         }
    //     });

    //     const postedByUser = await singleUser.json();

    //     console.log("postedByUser", postedByUser);
    //     console.log(postedByUser.username);
    // }

    // fetchPostedBy();

    useEffect(() => {
        const fetchPostedBy = async () => {
            const singleUser = await fetch('/api/user/' + post.postedBy, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            const postedByUser = await singleUser.json();

            setUsername(postedByUser.username);
            setProfileImg(postedByUser.filename);
        }

        fetchPostedBy();
        
    }, [user]);

    // const handleDelete = async() => {
    //     const response = await fetch('/api/post/' + post._id, {
    //         method: 'DELETE',
    //         headers: {
    //             'Authorization': `Bearer ${user.token}`
    //         }
    //     });
    //     const json = await response.json();

    //     if (response.ok) {
    //         dispatch({type: 'DELETE_POST', payload: json});
    //     }
    // }

    const imageUrlPost = `http://localhost:3001/static/${post.filename}`;
    const imageUrlProfile = `http://localhost:3001/static/${profileImg}`;

    return (
        <div className="post">
            <div className="postHeader">
                <div>
                    <div className="userContainer">
                        <div className="userImgContainer">
                            <img src={imageUrlProfile} alt="userImage" />
                        </div>
                        <p className="postUsername">{username}</p>
                    </div>
                </div>
                <div>
                    <p className="timeSince">{timeSince(post.createdAt)}</p>
                </div>
            </div>
            <div className="postImgContainer">
                <img src={imageUrlPost} alt="postImage" />
            </div>
            <div className="iconsContainer">
                <div className="likesContainer">
                    <i className="fa-regular fa-heart"></i>
                    <p className="likes">3</p>
                </div>
                <div>
                    <i className="fa-regular fa-bookmark"></i>
                    <i className="fa-regular fa-message"></i>
                </div>
            </div>
            <div className="descriptionContainer">
                <p className="description">{post.description}</p>
                <p className="hashtags">{post.hashtags}</p>
            </div>
            {/* <span onClick={handleDelete}>Delete</span> */}
        </div>
    )
}
 
export default Post;