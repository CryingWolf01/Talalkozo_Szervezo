import { Box, Grid, IconButton, Tooltip, Typography } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { deleteUser } from "../../../shared/network/users.api";

type Props = {
  user: any;
  reset: any;
};

const UserRow = ({ user, reset }: Props) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const deleteSelectedUser = async () => {
    try {
      await deleteUser(user.id);
      enqueueSnackbar(
        t("common:notification.delete.success", {
          subject: t("user.subject"),
        }),
        {
          variant: "success",
        }
      );
      reset();
    } catch (e) {
      enqueueSnackbar(
        t("common:notification.delete.failure", {
          subject: t("user.subject"),
        }),
        {
          variant: "error",
        }
      );
    }
  };

  return (
    <Box style={{ marginBottom: "5px" }}>
      <Grid container style={{ height: "40px" }}>
        <Grid item xs={5} style={{ marginTop: "10px" }}>
          <Typography color="secondary">{user.name}</Typography>
        </Grid>
        <Grid item xs={5} style={{ marginTop: "10px" }}>
          <Typography color="secondary">{user.email}</Typography>
        </Grid>
        <Grid
          item
          container
          xs={2}
          style={{ marginTop: "10px" }}
          justifyContent="flex-end"
        >
          <Tooltip title={t("user.modify").toString()}>
            <IconButton
              size="small"
              color="primary"
              style={{ margin: "0 8px" }}
              component={Link}
              to={`/user/modify?id=${user.id}`}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("user.delete").toString()}>
            <IconButton
              size="small"
              color="primary"
              style={{ margin: "0 8px" }}
              onClick={() => deleteSelectedUser()}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserRow;
