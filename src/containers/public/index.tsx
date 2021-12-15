import * as React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PublicLayout from "components/layout/public";
import LoginRoute from "routes/login";
import RegisterRoute from "routes/register";

interface IPublicProps {}

const Public: React.FunctionComponent<IPublicProps> = (props) => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path='/login' element={<LoginRoute />} />
        <Route path='/register' element={<RegisterRoute />} />
        <Route path='*' element={<Navigate to={"/login"} />} />
      </Route>
    </Routes>
  );
};

export default Public;
