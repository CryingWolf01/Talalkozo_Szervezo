import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getAppliedUsersList } from "../../../shared/network/application.api";
import { useTranslation } from "react-i18next";
import { Close } from "@material-ui/icons";
import { format } from "date-fns";

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

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  eventId: string;
  eventDate: string;
};

const AssignedUsersDialog = ({ open, setOpen, eventId, eventDate }: Props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [applications, setApplications] = useState<any[]>([]);

  const fetchData = async () => {
    const res = await getAppliedUsersList();
    setApplications([...res]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [selectedApplications, setSelectedApplications] = useState<any[]>([]);

  useEffect(() => {
    let temp: any[] = [];
    applications.forEach((a) => {
      if (a.eventId === eventId) {
        temp.push(a);
      }
    });
    setSelectedApplications(temp);
  }, [applications, setSelectedApplications]);

  return (
    <Dialog open={open}>
      <DialogTitle>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography variant="h4">
            {"Jelentkezések - " + format(new Date(eventDate), "yyyy.MM.dd")}
          </Typography>
          <Tooltip title={t("common:button.close").toString()}>
            <IconButton
              onClick={() => setOpen(false)}
              style={{ width: 20, height: 20 }}
            >
              <Close style={{ width: 20, height: 20 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </DialogTitle>
      <DialogContent style={{ width: 600 }}>
        {selectedApplications.length === 0 ? (
          <Box style={{ marginBottom: "20px" }}>
            <Typography variant="h5" align="center" color="secondary">
              {t("noItem")}
            </Typography>
          </Box>
        ) : (
          <>
            <Box style={{ marginBottom: "20px" }}>
              <Grid container style={{ height: "40px" }}>
                <Grid item xs={6}>
                  <Typography className={classes.toolListTitle}>
                    {t("user.formValues.name")}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.toolListTitle}>
                    {t("user.formValues.email")}
                  </Typography>
                </Grid>
                <Grid item xs={2}></Grid>
              </Grid>
              <Divider className={classes.divider} />
              {selectedApplications.length &&
                selectedApplications.map((user, index) => (
                  <Box style={{ marginBottom: "5px" }}>
                    <Grid container style={{ height: "40px" }}>
                      <Grid item xs={6} style={{ marginTop: "10px" }}>
                        <Typography color="secondary">{user.name}</Typography>
                      </Grid>
                      <Grid item xs={6} style={{ marginTop: "10px" }}>
                        <Typography color="secondary">{user.email}</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Mégse</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignedUsersDialog;
