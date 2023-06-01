import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { FinancesData } from "../../shared/types";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import {
  getFinancesData,
  modifyFinances,
} from "../../shared/network/finances.api";
import { Box, CircularProgress, Container } from "@material-ui/core";
import FinancesForm from "./components/FinancesForm";

const FinancesModify = () => {
  const { t } = useTranslation();
  const history = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const form = useForm<FinancesData>();
  const { enqueueSnackbar } = useSnackbar();
  const [finance, setFinance] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await getFinancesData(id ? id : "");
    setFinance({ ...res });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmitModify = async (values: FinancesData) => {
    try {
      await modifyFinances(id ? id : "", { ...values });
      enqueueSnackbar(
        t("common:notification.update.success", {
          subject: t("finance.subject"),
        }),
        {
          variant: "success",
        }
      );
      history(-1);
    } catch {
      enqueueSnackbar(
        t("common:notification.update.failure", {
          subject: t("finance.subject"),
        }),
        {
          variant: "error",
        }
      );
    }
  };

  return (
    <Container maxWidth="md">
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
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmitModify)}>
            <FinancesForm finance={finance} />
          </form>
        </FormProvider>
      )}
    </Container>
  );
};

export default FinancesModify;
