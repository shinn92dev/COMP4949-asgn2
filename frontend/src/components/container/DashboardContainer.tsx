import { useEffect, useState, useMemo, useCallback } from "react";
import { useAuth, useSession } from "@clerk/clerk-react";
import { loginFetchRequest } from "@/src/api/authentication";
import { checkInitialSurvey, fetchAllScoresRequest } from "@/src/api/service";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ChartView from "@/src/components/ChartView";

type ScoreType = {
    score_id: number;
    user_id: string;
    score: number;
    created_at: string;
    diary_id: number | null;
};

const DashboardContainer = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { isSignedIn } = useAuth();
    const session = useSession();
    const currentDate = new Date();
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
    const [visibleMonths, setVisibleMonths] = useState<string[]>([]);
    const [scores, setScores] = useState<ScoreType[]>([]);
    const months = useMemo(
        () => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        []
    );

    const navigate = useNavigate();

    // 👉 월 네비게이션 사이즈 조정
    const updateVisibleMonths = useCallback(() => {
        const isMd = window.innerWidth >= 768 && window.innerWidth < 1024;
        const isLg = window.innerWidth >= 1024;

        let count = 3;
        if (isLg) count = 7;
        else if (isMd) count = 5;

        const halfCount = Math.floor(count / 2);
        let startIndex = selectedMonth - halfCount;
        if (startIndex < 0) startIndex = 0;
        if (startIndex + count > 12) startIndex = 12 - count;

        const visible = months.slice(startIndex, startIndex + count);
        setVisibleMonths(visible);
    }, [selectedMonth, months]);

    // 📌 인증, 설문, 점수 불러오기 통합
    useEffect(() => {
        const loadAll = async () => {
            try {
                const token = await session.session?.getToken({ template: "moodiary_backend" });
                if (!isSignedIn || !token) throw Error("User is not signed in");

                const userData = await loginFetchRequest(token);
                const surveyStatusData = await checkInitialSurvey(userData.data.user_id);
                const surveyStatus = surveyStatusData.data.survey_statue;
                if (!surveyStatus) return navigate("/survey");

                const allScores = await fetchAllScoresRequest();
                if (allScores.success) {
                    setScores(allScores.data.scores);
                } else {
                    navigate("/error");
                }
                console.log(scores);
            } catch (error) {
                console.error(error);
                navigate("/error");
            } finally {
                setIsLoading(false);
            }
        };

        loadAll();
    }, [isSignedIn, session.session, navigate, scores]);

    // 📅 윈도우 리사이징 시 월 UI 업데이트
    useEffect(() => {
        updateVisibleMonths();
        window.addEventListener("resize", updateVisibleMonths);
        return () => window.removeEventListener("resize", updateVisibleMonths);
    }, [updateVisibleMonths]);

    // 📆 월 이동
    const prevMonth = () => {
        if (selectedMonth > 0) {
            setSelectedMonth(selectedMonth - 1);
        } else {
            setSelectedYear(selectedYear - 1);
            setSelectedMonth(11);
        }
    };

    const nextMonth = () => {
        if (selectedMonth < 11) {
            setSelectedMonth(selectedMonth + 1);
        } else {
            setSelectedYear(selectedYear + 1);
            setSelectedMonth(0);
        }
    };

    // 📊 월간 차트 데이터 생성
    const monthlyChartData = useMemo(() => {
        const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const daily = scores.filter((s) => {
                const date = new Date(s.created_at);
                return (
                    date.getFullYear() === selectedYear &&
                    date.getMonth() === selectedMonth &&
                    date.getDate() === day
                );
            });
            const avg = daily.reduce((acc, s) => acc + s.score, 0) / (daily.length || 1);
            return {
                label: `${day}`,
                score: parseFloat(avg.toFixed(2)),
            };
        });
    }, [scores, selectedYear, selectedMonth]);

    // 로딩 화면
    if (isLoading) return <p className="text-center mt-20">Loading...</p>;

    return (
        <div className="mt-10">
            <h1 className="w-full text-center text-2xl font-bold my-10 mt-20">Monthly Dashboard</h1>

            {/* 📅 월 네비게이션 */}
            <div className="flex justify-center items-center w-full">
                <button className="p-2 cursor-pointer" onClick={prevMonth}>
                    <ChevronLeft size={24} />
                </button>
                <div className="flex">
                    {visibleMonths.map((month) => (
                        <div
                            key={month}
                            className={`border-black border-2 px-7 py-1 mx-1 cursor-pointer rounded-lg ${
                                months.indexOf(month) === selectedMonth
                                    ? "bg-blue-700 text-white"
                                    : ""
                            }`}
                            onClick={() => setSelectedMonth(months.indexOf(month))}
                        >
                            {month}
                        </div>
                    ))}
                </div>
                <button className="p-2" onClick={nextMonth}>
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* 📊 차트 */}
            {scores.length <= 3 ? (
                <div className="my-10 w-full flex justify-center">
                    <p className="font-bold text-3xl">Not enough score to display.</p>
                </div>
            ) : (
                <ChartView
                    title={`Monthly Score - ${months[selectedMonth]} ${selectedYear}`}
                    data={monthlyChartData}
                />
            )}
        </div>
    );
};

export default DashboardContainer;
