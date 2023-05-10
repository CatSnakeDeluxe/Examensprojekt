import './PostPreview.css';
import URL from '../../url';

const PostPreview = ({ post }) => {
    const imageUrlPost = `${URL}/static/${post.filename}`;
    const selectedPost = `/userPage/${post._id}`;
    return (
        <div className="postPreviewImgContainer">
            <a href={selectedPost}>
                <img src={imageUrlPost} alt="postImage" />
            </a>
        </div>
    )
}
 
export default PostPreview;