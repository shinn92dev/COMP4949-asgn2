import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
const DiaryCard = ({ text, date, score }: { text: string; date: string; score: number | null }) => {
    const formattedDate = format(new Date(date), "yy/MM/dd HH:mm");

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>{formattedDate}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row md:justify-between">
                        <p className="w-full md:w-4/5 md:border-r-2 pr-5">{text}</p>
                        <Separator className="my-5 md:hidden" />
                        <div className="w-full md:w-1/5 flex flex-row md:flex-col justify-center items-center">
                            <p className="text-center">Depression</p>
                            <p className="text-center ml-2 md:ml-0">Score</p>
                            {score ? (
                                <p className="text-5xl font-bold p-5 pt-2">{score}</p>
                            ) : (
                                <p className="p-5 pt-2">on process..</p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
export default DiaryCard;
