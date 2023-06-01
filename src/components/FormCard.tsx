import { Card, CardContent, CardHeader, makeStyles } from "@material-ui/core";
import { CSSProperties, ReactNode } from "react";

const useStyles = makeStyles({
  card: {
    width: "100%",
  },

  content: {
    "&.MuiCardContent-root": {
      paddingBottom: 16,
    },
    padding: 16,
  },
});

type Props = {
  title: ReactNode;
  children: ReactNode;
  article?: boolean;
  style?: CSSProperties;
};

const FormCard = ({ title, children, article, style }: Props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} style={style}>
      <CardHeader
        title={title}
        titleTypographyProps={{
          variant: "h2",
        }}
      />
      <CardContent
        className={classes.content}
        style={{ overflow: article ? "auto" : "unset", height: "100%" }}
      >
        {children}
      </CardContent>
    </Card>
  );
};

export default FormCard;
