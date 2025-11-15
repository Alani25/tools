import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface SimpleGraphProps {
  xValues: number[]
  yValues: number[]
  xLabel: string
  yLabel: string
  title: string
  maxY: number
  color?: string,
  point?: number[]
}

const SimpleGraph = ({ xValues, yValues, xLabel, yLabel, title, maxY, color = "rgba(75,192,192,1)", point }: SimpleGraphProps) => {
  const data = {
    labels: xValues,
    datasets: [
      {
        label: yLabel,
        data: yValues,
        borderWidth: 2,
        tension: 0.1,

        borderColor: color,
        pointRadius: 0,
        pointHoverRadius: 4,

        // cubicInterpolationMode: "monotone" // THIS todo 
      },


      point ? {
        label: "Output Current",
        data: xValues.map(x => (x === point[0] ? point[1] : null)),
        pointRadius: 5,
        pointHoverRadius: 10,
        borderColor: color || "gray",
        backgroundColor: color || "gray",
        showLine: false
      } : {}
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title
      },
      legend: {
        display: false
      }
    },
    scales: {

      x: {
        title: {
          display: true,
          text: xLabel
        },
        ticks: {
          callback: (value: any) => Number(value / 10).toFixed(1)
        },
        min: 0,
        // max: 7
      },
      y: {
        title: {
          display: true,
          text: yLabel
        },
        min: 0,
        max: maxY,
        ticks: {
          callback: function (value: any) {
            return Number(value).toFixed(0)
          }
        }
      }
    }
  }

  return (
    <div style={{ width: "500px" }}>
      <Line data={data} options={options} />
    </div>
  )
}

export default SimpleGraph
