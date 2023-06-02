import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Add } from "@material-ui/icons";
import { getEventList } from "../../shared/network/events.api";
import EventRow from "./components/EventRow";

const EventList = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [eventList, setEventList] = useState<any[]>([]);

  const fetchData = async () => {
    setLoading(true);
    const res = await getEventList();
    setEventList([...res]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="flex-end">
        <Box>
          <Button component={Link} to="/event/create">
            <Add
              style={{
                fontSize: "20px",
                marginRight: 8,
              }}
            />
            {t("event.create")}
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
          {eventList.length === 0 ? (
            <Box style={{ marginBottom: "20px" }}>
              <Typography variant="h5" align="center" color="secondary">
                {t("noItem")}
              </Typography>
            </Box>
          ) : (
            <>
              {eventList.length &&
                eventList.map((event) => (
                  <EventRow event={event} reset={fetchData} />
                ))}
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default EventList;
