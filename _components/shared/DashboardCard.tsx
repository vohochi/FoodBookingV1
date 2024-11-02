import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  IconButton,
  Tooltip,
  Fade,
  Zoom,
  useTheme,
  alpha,
} from '@mui/material';
import SearchBar from '@/_components/Search';
import {
  MoreVert as MoreVertIcon,
  Refresh as RefreshIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';

type Props = {
  title?: string;
  subtitle?: string;
  action?: JSX.Element;
  footer?: JSX.Element;
  cardheading?: string | JSX.Element;
  headtitle?: string | JSX.Element;
  headsubtitle?: string | JSX.Element;
  children?: JSX.Element;
  middlecontent?: string | JSX.Element;
  menuModal?: JSX.Element;
  showSearch?: boolean;
  onRefresh?: () => void;
  onViewChange?: (view: 'list' | 'grid') => void;
  onFilterClick?: () => void;
  isLoading?: boolean;
};

const DashboardCard = ({
  title,
  subtitle,
  action,
  children,
  footer,
  cardheading,
  headtitle,
  headsubtitle,
  middlecontent,
  menuModal,
  showSearch = false,
  onRefresh,
  onViewChange,
  onFilterClick,
  isLoading = false,
}: Props) => {
  const theme = useTheme();
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [isHovered, setIsHovered] = useState(false);

  const handleViewChange = (newView: 'list' | 'grid') => {
    setView(newView);
    onViewChange?.(newView);
  };

  return (
    <Zoom in={true} style={{ transitionDelay: '100ms' }}>
      <Card
        sx={{
          padding: 0,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[15],
          },
          position: 'relative',
          overflow: 'visible',
        }}
        elevation={isHovered ? 12 : 9}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Floating Action Buttons */}
        <Box
          sx={{
            position: 'absolute',
            top: -20,
            right: 20,
            display: 'flex',
            gap: 1,
            opacity: isHovered ? 1 : 0,
            transition: 'all 0.2s ease-in-out',
            transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
          }}
        >
          {onFilterClick && (
            <Tooltip title="Filter" arrow>
              <IconButton
                size="small"
                sx={{
                  bgcolor: theme.palette.background.paper,
                  boxShadow: theme.shadows[2],
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                  },
                }}
                onClick={onFilterClick}
              >
                <FilterListIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          {onViewChange && (
            <Tooltip
              title={`View as ${view === 'list' ? 'Grid' : 'List'}`}
              arrow
            >
              <IconButton
                size="small"
                sx={{
                  bgcolor: theme.palette.background.paper,
                  boxShadow: theme.shadows[2],
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                  },
                }}
                onClick={() =>
                  handleViewChange(view === 'list' ? 'grid' : 'list')
                }
              >
                {view === 'list' ? (
                  <ViewModuleIcon fontSize="small" />
                ) : (
                  <ViewListIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          )}
          {onRefresh && (
            <Tooltip title="Refresh" arrow>
              <IconButton
                size="small"
                sx={{
                  bgcolor: theme.palette.background.paper,
                  boxShadow: theme.shadows[2],
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                  },
                  animation: isLoading ? 'spin 1s linear infinite' : 'none',
                  '@keyframes spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                  },
                }}
                onClick={onRefresh}
                disabled={isLoading}
              >
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        {/* Card Content */}
        {cardheading ? (
          <Fade in={true}>
            <CardContent>
              <Typography variant="h5">{headtitle}</Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {headsubtitle}
              </Typography>
            </CardContent>
          </Fade>
        ) : (
          <CardContent
            sx={{
              p: '30px',
              '&:last-child': { pb: '30px' },
            }}
          >
            {title ? (
              <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
                mb={3}
              >
                {/* Title and subtitle section */}
                <Fade in={true} style={{ transitionDelay: '200ms' }}>
                  <Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography
                        variant="h5"
                        sx={{
                          position: 'relative',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: -2,
                            left: 0,
                            width: isHovered ? '100%' : '0%',
                            height: 2,
                            bgcolor: theme.palette.primary.main,
                            transition: 'width 0.3s ease-in-out',
                          },
                        }}
                      >
                        {title}
                      </Typography>
                      {menuModal && (
                        <IconButton size="small">
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Stack>
                    {subtitle && (
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        sx={{ mt: 0.5 }}
                      >
                        {subtitle}
                      </Typography>
                    )}
                  </Box>
                </Fade>

                {/* Actions section */}
                <Fade in={true} style={{ transitionDelay: '300ms' }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    {showSearch && (
                      <Box
                        sx={{
                          minWidth: 200,
                          transition: 'all 0.3s ease-in-out',
                          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                        }}
                      >
                        <SearchBar />
                      </Box>
                    )}
                    {action && (
                      <Box
                        sx={{
                          transition: 'all 0.3s ease-in-out',
                          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                          display: 'flex',
                        }}
                      >
                        <SearchBar />
                        {action}
                      </Box>
                    )}
                  </Stack>
                </Fade>
              </Stack>
            ) : null}

            <Fade in={true} style={{ transitionDelay: '400ms' }}>
              <Box>{children}</Box>
            </Fade>
          </CardContent>
        )}
        {middlecontent}
        {footer && (
          <Fade in={true} style={{ transitionDelay: '500ms' }}>
            <Box>{footer}</Box>
          </Fade>
        )}
        {menuModal}
      </Card>
    </Zoom>
  );
};

export default DashboardCard;
