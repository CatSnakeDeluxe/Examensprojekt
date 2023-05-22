import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import './Notification.css';
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from 'react';
import URL from '../../url';

const Notification = () => {
  const { user } = useAuthContext();
  const [notifications, setNotifications] = useState([]);
  const [username, setUsername] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [usersData, setUsersData] = useState({});
  
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`${URL}/api/post/notifications/${user.user._id}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
    
        const data = await response.json();

        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();

  }, []);

  useEffect(() => {
    const fetchPostedBy = async (likedBy) => {
      try {
        const singleUser = await fetch(`${URL}/api/user/${likedBy}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        const likedByUser = await singleUser.json();

        setUsersData((prevData) => ({
          ...prevData,
          [likedBy]: likedByUser
        }));
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    const uniqueLikedByValues = Array.from(new Set(notifications.map((notification) => notification.likedBy)));

    uniqueLikedByValues.forEach((likedBy) => {
      if (!usersData[likedBy]) {
        fetchPostedBy(likedBy);
      }
    });
  }, [notifications, user, usersData]);


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

  const imageUrlProfile = `${URL}/static/${profileImg}`

  return (
    <div>
      <Header />
      <h2>Notifications</h2>
      {notifications && notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <div className="notification" key={index}>
            {usersData[notification.likedBy] && (
              <div className="notificationUser">
                <div className="notificationLeft">
                  <div className="notificationsUserImgContainer">
                    <img src={`${URL}/static/${usersData[notification.likedBy].filename}`} alt="userImage" />
                  </div>
                  <div className="notificationUsername">
                    <p>{usersData[notification.likedBy].username}</p>
                    <p className="likedYourPost">liked your post</p>
                  </div>
                </div>
                <p className="time">{timeSince(notification.createdAt)}</p>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="noNotifications">No notifications</p>
      )}
      <Nav />
    </div>
  );
};

export default Notification;