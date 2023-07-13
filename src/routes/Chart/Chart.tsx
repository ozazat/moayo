import { useEffect, useState } from 'react';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, isWithinInterval, parseISO } from 'date-fns';
import { useExpensesStore } from '@/store/useExpensesStore';
import { search } from '@/types/apiTypes';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import 'chartjs-plugin-datalabels';

enum TimePeriod {
  WEEK = '주간',
  MONTH = '월간',
  YEAR = '연간',
  ALL = '전체',
}

enum ExpenseType {
  INCOME = '수입',
  EXPENSE = '지출',
}

interface IChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
  }[];
}

const Chart: React.FC = () => {
  const totalLists = useExpensesStore((state) => state.totalLists);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>(TimePeriod.WEEK);
  const [expenseType, setExpenseType] = useState<ExpenseType>(ExpenseType.EXPENSE);
  const [chartData, setChartData] = useState<IChartData | null>(null);

  // 시간 주기에 따라 리스트 필터링
  const filterListByTimePeriod = (list: search) => {
    const listDate = parseISO(list.date);
    switch (timePeriod) {
      case TimePeriod.WEEK:
        return isWithinInterval(listDate, { start: startOfWeek(new Date()), end: endOfWeek(new Date()) });
      case TimePeriod.MONTH:
        return isWithinInterval(listDate, { start: startOfMonth(new Date()), end: endOfMonth(new Date()) });
      case TimePeriod.YEAR:
        return isWithinInterval(listDate, { start: startOfYear(new Date()), end: endOfYear(new Date()) });
      default:
        return true;
    }
  };

  useEffect(() => {
    // 금액 타입에 따라 리스트 필터링
    const filteredList = totalLists
      .filter(filterListByTimePeriod)
      .filter(
        (list) => (expenseType === ExpenseType.INCOME ? list.amount >= 0 : list.amount < 0)
      );

    // 태그 별로 데이터 그룹화
    const tags = filteredList.reduce((acc: any, list: search) => {
      const tag = list.category.split('+')[0];
      if (!acc[tag]) acc[tag] = 0;
      acc[tag] += Math.abs(list.amount);
      return acc;
    }, {});

    setChartData({
      labels: Object.keys(tags),
      datasets: [
        {
          data: Object.values(tags),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // 색상은 임의로 지정
        },
      ],
    });
  }, [totalLists, timePeriod, expenseType]);

  if (!chartData) return null;

  return (
    <div>
      {/* 시간 주기 선택 */}
      <select
        value={timePeriod}
        onChange={(e) => setTimePeriod(e.target.value as TimePeriod)}
      >
        {Object.values(TimePeriod).map((period) => (
          <option key={period} value={period}>
            {period}
          </option>
        ))}
      </select>

      {/* 수입/지출 선택 */}
      <div>
        {Object.values(ExpenseType).map((type) => (
          <button key={type} onClick={() => setExpenseType(type)}>
            {type}
          </button>
        ))}
      </div>

      {/* 차트 */}
      <Pie
        data={chartData}
        options={{
          responsive: true,
          plugins: { legend: { position: 'right' } },
        }}
      />

      {/* 태그 별 목록 */}
      <ul>
        {chartData.labels.map((label, index) => (
          <li key={label}>
            {`${label} : ${chartData.datasets[0].data[index]}원`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chart;
