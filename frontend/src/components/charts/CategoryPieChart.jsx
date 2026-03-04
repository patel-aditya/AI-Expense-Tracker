import { PieChart, Pie, Tooltip, Legend } from "recharts";

function CategoryPieChart({ data }) {

    if (!Array.isArray(data) || data.length === 0) {
        return <p>No category data available</p>;
    }

    return (
        <PieChart width={400} height={300}>
            <Pie
                data={data}
                dataKey="total"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
            />
            <Tooltip />
            <Legend />
        </PieChart>
    );
}

export default CategoryPieChart;