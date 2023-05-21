import React from "react";
import FeaturedInfo from "../../../components/Admin/FeaturedInfo/FeaturedInfo";
import WidgetSm from "../../../components/Admin/WidgetLg/WidgetLg";
import WidgetLg from "../../../components/Admin/WidgetSm/WidgetSm";
import { userData } from "../../../dummyData";
import Chart from "../../../components/Admin/Chart/Chart";
import "./styles.css";

function HomeAdminPage() {
  return (
    <div className="home">
      <FeaturedInfo />
      {/* <Chart
        data={userData}
        title="User Analytics"
        grid
        dataKey="Active User"
      /> */}
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}

export default HomeAdminPage;
