import { Box, Typography, makeStyles } from "@material-ui/core";

type Props = {
  date: number;
};

const useStyles = makeStyles({
  calendarTile: {
    width: "8rem",
    height: "8rem",
    background: "white",
    border: "1px solid black",
  },
  dayNumber: {
    width: "1rem",
    height: "1rem",
    margin: 5,
  },
});

const CalendarDay = ({ date }: Props) => {
  const classes = useStyles();

  return (
    <Box
      display={"flex"}
      justifyContent={"flex-end"}
      className={classes.calendarTile}
    >
      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        className={classes.dayNumber}
      >
        <Typography variant="body1">{date}</Typography>
      </Box>
    </Box>
  );
};

export default CalendarDay;
