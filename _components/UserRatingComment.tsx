import React from 'react';
import { Card, CardContent, Typography, Divider, IconButton } from '@mui/material';
import { ThumbUp, Reply } from '@mui/icons-material';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa6';

interface Comment {
    userImage?: string;
    userName?: string;
    rating: number;
    comment: string;
}

interface CommentsSectionProps {
    comments: Comment[];
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ comments }) => {
    return (
        <section className="comments-section mt-5">
            <div className="container">
                <div className="section-title">
                    <h2 style={{ color: '#1a285a' }}>Bình luận của người dùng</h2>
                </div>
                {comments.length === 0 ? (
                    <Typography variant="body1" style={{ color: '#555' }}>
                        Chưa có bình luận nào. Hãy là người đầu tiên để lại bình luận!
                    </Typography>
                ) : (
                    comments.map((comment, index) => (
                        <Card key={index} variant="outlined" style={{ marginBottom: '1rem', display: 'flex' }}>

                            <div style={{ padding: '1rem' }}>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}/default.jpg`} // comment.userImage
                                    alt={'avt'}
                                    width={50}
                                    height={50}
                                    style={{ borderRadius: '50%', width: '50px', height: '50px' }}
                                />

                            </div>
                            <CardContent style={{ flexGrow: 1 }}>
                                <Typography
                                    variant="h6"
                                    style={{
                                        color: '#1a285a',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        fontSize: '18px'
                                    }}
                                    title={comment.userName}
                                >
                                    {comment.userName ? comment.userName : 'User123456'}
                                </Typography>
                                <Typography variant="h6" style={{ color: '#1a285a' }}>
                                    {Array.from({ length: comment.rating }, (_, index) => (
                                        <FaStar
                                            key={index}
                                            style={{ color: '#f0e68c', fontSize: '20px', marginBottom: '10px' }}
                                        />
                                    ))}
                                </Typography>
                                <Typography variant="body2" style={{ color: '#555', fontSize: '14px' }}>
                                    {comment.comment}
                                </Typography>
                                <div >
                                    <IconButton size="small" style={{ color: '#1a285a' }}>
                                        <ThumbUp />
                                    </IconButton>
                                    <IconButton size="small" style={{ color: '#1a285a' }}>
                                        <Reply />
                                    </IconButton>
                                </div>

                            </CardContent>
                            <Divider />
                        </Card>
                    ))
                )}
            </div>
        </section>
    );
};

export default CommentsSection;
