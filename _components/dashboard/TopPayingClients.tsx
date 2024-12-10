import React from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Avatar,
} from '@mui/material';
import DashboardCard from '@/_components/shared/DashboardCard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchUsers } from '@/store/slice/userSlice';

// Helpers
const getAccountStatus = (isActive: boolean) => {
  return {
    label: !isActive ? 'Hoạt động' : 'Đã khóa',
    color: isActive ? 'success.main' : 'error.main',
  };
};

const getRoleLabel = (role: string) => {
  switch (role?.toLowerCase()) {
    case 'admin':
      return { label: 'Quản trị viên', color: 'primary.main' };
    case 'moderator':
      return { label: 'Điều hành viên', color: 'secondary.main' };
    default:
      return { label: 'Người dùng', color: 'info.main' };
  }
};

const formatDate = (date: string | undefined) => {
  if (!date) return 'Chưa cập nhật';
  return new Date(date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
const UserManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    dispatch(fetchUsers({ page: 1, limit: 5 }));
  }, [dispatch]);

  return (
    <DashboardCard title="Quản lý Người dùng">
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
                    Người dùng
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Email
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Ngày tham gia
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Vai trò
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Trạng thái
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user) => (
                <TableRow key={user._id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        src={
                          typeof user.avatar === 'string'
                            ? user.avatar
                            : '/path/to/default-avatar.png'
                        }
                        alt={user.fullname}
                        sx={{ width: 35, height: 35, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {user?.fullname}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="body2">
                      {user.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="body2">
                        {user.updatedAt
                          ? formatDate(
                              typeof user.updatedAt === 'string'
                                ? user.updatedAt
                                : user.updatedAt.toISOString()
                            )
                          : 'Chưa cập nhật'}
                      </Typography>
                    </TableCell>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getRoleLabel(user.role!).label}
                      size="small"
                      sx={{
                        backgroundColor: getRoleLabel(user.role!).color,
                        color: '#fff',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getAccountStatus(user.is_locked!).label}
                      size="small"
                      sx={{
                        backgroundColor: getAccountStatus(user.is_locked!)
                          .color,
                        color: '#fff',
                      }}
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

export default UserManagement;
