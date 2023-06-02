import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { initializeApp } from "firebase/app";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LayoutLoading from "./components/LayoutLoading";
import { firebaseConfig } from "./config/config";
import supportedLocales from "./config/supportedLocales";
import EventCreate from "./views/Event/EventCreate";
import EventList from "./views/Event/EventList";
import EventModify from "./views/Event/EventModify";
import FinancesCreate from "./views/Finances/FinancesCreate";
import FinancesList from "./views/Finances/FinancesList";
import FinancesModify from "./views/Finances/FinancesModify";
import Home from "./views/Homepage/Home";
import Login from "./views/Login/Login";
import PageNotFound from "./views/PageNotFound";

initializeApp(firebaseConfig);

function App() {
  const { i18n } = useTranslation();
  return (
    <MuiPickersUtilsProvider
      utils={DateFnsUtils}
      locale={supportedLocales[i18n.language]}
    >
      <Suspense fallback={<LayoutLoading />}>
        <Layout>
          <Routes>
            {/*Default Routes*/}
            <Route element={<PageNotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {/*Event Routes*/}
            <Route path="/event" element={<EventList />} />
            <Route path="/event/create" element={<EventCreate />} />
            <Route path="/event/modify" element={<EventModify />} />
            {/*User Routes*/}
            <Route path="/user" element={<FinancesList />} />
            <Route path="/user/create" element={<FinancesCreate />} />
            <Route path="/user/modify" element={<FinancesModify />} />
          </Routes>
        </Layout>
      </Suspense>
    </MuiPickersUtilsProvider>
  );
}

export default App;
