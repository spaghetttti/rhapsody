import ResizableBox from "./ResizableBox";
import useDemoConfig from "./useDemoConfig";
import React, { useEffect, useState } from "react";
import { AxisOptions, Chart } from "react-charts";

export default function Bar(props) {
  const [score, setScore] = useState([
    {
      label: "Score",
      data: [{ primary: new Date(), secondary: 0 }],
    },
  ]);

  useEffect(() => {
    setScore(prevScore => {
      const newData = [...prevScore[0].data, { primary: new Date(), secondary: props.score }];
      return [{ label: "Score", data: newData }];
    });
  }, [props.score]);

  const { data, randomizeData } = useDemoConfig({
    series: 10,
    dataType: "time",
  });

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
        stacked: true,
        // OR
        // elementType: "area",
      },
    ],
    []
  );
  console.log(data, score);
  return (
    <>
      <br />
      <br />
      <ResizableBox>
        {score ? (
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
