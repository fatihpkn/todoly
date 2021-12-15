import PrivateLayout from "components/layout/private";
import * as React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import BoardRoute from "routes/board";
import ProfileRoute from "routes/profile";

interface IPrivateProps {}

const Private: React.FunctionComponent<IPrivateProps> = (props) => {
  return (
    <Routes>
      <Route element={<PrivateLayout />}>
        <Route path='/' element={<BoardRoute />} />
        <Route path='/profile' element={<ProfileRoute />} />
        <Route path='*' element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
};

export default Private;
