import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";

type Props = { event: any };

const EventRow = ({ event }: Props) => {
  return (
    <Card style={{ marginTop: "10px", border: "1px solid black" }}>
      <CardHeader
        title={
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography>{event.title}</Typography>
          </Box>
        }
      />
      <CardContent>
        <Typography>{event.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default EventRow;
