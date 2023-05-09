import './PostPreview.css';

const PostPreview = ({ post }) => {
    const imageUrlPost = `http://localhost:3001/static/${post.filename}`;
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