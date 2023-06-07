import CalendarRow from "./CalendarRow";

type Props = {
  month: number[][];
};

const Calendar = ({ month }: Props) => {
  return (
    <>
      {month.map((week) => (
        <CalendarRow week={week} />
      ))}
    </>
  );
};

export default Calendar;
