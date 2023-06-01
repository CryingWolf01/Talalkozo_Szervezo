import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getAllFinances } from "../../shared/network/finances.api";
import FinancesRow from "./components/FinancesRow";

const useStyles = makeStyles({
  toolListTitle: {
    color: "secondary",
    fontSize: "16px",
    fontWeight: "bold",
  },

  divider: {
    backgroundColor: "#757575",
  },
});

const FinancesList = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [finances, setFinances] = useState<any[]>([]);

  const fetchData = async () => {
    setLoading(true);
    const res = await getAllFinances();
    setFinances([...res]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="flex-end">
        <Box>
          <Button component={Link} to="/finances/create">
            <Add
              style={{
                fontSize: "20px",
                marginRight: 8,
              }}
            />
            {t("shoppingLists.create")}
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
          {finances.length === 0 ? (
            <Box style={{ marginBottom: "20px" }}>
              <Typography variant="h5" align="center" color="secondary">
                {t("noItem")}
              </Typography>
            </Box>
          ) : (
            <>
              <Box style={{ marginBottom: "20px" }}>
                <Grid container style={{ height: "40px" }}>
                  <Grid item xs={5}>
                    <Typography className={classes.toolListTitle}>
                      {t("finance.formValues.date")}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography className={classes.toolListTitle}>
                      {t("finance.formValues.finance")}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}></Grid>
                </Grid>
                <Divider className={classes.divider} />
                {finances.length &&
                  finances.map((finance) => (
                    <FinancesRow item={finance} reset={fetchData} />
                  ))}
              </Box>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default FinancesList;
