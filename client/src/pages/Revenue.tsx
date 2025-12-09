import RevenueAreaChart from "@/components/AreaChart";
import { Chart } from "@/components/Chart";
import Container from "@/components/Container";
import RevenueDoughnutChart from "@/components/RevenueDoughnutChart";
import RevenueMultiLineChart from "@/components/RevenueMultiLineChart";
import RevenueProfitComboChart from "@/components/RevenueProfitComboChart";
import Sparkline from "@/components/Chart/Sparkline";
import StackedBarChart from "@/components/Chart/StackedBarChart";
import { piechartData, stackedbarchartData } from "@/constants/chart";
import DoughnutChart from "@/components/Chart/DoughnutChart";

export default function Revenue() {
  const revenueData = [
    3500000, // Tháng 1
    4200000, // Tháng 2
    3800000, // Tháng 3
    5000000, // Tháng 4
    4700000, // Tháng 5
    5200000, // Tháng 6
    6100000, // Tháng 7
    5900000, // Tháng 8
    6300000, // Tháng 9
    7000000, // Tháng 10
    6800000, // Tháng 11
    7500000, // Tháng 12
  ];

  return (
    <Container className=" grid grid-cols-2 gap-5">
      <div className=" grid grid-cols-2 gap-2 h-full w-full">
        <div className="bg-white p-4 rounded-xl shadow flex flex-col gap-2">
          <div className="text-gray-500 text-sm">Doanh thu tuần này</div>
          <div className="text-2xl font-bold">34.700.000₫</div>
          <Sparkline dataValues={revenueData} />
        </div>
        <div className="bg-white p-4 rounded-xl shadow flex flex-col gap-2">
          <div className="text-gray-500 text-sm">Doanh thu tuần này</div>
          <div className="text-2xl font-bold">34.700.000₫</div>
          <Sparkline dataValues={revenueData} />
        </div>
      </div>
      <div className=" grid grid-rows-2 gap-2 h-full">
        <div className="flex flex-row gap-2 justify-between items-center rounded-xl shadow-sm p-5">
          <div className=" grow">
            <div className="text-gray-500 text-sm">Doanh thu tuần này</div>
            <div className="text-2xl font-bold">34.700.000₫</div>
          </div>
          <Sparkline dataValues={revenueData} className="h-14 max-w-80" />
        </div>
        <div className="flex flex-row gap-2 justify-between items-center rounded-xl shadow-sm p-5">
          <div className=" grow">
            <div className="text-gray-500 text-sm">Doanh thu tuần này</div>
            <div className="text-2xl font-bold">34.700.000₫</div>
          </div>
          <Sparkline dataValues={revenueData} className="h-14 max-w-80" />
        </div>
      </div>
      <StackedBarChart
        labels={stackedbarchartData.labels}
        electricity={stackedbarchartData.electricity}
        water={stackedbarchartData.water}
        internet={stackedbarchartData.internet}
        className="min-h-96 shadow-xs p-2 rounded-2xl"
      />
      <DoughnutChart
        dataValues={piechartData.dataValues}
        labels={piechartData.labels}
        className="p-2 h-72 shadow-sm border rounded-2xl"
      />
      <RevenueAreaChart />
      <Chart />
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Chi phí theo tháng</h1>
        <RevenueMultiLineChart />
      </div>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">
          Doanh thu & Lợi nhuận theo tháng
        </h1>
        <RevenueProfitComboChart />
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h1 className="text-2xl font-semibold mb-4">Tỷ trọng doanh thu</h1>
          <RevenueDoughnutChart />
        </div>

        <div>
          <h1 className="text-2xl font-semibold mb-4">
            Chi phí theo từng hạng mục
          </h1>
          {/* Có thể dùng StackedBarChart hoặc MultiLineChart */}
        </div>
      </div>
    </Container>
  );
}
