import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import UserRow from "./components/UserRow";
import { getUserList } from "../../shared/network/users.api";

const useStyles = makeStyles({
  toolListTitle: {
    color: "secondary",
    fontSize: "16px",
    fontWeight: "bold",
  },

  divider: {
    backgroundColor: "#757575",
  },
});

const UserList = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState<any[]>([]);

  const fetchData = async () => {
    setLoading(true);
    const res = await getUserList();
    setUserList([...res]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="flex-end">
        <Box>
          <Button component={Link} to="/user/create">
            <Add
              style={{
                fontSize: "20px",
                marginRight: 8,
              }}
            />
            {t("user.create")}
          </Button>
        </Box>
      </Box>
      {loading ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="300px"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {userList.length === 0 ? (
            <Box style={{ marginBottom: "20px" }}>
              <Typography variant="h5" align="center" color="secondary">
                {t("noItem")}
              </Typography>
            </Box>
          ) : (
            <>
              <Box style={{ marginBottom: "20px" }}>
                <Grid container style={{ height: "40px" }}>
                  <Grid item xs={5}>
                    <Typography className={classes.toolListTitle}>
                      {t("user.formValues.name")}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.toolListTitle}>
                      {t("user.formValues.email")}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}></Grid>
                </Grid>
                <Divider className={classes.divider} />
                {userList.length &&
                  userList.map((user) => (
                    <UserRow user={user} reset={fetchData} />
                  ))}
              </Box>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default UserList;
