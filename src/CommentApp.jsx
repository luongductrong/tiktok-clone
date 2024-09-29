import React, { useEffect, useState } from 'react';

const CommentApp = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const channel = new BroadcastChannel('comment_channel');

  useEffect(() => {
    // Nhận bình luận từ kênh
    channel.onmessage = (event) => {
      setComments((prevComments) => [...prevComments, event.data]);
    };

    // Dọn dẹp kênh khi component bị hủy
    return () => {
      channel.close();
    };
  }, []);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      // Gửi bình luận tới kênh
      channel.postMessage(newComment);
      setNewComment('');
    }
  };

  return (
    <div>
      <h1>Bình luận</h1>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Nhập bình luận của bạn..."
        />
        <button type="submit">Gửi</button>
      </form>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommentApp;
