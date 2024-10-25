import React from 'react';
import { Card, CardContent, Typography, Stack, Box } from '@mui/material';
import SearchBar from '@/_components/Search';

type Props = {
  title?: string;
  subtitle?: string;
  action?: JSX.Element; // Define the action prop
  footer?: JSX.Element;
  cardheading?: string | JSX.Element;
  headtitle?: string | JSX.Element;
  headsubtitle?: string | JSX.Element;
  children?: JSX.Element;
  middlecontent?: string | JSX.Element;
  menuModal?: JSX.Element; // Add menuModal prop
};

const DashboardCard = ({
  title,
  subtitle,
  action, // Use the action prop
  children,
  footer,
  cardheading,
  headtitle,
  headsubtitle,
  middlecontent,
  menuModal, // Add menuModal prop
}: Props) => {
  // ... (rest of your DashboardCard code)

  return (
    <Card sx={{ padding: 0 }} elevation={9} variant={undefined}>
      {cardheading ? (
        <CardContent>
          <Typography variant="h5">{headtitle}</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {headsubtitle}
          </Typography>
        </CardContent>
      ) : (
        <CardContent sx={{ p: '30px' }}>
          {title ? (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems={'center'}
              mb={3}
            >
              {/* Box for title and subtitle on the left */}
              <Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h5">{title}</Typography>
                  <Box display="flex" alignItems="center" ml="auto">
                    {' '}
                    {/* Add ml="auto" */}
                    <SearchBar />
                    {action} {/* Render the action prop */}
                  </Box>
                </Box>
                {subtitle && (
                  <Typography variant="subtitle2" color="textSecondary">
                    {subtitle}
                  </Typography>
                )}
              </Box>

              <Box display="flex" alignItems="center">
                {/* <SearchBar /> */}
                {/* <ActionButtons add /> */}
              </Box>
            </Stack>
          ) : null}

          {children}
        </CardContent>
      )}
      {middlecontent}
      {footer}
      {menuModal && menuModal} {/* Render menuModal only if it's provided */}
    </Card>
  );
};

export default DashboardCard;
