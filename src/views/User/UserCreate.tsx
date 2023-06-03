import { Container } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../shared/network/users.api";
import { User } from "../../shared/types";
import UserForm from "./components/UserForm";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const UserCreate = () => {
  const { t } = useTranslation();
  const history = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const form = useForm<User>();
  const auth = getAuth();

  const onSubmitCreate = async (values: User) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      ).then(async (response) => {
        await createUser({
          name: values.name,
          uid: auth.currentUser?.uid,
          email: values.email,
          password: values.password,
        });
      });

      enqueueSnackbar(
        t("common:notification.create.success", {
          subject: t("user.subject"),
        }),
        {
          variant: "success",
        }
      );
      history(-1);
    } catch (e) {
      enqueueSnackbar(
        t("common:notification.create.failure", {
          subject: t("user.subject"),
        }),
        { variant: "error" }
      );
    }
  };

  return (
    <Container maxWidth="lg">
      <form onSubmit={form.handleSubmit(onSubmitCreate)}>
        <FormProvider {...form}>
          <UserForm />
        </FormProvider>
      </form>
    </Container>
  );
};

export default UserCreate;
