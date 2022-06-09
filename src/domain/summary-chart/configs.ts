import { ChartOptions } from 'chart.js'
import { chartFormatter } from 'services/chart'

export const SummaryPieConfig: ChartOptions = {
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      formatter: chartFormatter,
      color: '#fff',
      font: {
        weight: 'bold',
        size: 16,
        family: 'Poppins',
      },
    },
  },
}