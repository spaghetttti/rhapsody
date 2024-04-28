import ResizableBox from "./ResizableBox";
// import useDemoConfig from "./useDemoConfig";
import React, { useEffect, useState } from "react";
import { Chart } from "react-charts";

export default function Bar(props) {
  const [score, setScore] = useState([
    {
      label: "Score",
      data: [{ primary: new Date(), secondary: 0 }],
    },
  ]);
  console.log(score);
  useEffect(() => {
    setScore([
      {
        label: "Score",
        data: props.totalResult,
      },
    ]);
  }, [props]);

  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum) => datum.primary,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: (datum) => datum.secondary,
        // stacked: true,
        // OR
        // elementType: "area",
      },
    ],
    []
  );

  return (
    <>
      <br />
      <br />
      <ResizableBox>
        {!props.loading ? (
          <Chart
            options={{
              data: score ?? [],
              primaryAxis,
              secondaryAxes,
            }}
          />
        ) : (
          ""
        )}
      </ResizableBox>
    </>
  );
}
