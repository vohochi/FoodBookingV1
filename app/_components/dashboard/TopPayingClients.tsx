import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import DashboardCard from '@/app/_components/shared/DashboardCard';

const comments = [
  {
    id: '1',
    author: 'Sunil Joshi',
    postDate: '2024-01-01',
    content: 'Great service and support!',
    status: 'Published',
    statusColor: 'success.main',
  },
  {
    id: '2',
    author: 'Andrew McDownland',
    postDate: '2024-01-02',
    content: 'Very informative article. Thanks!',
    status: 'Pending',
    statusColor: 'warning.main',
  },
  {
    id: '3',
    author: 'Christopher Jamil',
    postDate: '2024-01-03',
    content: 'I have some concerns about the service.',
    status: 'Rejected',
    statusColor: 'error.main',
  },
  {
    id: '4',
    author: 'Nirav Joshi',
    postDate: '2024-01-04',
    content: 'I would like to know more about your services.',
    status: 'Published',
    statusColor: 'success.main',
  },
];

const CommentManagement = () => {
  return (
    <DashboardCard title="Comment Management">
      <Box sx={{ overflow: 'auto' }}>
        <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
          <Table
            sx={{
              whiteSpace: 'nowrap',
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    ID
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Author
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Post Date
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Content
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Status
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comments.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: '15px',
                        fontWeight: '500',
                      }}
                    >
                      {comment.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {comment.author}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {comment.postDate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {comment.content}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      sx={{
                        px: '4px',
                        backgroundColor: comment.statusColor,
                        color: '#fff',
                      }}
                      size="small"
                      label={comment.status}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default CommentManagement;
