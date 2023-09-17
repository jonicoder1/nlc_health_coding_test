import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface StockData {
  date: string;
  close: number;
}

interface AlphaVantageResponse {
  "Time Series (15min)": { [key: string]: { "4. close": string } };
}

const StockChart: React.FC = () => {
  const [stockData, setStockData] = useState<StockData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "YOUR_API_KEY"; // Replace with your Alpha Vantage API key
        const symbol = "AAPL"; // Replace with the desired stock symbol
        const interval = "15min"; // Use '15min' interval for demonstration
        const response = await axios.get<AlphaVantageResponse>(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${apiKey}`
        );

        // Parse the response and extract relevant data
        const parsedData = Object.entries(
          response.data["Time Series (15min)"]
        ).map(([date, values]) => ({
          date,
          close: parseFloat(values["4. close"]),
        }));

        setStockData(parsedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Stock Chart</h2>
      <LineChart
        width={800}
        height={400}
        data={stockData}
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="close" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default StockChart;
