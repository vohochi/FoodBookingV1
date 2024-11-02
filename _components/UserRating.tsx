import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Rating } from '@mui/material';
import CommentsSection from './UserRatingComment';

interface RatingFormProps {
    onSubmit: (ratingData: { rating: number; comment: string }) => void;
}

const UserRating: React.FC<RatingFormProps> = ({ onSubmit }) => {
    const [userRating, setUserRating] = useState<number | null>(null);
    const [userComment, setUserComment] = useState<string>('');
    const [comments, setComments] = useState<{ rating: number; comment: string }[]>([]);

    const handleRatingChange = (event: React.ChangeEvent<unknown>, newValue: number | null) => {
        setUserRating(newValue);
    };

    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserComment(e.target.value);
    };

    const handleSubmitRating = (): void => {
        if (userRating !== null && userComment.trim()) {
            const newComment = { rating: userRating, comment: userComment };
            setComments([...comments, newComment]); 
            onSubmit(newComment);
            alert(`Sao: ${userRating}, Bình luận: ${userComment}`);

            setUserRating(null);
            setUserComment('');
        } else {
            alert('Vui lòng chọn đánh giá và nhập bình luận!');
        }
    };

    return (
        <section className="user-rating mt-5">
            <div className="container">
                <div className="section-title">
                    <h2 style={{ color: '#1a285a' }}>Đánh giá của người dùng</h2>
                </div>
                <div className="rating-form">
                    <div className="rating-stars">
                        <Rating
                            name="user-rating"
                            value={userRating}
                            onChange={handleRatingChange}
                            size="large"
                            style={{ color: '#f0e68c' }}
                        />
                    </div>
                    <div className="comment-box mt-3">
                        <TextField
                            label="Nhận xét của bạn"
                            multiline
                            rows={3}
                            fullWidth
                            value={userComment}
                            onChange={handleCommentChange}
                            variant="outlined"
                            placeholder="Chia sẻ cảm nhận của bạn về món ăn..."
                            InputLabelProps={{
                                sx: {
                                    color: '#1a285a',
                                    '&.Mui-focused': {
                                        color: '#1a285a',
                                    },
                                },
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#1a285a',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#1a285a',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#1a285a',
                                    },
                                },
                            }}
                        />
                    </div>
                    <Button
                        className="btn btn-product mt-3"
                        onClick={handleSubmitRating}
                        style={{ backgroundColor: '#1a285a', color: '#fff' }}
                    >
                        Gửi đánh giá
                    </Button>
                </div>
                <CommentsSection comments={comments} /> {/* Hiển thị danh sách bình luận */}
            </div>
        </section>
    );
};

export default UserRating;
