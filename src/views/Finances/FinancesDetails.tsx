import { useEffect, useState } from "react";
import { getFinancesData } from "../../shared/network/finances.api";
import { useTranslation } from "react-i18next";
import { Container, Grid, Typography, makeStyles } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import Loading from "../../components/Loading";

const useStyles = makeStyles({
  title: {
    fontWeight: "bold",
  },
  data: {
    marginBottom: 24,
  },
  header: {
    fontWeight: "bold",
    fontsize: 28,
    marginBottom: 24,
    borderBottom: "1px solid #c7c7c7",
  },
  listTitle: {
    color: "secondary",
    fontSize: "16px",
    fontWeight: "bold",
  },

  divider: {
    backgroundColor: "#757575",
  },
});

const FinancesDetails = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const [financesList, setFinancesList] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await getFinancesData(id ? id : "");
    setFinancesList({ ...res });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container
      maxWidth="md"
      style={{
        alignSelf: "center",
        alignItems: "center",
      }}
    >
      <Loading open={loading} />
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Typography className={classes.header}>
            {t("finance.yourList")}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classes.title}>
            {t("finance.formValues.date")}
          </Typography>
          <Typography className={classes.data}>
            {financesList?.date || ""}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classes.title}>
            {t("finance.formValues.finance")}
          </Typography>
          <Typography className={classes.data}>
            {financesList?.finance || ""}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Typography className={classes.header}>
            {t("finance.listPieces")}
          </Typography>
        </Grid>
        {financesList?.financeItems?.map((item: any) => (
          <>
            <Grid item xs={6}>
              <Typography className={classes.data}>{item.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.data}>
                {item.price} {"Ft"}
              </Typography>
            </Grid>
          </>
        ))}
      </Grid>
    </Container>
  );
};

export default FinancesDetails;
