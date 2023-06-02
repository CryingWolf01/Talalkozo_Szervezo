import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import {
  createApplication,
  deleteApplication,
  getAppliedUsersList,
} from "../../shared/network/application.api";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../shared/reducers/AuthContext";
import { getUserList } from "../../shared/network/users.api";
import { Check, Clear } from "@material-ui/icons";
import { format } from "date-fns";
import { useSnackbar } from "notistack";

type Props = { event: any; reset: any };

const EventRow = ({ event, reset }: Props) => {
  const { t } = useTranslation();
  const authUser = useContext(AuthContext);
  const [users, setUsers] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const fetchData = async () => {
    const res = await getUserList();
    setUsers([...res]);
  };

  const fetchAppliData = async () => {
    const res = await getAppliedUsersList();
    setApplications([...res]);
  };

  useEffect(() => {
    fetchData();
    fetchAppliData();
  }, []);

  const user = users.find((u) => u.uid === authUser?.uid);
  const application = applications.find(
    (a) => a.uid === authUser?.uid && a.eventId === event.id
  );

  console.log(applications);

  const applyEvent = async () => {
    try {
      await createApplication({
        eventId: event.id,
        name: user.name,
        email: user.email,
        uid: user.uid,
      });
      enqueueSnackbar(t("common:notification.apply.success"), {
        variant: "success",
      });
      reset();
    } catch {
      enqueueSnackbar(t("common:notification.apply.failure"), {
        variant: "error",
      });
    }
  };

  const discardApplication = async () => {
    try {
      await deleteApplication(application.id);
      enqueueSnackbar(t("common:notification.decline.success"), {
        variant: "success",
      });
      reset();
    } catch {
      enqueueSnackbar(t("common:notification.decline.failure"), {
        variant: "error",
      });
    }
  };

  return (
    <Card style={{ marginTop: "10px", border: "1px solid black" }}>
      <CardHeader
        title={
          <>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography variant="h4">{event.title}</Typography>

              <Box>
                {!!!application && (
                  <Tooltip title={t("event.apply").toString()}>
                    <IconButton
                      size="small"
                      color="primary"
                      style={{ margin: "0 8px" }}
                      onClick={() => applyEvent()}
                    >
                      <Check style={{ color: "green" }} />
                    </IconButton>
                  </Tooltip>
                )}
                {!!application && (
                  <Tooltip title={t("event.decline").toString()}>
                    <IconButton
                      size="small"
                      color="primary"
                      style={{ margin: "0 8px" }}
                      onClick={() => discardApplication()}
                    >
                      <Clear style={{ color: "red" }} />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </Box>
            <Box>
              <Typography variant="body2">
                {format(new Date(event.date), "yyyy. MM. dd")}
              </Typography>
            </Box>
          </>
        }
      />
      <CardContent>
        <Typography>{event.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default EventRow;
