import { Box } from "@material-ui/core";
import CalendarDay from "./CalendarDay";

type Props = {
  week: number[];
};

const CalendarRow = ({ week }: Props) => {
  return (
    <Box display={"flex"} justifyContent={"flex-start"}>
      {week.map((day, index) => (
        <CalendarDay key={index} date={day} />
      ))}
    </Box>
  );
};

export default CalendarRow;
