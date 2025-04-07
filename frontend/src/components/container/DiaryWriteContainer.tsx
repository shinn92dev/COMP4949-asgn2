import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { storeDiaryRequest } from "@/src/api/diary";
import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
type DiaryFormValues = {
    date: string;
    diary: string;
};

const DiaryWriteContainer = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<DiaryFormValues>();
    const [isLoading, setIsLoading] = useState(false);
    const placeholder = "How did you feel today? Write down anything on your mind.";
    const today = format(new Date(), "yyyy-MM-dd");
    const navigate = useNavigate();
    const onSubmit = async (data: DiaryFormValues) => {
        console.log("📘 Diary Submitted:", data);
        setIsLoading(true);
        const response = await storeDiaryRequest(data.diary, data.date);
        if (response.success) {
            navigate("/diary");
        } else {
            navigate("error");
        }
        setIsLoading(false);
    };
    if (isLoading) return <p>Loading..</p>;
    return (
        <div className="mt-10 w-full">
            <h1 className="text-center w-full text-3xl font-bold">Write Diary</h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-10 px-5 flex flex-col items-center justify-center w-full gap-y-5"
            >
                <Input type="date" defaultValue={today} {...register("date", { required: true })} />
                {errors.date && <span className="text-sm text-red-500">Date is required</span>}

                <Textarea
                    className="w-full h-[300px]"
                    placeholder={placeholder}
                    {...register("diary", { required: true })}
                />
                {errors.diary && (
                    <span className="text-sm text-red-500">Diary cannot be empty</span>
                )}

                <Button type="submit" className="w-full max-w-xl">
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default DiaryWriteContainer;
