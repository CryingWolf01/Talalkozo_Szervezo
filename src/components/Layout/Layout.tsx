import { IconButton, Tooltip, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { ArrowBack } from "@material-ui/icons";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../shared/reducers/AuthContext";
import Login from "../../views/Login/Login";
import SideBar from "./Sidebar/Sidebar";
import Registration from "../../views/Login/Registration";

type Props = {
  children: React.ReactNode;
};

const useStyles = makeStyles(
  {
    root: {
      display: "flex",
      position: "relative",
    },
    pageWrapper: {
      flex: 1,
      display: "flex",
      backgroundColor: "#fff",
      height: "100vh",
    },
    content: {
      flexGrow: 1,
      overflow: "auto",
      marginLeft: 125,
      width: "calc(100% - 125px)",
    },
  },
  {
    name: "Layout",
  }
);

export default function Layout({ children }: Props): JSX.Element {
  const classes = useStyles();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const user = useContext(AuthContext);
  const page = pathname.match(/^\/([^/]*)[^/]?/)?.[1] || "home";
  const title = t([`drawer.${page}` || "drawer.notFound"]);

  return (
    <>
      {user ? (
        <Box className={classes.pageWrapper}>
          <SideBar />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            width="100%"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              padding="24px 24px 24px calc(125px + 24px)"
            >
              <Box display="flex">
                {pathname !== "/" && (
                  <Tooltip title={t("common:button.back").toString()}>
                    <IconButton
                      style={{ marginRight: 20 }}
                      onClick={() => navigate(-1)}
                    >
                      <ArrowBack />
                    </IconButton>
                  </Tooltip>
                )}
                <Typography
                  style={{
                    fontSize: "32px",
                    fontWeight: "bold",
                  }}
                >
                  {title}
                </Typography>
              </Box>
            </Box>
            <Box className={classes.content}>{children}</Box>
          </Box>
        </Box>
      ) : pathname === "/registration" ? (
        <Registration />
      ) : (
        <Login />
      )}
    </>
  );
}
