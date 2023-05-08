import './PostPreview.css';

const PostPreview = ({ post }) => {

    const imageUrlPost = `http://localhost:3001/static/${post.filename}`;

    return (
        <div className="postPreviewImgContainer">
            <a href="">
                <img src={imageUrlPost} alt="postImage" />
            </a>
        </div>
    )
}
 
export default PostPreview;