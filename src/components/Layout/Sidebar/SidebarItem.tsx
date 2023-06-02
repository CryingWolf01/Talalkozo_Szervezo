import {
  Box,
  Tooltip,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { NavLink } from "../../Router";

export type SidebarItemProps = {
  to?: string;
  text: string;
  icon?: React.ReactNode;
  className?: string;
  exact?: boolean;
  activeMenuItem?: string[];
  onClick?: (event: any) => void;
};

const SideBarItem = ({
  to,
  icon,
  text,
  exact,
  activeMenuItem,
  onClick,
}: SidebarItemProps) => {
  const location = useLocation();
  const temp = location.pathname === "/" ? "/home" : location.pathname;
  if (to) {
    return (
      <Tooltip title={text}>
        <ListItem
          to={to}
          component={NavLink}
          button
          exact={exact}
          onClick={onClick}
          selected={location.pathname === to}
          style={
            temp === to
              ? {
                  backgroundColor: "white",
                  color: "blue",
                  borderRadius: "20px 0 0 20px",
                  marginLeft: "8px",
                }
              : {
                  color: "white",
                }
          }
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <ListItemIcon
              style={{
                color: temp === to ? "blue" : "white",
                minWidth: "unset",
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText
              primary={text}
              style={{ marginBottom: 0 }}
              primaryTypographyProps={{
                style: { fontSize: 12, textAlign: "center" },
              }}
            />
          </Box>
        </ListItem>
      </Tooltip>
    );
  } else {
    return (
      <ListItem
        button
        onClick={onClick}
        selected={location.pathname === to}
        style={
          activeMenuItem?.some((item) =>
            location.pathname === "/"
              ? item === "/"
              : item !== "/" && location.pathname.startsWith(item)
          )
            ? {
                backgroundColor: "white",
                color: "blue",
                borderRadius: 100,
              }
            : { color: "white" }
        }
      >
        <Box display="flex" alignItems="center" gridGap={16}>
          <ListItemIcon
            style={{
              color: activeMenuItem?.some((item) =>
                location.pathname === "/"
                  ? item === "/"
                  : item !== "/" && location.pathname.startsWith(item)
              )
                ? "blue"
                : "white",
              minWidth: "unset",
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText
            primary={text}
            primaryTypographyProps={{
              style: {
                fontSize: 14,
                fontWeight: 300,
                transition: "opacity 0.2s ease-in-out",
              },
            }}
          />
        </Box>
      </ListItem>
    );
  }
};

export default SideBarItem;
