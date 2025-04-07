import { useMemo, useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DiaryCard from "../DiaryCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { fetchAllDiaryRequest } from "@/src/api/diary";

type DiaryType = {
    diary_id: number;
    diary: string;
    created_at: string;
    score: number;
};

const DiaryContainer = () => {
    const currentDate = new Date();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
    const [visibleMonths, setVisibleMonths] = useState<string[]>([]);
    const [diaries, setDiaries] = useState<DiaryType[]>([]);
    const [selectedDiaries, setSelectedDiaries] = useState<DiaryType[]>([]);
    const months = useMemo(
        () => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        []
    );
    const navigate = useNavigate();
    // Update visible months based on screen size and selected month
    const updateVisibleMonths = useCallback(() => {
        const isMd = window.innerWidth >= 768 && window.innerWidth < 1024;
        const isLg = window.innerWidth >= 1024;

        let count = 3; // Default for small screens
        if (isLg) count = 7;
        else if (isMd) count = 5;

        const halfCount = Math.floor(count / 2);
        let startIndex = selectedMonth - halfCount;

        if (startIndex < 0) startIndex = 0;
        if (startIndex + count > 12) startIndex = 12 - count;

        const visible = months.slice(startIndex, startIndex + count);
        setVisibleMonths(visible);
    }, [selectedMonth, months]);

    // Handle fetching diary
    useEffect(() => {
        const fetchDiaries = async () => {
            try {
                setIsLoading(true);
                const response = await fetchAllDiaryRequest();
                setDiaries(response.data.diary);
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to fetch diary:", error);
            }
        };
        fetchDiaries();
    }, []);

    // Handle window resize
    useEffect(() => {
        updateVisibleMonths();
        window.addEventListener("resize", updateVisibleMonths);
        return () => window.removeEventListener("resize", updateVisibleMonths);
    }, [updateVisibleMonths]);

    useEffect(() => {
        const filtered = diaries.filter((diary) => {
            const date = new Date(diary.created_at);
            return date.getFullYear() === selectedYear && date.getMonth() === selectedMonth;
        });
        setSelectedDiaries(filtered);
    }, [selectedYear, selectedMonth, diaries]);

    // Handle month navigation
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

    // Handle year navigation
    const prevYear = () => {
        setSelectedYear(selectedYear - 1);
    };

    const nextYear = () => {
        setSelectedYear(selectedYear + 1);
    };
    if (isLoading) return <p>Loading...</p>;
    return (
        <div className="mt-10 w-full">
            {/* Calendar */}
            <div>
                <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
                    {/* Year row */}
                    <div className="flex justify-center items-center w-full mb-2">
                        <button className="cursor-pointer p-2" onClick={prevYear}>
                            <ChevronLeft size={24} />
                        </button>

                        <div className="flex items-center justify-center">
                            <div className="px-6 py-1 rounded-lg border-black border-2 cursor">
                                {selectedYear}
                            </div>
                        </div>

                        <button className="p-2 cursor-pointer" onClick={nextYear}>
                            <ChevronRight size={24} />
                        </button>
                    </div>

                    {/* Month row */}
                    <div className="flex justify-center items-center w-full">
                        <button className="p-2 cursor-pointer" onClick={prevMonth}>
                            <ChevronLeft size={24} />
                        </button>

                        <div className="flex">
                            {visibleMonths.map((month) => (
                                <div
                                    key={month}
                                    className={`border-black border-2 px-7 py-1 mx-1 cursor-pointer rounded-lg  ${
                                        months.indexOf(month) === selectedMonth ? "bg-blue-700" : ""
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

                    {/* Display current selection - optional, for demonstration */}
                    <div className="w-full my-6 text-center flex justify-between items-center px-16">
                        <p>
                            Selected: {months[selectedMonth]} {selectedYear}
                        </p>
                        <Button
                            onClick={() => {
                                navigate("/diary/write");
                            }}
                        >
                            Write
                        </Button>
                    </div>
                </div>
            </div>
            {/* Diary */}
            <div className="grid gap-y-5">
                {selectedDiaries.length == 0 ? (
                    <p>No diary found...</p>
                ) : (
                    selectedDiaries.map((diary) => {
                        {
                            return (
                                <DiaryCard
                                    text={diary.diary}
                                    date={diary.created_at}
                                    score={diary.score}
                                />
                            );
                        }
                    })
                )}
            </div>
        </div>
    );
};

export default DiaryContainer;
