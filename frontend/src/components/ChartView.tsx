import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

type Props = {
    title: string;
    data: { label: string; score: number }[];
};

const ChartView = ({ title, data }: Props) => {
    // score가 999일 경우 0으로 바꾼 새 데이터 생성
    const cleanedData = data.map((d) => ({
        ...d,
        score: d.score > 100 ? 0 : d.score,
    }));

    return (
        <Card className="w-full mt-10 shadow-lg rounded-2xl">
            <CardHeader>
                <CardTitle className="text-center text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={cleanedData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label" />
                        <YAxis domain={[0, 100]} /> {/* ✅ Y축 고정 */}
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="score"
                            stroke="#4f46e5"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default ChartView;
