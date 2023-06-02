import { Avatar, Box, Drawer } from "@material-ui/core";
import { Home, Event, Person } from "@material-ui/icons";
import { MouseEvent, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { COLORS } from "../../../config/theme";
import ProfileMenu from "./ProfileMenu";
import SidebarItem from "./SidebarItem";
import { AuthContext } from "../../../shared/reducers/AuthContext";
import { ADMIN_USER_IDS, ORGANIZER_USER_IDS } from "../../../config/constants";

export function isAdmin(uid: string | undefined) {
  return !!ADMIN_USER_IDS.find((id) => id === uid);
}

export function isOrganizer(uid: string | undefined) {
  return !!ORGANIZER_USER_IDS.find((id) => id === uid);
}

const SideBar = () => {
  const { t } = useTranslation();
  const user = useContext(AuthContext);
  const [anchorElProfile, setAnchorElProfile] = useState<HTMLElement | null>(
    null
  );

  const handleClickProfile = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElProfile(event.currentTarget);
  };

  return (
    <>
      <ProfileMenu
        anchorElProfile={anchorElProfile}
        setAnchorElProfile={setAnchorElProfile}
      />
      <Drawer
        variant="permanent"
        style={{ zIndex: 1 }}
        PaperProps={{
          style: {
            width: 130,
            padding: 8,
            zIndex: 1,
            background: COLORS.blueMinded,
            border: "unset",
            overflow: "hidden",
            justifyContent: "space-between",
          },
        }}
      >
        <Box>
          <SidebarItem to="/" text={t("drawer.home")} icon={<Home />} />
          {(isAdmin(user?.uid) || isOrganizer(user?.uid)) && (
            <SidebarItem
              to="/events"
              text={t("drawer.events")}
              icon={<Event />}
            />
          )}
          {(isAdmin(user?.uid) || isOrganizer(user?.uid)) && (
            <SidebarItem
              to="/users"
              text={t("drawer.users")}
              icon={<Person />}
            />
          )}
        </Box>
        <SidebarItem
          onClick={handleClickProfile}
          text={user?.email ? user.email : ""}
          icon={<Avatar>{user?.email && user.email[0].toUpperCase()}</Avatar>}
        />
      </Drawer>
    </>
  );
};

export default SideBar;
