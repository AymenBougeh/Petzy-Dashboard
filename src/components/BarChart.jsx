import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";

const BarChart = ({ isDashboard = false, purchases}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

//=============================================== Sold items ======================================================
var itemColors= ["hsl(229, 70%, 50%)","hsl(135, 91%, 29%)","hsl(320, 91%, 31%)","hsl(0, 93%, 45%)","hsl(64, 88%, 51%)","hsl(34, 92%, 44%)","hsl(76, 94%, 43%)","hsl(276, 84%, 17%)","hsl(323, 68%, 48%)","hsl(19, 100%, 51%)","hsl(180, 62%, 32%)","hsl(56, 39%, 50%)","hsl(0, 96%, 10%)","hsl(278, 33%, 24%)"]

const temp=purchases.map((e)=> {return {date: e.date, productName: e.product_name, numberOfItemse: e.number_of_items}})

function transformItems(temp, itemColors) {
  const transformedItems = {};

  const productNames = Array.from(new Set(temp.map(item => item.productName)));

  for (const item of temp) {
    const { date, numberOfItemse, productName } = item;
    var transformedProductName = productName.replace(/\s+/g, '_');
    const transformedDate = date.slice(8);
    if (!transformedItems[transformedDate]) {
      transformedItems[transformedDate] = { transformedDate };
    }

    transformedItems[transformedDate][transformedProductName] = (transformedItems[transformedDate][transformedProductName] || 0) + numberOfItemse;
    transformedItems[transformedDate][transformedProductName + 'Color'] = itemColors[productNames.indexOf(productName)];
  }

  const transformedArray = Object.values(transformedItems).map(obj => {
    for (const productName of productNames) {
      var transformedProductName = productName.replace(/\s+/g, '_').slice(0,8);
      if (!obj.hasOwnProperty(transformedProductName)) {
        obj[transformedProductName] = 0;
      }
      if (!obj.hasOwnProperty(transformedProductName + 'Color')) {
        obj[transformedProductName + 'Color'] = itemColors[productNames.indexOf(productName)];
      }
    }
    return obj;
  });

  return transformedArray;
}


var soldItems = transformItems(temp, itemColors)
if(soldItems.length>7){
  soldItems=soldItems.splice(soldItems.length-7, soldItems.length-1)
}

  return (
    <ResponsiveBar
      data={soldItems}
      theme={{
        // added
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      keys={["PLAIN_Dog_Collar", "Felician_DISTRIBUTOR", "Flexi_Cordon", "Pochon", "shampoo_for_cats"]}
      indexBy="transformedDate"
      margin={{ top: 50, right: 150, bottom: 30, left: 40 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "country", // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "food", // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
};

export default BarChart;
