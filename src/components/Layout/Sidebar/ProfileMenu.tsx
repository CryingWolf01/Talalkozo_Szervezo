import { ListItemIcon, MenuItem, MenuList, Popover, Typography } from "@material-ui/core";
import { ExitToAppRounded } from "@material-ui/icons";
import { getAuth } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";

type Props = {
  anchorElProfile: HTMLElement | null;
  setAnchorElProfile: Dispatch<SetStateAction<HTMLElement | null>>;
};

const ProfileMenu = ({
  anchorElProfile,
  setAnchorElProfile,
}: Props) => {
  const handleCloseProfileMenu = () => {
    setAnchorElProfile(null);
  };
  const auth = getAuth();

  const signOut = async () => {
    await auth.signOut();
  };

  return (
    <Popover
      anchorEl={anchorElProfile}
      keepMounted
      open={!!anchorElProfile}
      onClose={handleCloseProfileMenu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <MenuList>
        <MenuItem button onClick={() => signOut()}>
          <ListItemIcon>
            <ExitToAppRounded />
          </ListItemIcon>
          <Typography variant="inherit">Kijelentkezés</Typography>
        </MenuItem>
      </MenuList>
    </Popover>
  );
}

export default ProfileMenu;