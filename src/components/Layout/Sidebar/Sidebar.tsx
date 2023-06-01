import { Avatar, Box, Drawer } from "@material-ui/core";
import {
  Home,
  Money,
  ShoppingBasket,
  SupervisorAccount,
} from "@material-ui/icons";
import { MouseEvent, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { COLORS } from "../../../config/theme";
import ProfileMenu from "./ProfileMenu";
import SidebarItem from "./SidebarItem";
import { AuthContext } from "../../../shared/reducers/AuthContext";
import { ADMIN_USER_IDS } from "../../../config/constants";

const SideBar = () => {
  const { t } = useTranslation();
  const user = useContext(AuthContext);
  const [anchorElProfile, setAnchorElProfile] = useState<HTMLElement | null>(
    null
  );

  const handleClickProfile = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElProfile(event.currentTarget);
  };

  function isAdmin(uid: string | undefined) {
    return !!ADMIN_USER_IDS.find((id) => id === uid);
  }

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
          <SidebarItem
            to="/finances"
            text={t("drawer.finances")}
            icon={<Money />}
          />
          <SidebarItem
            to="/shopping-lists"
            text={t("drawer.shopping-lists")}
            icon={<ShoppingBasket />}
          />
          {isAdmin(user?.uid) && (
            <SidebarItem
              to="/admin"
              activeMenuItem={[
                "/admin/product/create",
                "/admin/product/modify",
              ]}
              text={t("drawer.admin")}
              icon={<SupervisorAccount />}
            />
          )}
        </Box>
        <SidebarItem
          onClick={handleClickProfile}
          text={user?.displayName ? user.displayName : ""}
          icon={
            <Avatar>
              {user?.displayName && user.displayName[0].toUpperCase()}
            </Avatar>
          }
        />
      </Drawer>
    </>
  );
};

export default SideBar;
