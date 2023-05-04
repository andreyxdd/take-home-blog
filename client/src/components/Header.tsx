import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { logout } from '../services/auth';
import useUserContext from '../hooks/useUserContext';

type HeaderProps = {
  title: string;
}

function Header({ title }: HeaderProps) {
  const { setUser } = useUserContext();
  const handleSignOut = async () => {
    await logout();
    setUser(null);
  };
  return (
    <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Typography
        component="h2"
        variant="h5"
        color="inherit"
        align="left"
        noWrap
        sx={{ flex: 1 }}
      >
        {title}
      </Typography>
      <Button variant="outlined" size="small" onClick={handleSignOut}>
        Sign out
      </Button>
    </Toolbar>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
