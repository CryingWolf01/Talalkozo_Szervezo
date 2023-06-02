import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { Delete, Edit } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { deleteEvent } from "../../../shared/network/events.api";

type Props = { event: any; reset: any };

const EventRow = ({ event, reset }: Props) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const deleteItem = async () => {
    try {
      await deleteEvent(event.id);
      enqueueSnackbar(
        t("common:notification.delete.success", {
          subject: t("event.subject"),
        }),
        {
          variant: "success",
        }
      );
      reset();
    } catch (e) {
      enqueueSnackbar(
        t("common:notification.delete.failure", {
          subject: t("event.subject"),
        }),
        {
          variant: "error",
        }
      );
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
                <Tooltip title={t("event.delete").toString()}>
                  <IconButton
                    size="small"
                    color="primary"
                    style={{ margin: "0 8px" }}
                    onClick={() => deleteItem()}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t("event.modify").toString()}>
                  <IconButton
                    size="small"
                    color="primary"
                    style={{ margin: "0 8px" }}
                    component={Link}
                    to={`/event/modify?id=${event.id}`}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
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
        <Typography variant="body1">{event.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default EventRow;
