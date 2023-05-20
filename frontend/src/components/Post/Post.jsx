import { useAuthContext } from '../../hooks/useAuthContext';
import { useEffect, useState } from 'react';
import URL from '../../url';
import './Post.css';

const Post = ({ post, handleLike }) => {
    const { user } = useAuthContext();
    const [username, setUsername] = useState('');
    const [profileImg, setProfileImg] = useState('');
    const isLiked = post.like.includes(user.user._id);
    const [likeCount, setLikeCount] = useState(post.like.length);
    // const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        setLikeCount(post.like.length);
      }, [post.like, post.user_id]);

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

    useEffect(() => {
        const fetchPostedBy = async () => {
            const singleUser = await fetch(`${URL}/api/user/${post.postedBy}`, {
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

    const imageUrlPost = `${URL}/static/${post.filename}`;
    const imageUrlProfile = `${URL}/static/${profileImg}`;

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
                    <i onClick={() => handleLike(post._id)} className={isLiked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i>
                    <p className="likes">{likeCount}</p>
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
        </div>
    )
}
 
export default Post;