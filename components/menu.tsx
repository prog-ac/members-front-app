import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Link from 'next/link'
import firebase from '../lib/firebase';

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const movePage = () => {
    <Link value = {123}
    // ブラウザのURLに表示されるURL
    as={`/profile/1`}
    // ディレクトリのパス
    href = {`/profile/`}>

    <a style={{color:"black"}}></a></Link>
  }

  const logout = () => {
    firebase.auth().signOut();

    alert("ログアウトしました");
  }

  return (
    <div className="col-md-2">
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={movePage}>Profile</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}