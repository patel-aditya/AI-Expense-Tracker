import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function MonthlyBarChart({ data }) {

    if (!Array.isArray(data) || data.length === 0) {
        return <p>No monthly data available</p>;
    }

    return (
        <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
    );
}

export default MonthlyBarChart;