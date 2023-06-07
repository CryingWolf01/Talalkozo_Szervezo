import { Box, Typography, makeStyles } from "@material-ui/core";
import Calendar from "./Calendar";

const useStyles = makeStyles({
  calendarTile: {
    width: "8rem",
    height: "3rem",
    background: "white",
    border: "1px solid black",
  },
});

const EventCalendar = () => {
  const classes = useStyles();

  return (
    <Box display={"grid"} justifyContent={"center"}>
      <Box display={"flex"} justifyContent={"flex-start"}>
        {["H", "K", "SZE", "CS", "P", "SZO", "V"].map((day) => (
          <Box
            display={"flex"}
            justifyContent={"center"}
            className={classes.calendarTile}
          >
            <Typography
              variant="body1"
              style={{ fontWeight: "bold", marginTop: ".7rem" }}
            >
              {day}
            </Typography>
          </Box>
        ))}
      </Box>
      <Calendar
        month={[
          [1, 2, 3, 4, 5, 6, 7],
          [8, 9, 10, 11, 12, 13, 14],
          [15, 16, 17, 18, 19, 20, 21],
          [22, 23, 24, 25, 26, 27, 28],
          [29, 30, 31],
        ]}
      />
    </Box>
  );
};

export default EventCalendar;
