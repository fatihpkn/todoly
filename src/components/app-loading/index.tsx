import { LinearProgress } from "@mui/material";
import * as React from "react";

interface IAppLoadingProps {}

const AppLoading: React.FunctionComponent<IAppLoadingProps> = (props) => {
  const progressStepCount = 5;
  const fakeLoadingTime = import.meta.env.TODOLY_APP_FAKE_LOADING_TIME;
  const progressStepTimer = fakeLoadingTime / progressStepCount;

  const [progress, setProgress] = React.useState(25);
  const [buffer, setBuffer] = React.useState(30);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 80 : prevProgress + 100 / progressStepCount));
      setBuffer((p) => (p >= 100 ? 80 : (p ? p : 100 / progressStepCount) + 100 / progressStepCount) + 20);
    }, progressStepTimer);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <LinearProgress variant='buffer' valueBuffer={buffer} value={progress} />
    </div>
  );
};

export default AppLoading;
