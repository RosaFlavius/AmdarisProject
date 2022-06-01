import React from 'react'
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import Topbar from '../../../components/Admin/Topbar/Topbar';
import FeaturedInfo from "../../../components/Admin/FeaturedInfo/FeaturedInfo";
import WidgetSm from "../../../components/Admin/WidgetLg/WidgetLg";
import WidgetLg from "../../../components/Admin/WidgetSm/WidgetSm";
import {userData} from "../../../dummyData"
import Chart from "../../../components/Admin/Chart/Chart"
import "./styles.css"


function AdminPage() {
  return (
    <div>
      <Topbar/>
      <div className="container">
        <Sidebar/>
        <div className="home">
          <FeaturedInfo />
          <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
          <div className="homeWidgets">
            <WidgetSm/>
            <WidgetLg/>
          </div>
    </div>
      </div>
    </div>
  )
}

export default AdminPage