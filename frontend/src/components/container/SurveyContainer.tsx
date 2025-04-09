import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useForm, Controller } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { submit_survey_request } from "@/src/api/service";

export type SurveyFormValues = {
    age: number;
    academicPressure: number;
    studySatisfaction: number;
    workHour: number;
    financialStress: number;
    suicidalThought: boolean;
    dietaryHabit: string;
    academicSatisfaction: number;
    gpa: number;
};
const SurveyContainer = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<SurveyFormValues>();
    const navigate = useNavigate();
    console.log("errors", errors);

    const onSubmit = async (data: SurveyFormValues) => {
        console.log("errors", errors);
        console.log("Form Data:", data);
        const result = await submit_survey_request(data);
        console.log(result);
        console.log(result.data.survey_score);
        await window.localStorage.setItem("surveyScore", result.data.survey_score);
        if (result) {
            navigate("/score");
        } else {
            navigate("/error");
        }
    };

    return (
        <div className="mt-10 w-full">
            <Card>
                <CardHeader>
                    <CardTitle>Depression Survey</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* 나이 입력 */}
                            <div className="flex flex-col gap-y-2">
                                <Label htmlFor="age">Age:</Label>
                                <Input
                                    type="number"
                                    id="age"
                                    className="max-w-xl"
                                    min={5}
                                    max={150}
                                    {...register("age", { required: true, valueAsNumber: true })}
                                />
                                {errors.age && (
                                    <span className="text-red-500 text-sm">Age is required</span>
                                )}
                            </div>
                            <Separator className="my-10 md:hidden" />

                            {/* 학습 시간 */}
                            <div className="flex flex-col gap-y-2">
                                <Label htmlFor="workHour">Work / Study Hours a Day:</Label>
                                <Input
                                    type="number"
                                    id="workHour"
                                    className="max-w-xl"
                                    min={1}
                                    max={20}
                                    {...register("workHour", {
                                        required: true,
                                        valueAsNumber: true,
                                    })}
                                />
                                {errors.age && (
                                    <span className="text-red-500 text-sm">
                                        Work or study hours are required
                                    </span>
                                )}
                            </div>
                        </div>
                        <Separator className="my-10" />

                        {/* 학습 만족도 */}
                        <div className="flex flex-col gap-y-2">
                            <Label>How satisfied are you with your academic experience?</Label>
                            <p className="text-muted-foreground text-sm -mt-1 mb-2">
                                Please rate from 1 (“Not satisfied at all”) to 5 (“Extremely
                                satisfied”).
                            </p>
                            <Controller
                                control={control}
                                name="academicSatisfaction"
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <RadioGroup.Root
                                        className="grid grid-cols-5 gap-3"
                                        value={field.value?.toString() || ""}
                                        onValueChange={(val) => {
                                            field.onChange(Number(val));
                                        }}
                                    >
                                        {[1, 2, 3, 4, 5].map((val) => (
                                            <RadioGroup.Item
                                                key={val}
                                                value={val.toString()}
                                                className="ring-[1px] ring-border rounded py-1 px-3 data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500"
                                            >
                                                <span className="font-semibold tracking-tight">
                                                    {val}
                                                </span>
                                            </RadioGroup.Item>
                                        ))}
                                    </RadioGroup.Root>
                                )}
                            />
                        </div>
                        <Separator className="my-10" />

                        {/* 학업 스트레스 */}
                        <div className="flex flex-col gap-y-2">
                            <Label>How much pressure do you feel academically?</Label>
                            <p className="text-muted-foreground text-sm -mt-1 mb-2">
                                1 as “No pressure at all” and 5 as “Extreme pressure”
                            </p>
                            <Controller
                                name="academicPressure"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <RadioGroup.Root
                                        className="max-w-full w-full grid grid-cols-5 gap-3"
                                        value={field.value?.toString() || ""}
                                        onValueChange={(val) => field.onChange(Number(val))}
                                    >
                                        {[1, 2, 3, 4, 5].map((val) => (
                                            <RadioGroup.Item
                                                key={`stress_${val}`}
                                                value={val.toString()}
                                                className="ring-[1px] ring-border rounded py-1 px-3 data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500"
                                            >
                                                <span className="font-semibold tracking-tight">
                                                    {val}
                                                </span>
                                            </RadioGroup.Item>
                                        ))}
                                    </RadioGroup.Root>
                                )}
                            />
                        </div>
                        <Separator className="my-10" />

                        {/* 재정적 스트레스 */}
                        <div className="flex flex-col gap-y-2">
                            <Label>How often do you feel financially stressed?</Label>
                            <p className="text-muted-foreground text-sm -mt-1 mb-2">
                                1 as “No stress at all” and 5 as “Extreme stress”
                            </p>
                            <Controller
                                control={control}
                                name="financialStress"
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <RadioGroup.Root
                                        className="grid grid-cols-5 gap-3"
                                        value={field.value?.toString() || ""}
                                        onValueChange={(val) => field.onChange(Number(val))}
                                    >
                                        {[1, 2, 3, 4, 5].map((val) => (
                                            <RadioGroup.Item
                                                key={val}
                                                value={val.toString()}
                                                className="ring-[1px] ring-border rounded py-1 px-3 data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500"
                                            >
                                                <span className="font-semibold tracking-tight">
                                                    {val}
                                                </span>
                                            </RadioGroup.Item>
                                        ))}
                                    </RadioGroup.Root>
                                )}
                            />
                        </div>
                        <Separator className="my-10" />
                        {/* GPA */}
                        <div className="flex flex-col gap-y-2">
                            <Label>Please rate your academic performance (1–10).</Label>

                            <Controller
                                name="gpa"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <RadioGroup.Root
                                        className="grid grid-cols-5 gap-3"
                                        value={field.value?.toString() || ""}
                                        onValueChange={(val) => field.onChange(Number(val))}
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
                                            <RadioGroup.Item
                                                key={`GPA_${val}`}
                                                value={val.toString()}
                                                className="ring-[1px] ring-border rounded py-1 px-3 data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500"
                                            >
                                                <span className="font-semibold tracking-tight">
                                                    {val}
                                                </span>
                                            </RadioGroup.Item>
                                        ))}
                                    </RadioGroup.Root>
                                )}
                            />
                        </div>
                        <Separator className="my-10" />
                        {/* 자살 생각 여부 */}

                        <div className="flex flex-col gap-y-2">
                            <Label>Have you ever had suicidal thoughts?</Label>
                            <p className="text-muted-foreground text-sm -mt-1 mb-2">
                                Sometimes life can feel overwhelming. Let us know if you&apos;ve
                                ever had such thoughts.
                            </p>
                            <Controller
                                name="suicidalThought"
                                control={control}
                                rules={{
                                    validate: (value) =>
                                        value === true ||
                                        value === false ||
                                        "Please select an option.",
                                }}
                                render={({ field }) => {
                                    return (
                                        <RadioGroup.Root
                                            className="grid grid-cols-1 md:grid-cols-2 gap-3"
                                            value={
                                                field.value === true
                                                    ? "YES"
                                                    : field.value === false
                                                    ? "NO"
                                                    : ""
                                            }
                                            onValueChange={(val) => {
                                                console.log("selected suicidal thought:", val); // 🔍 확인
                                                field.onChange(val == "YES" ? true : false);
                                            }}
                                        >
                                            {["YES", "NO"].map((val) => (
                                                <RadioGroup.Item
                                                    key={`suicidal_${val}`}
                                                    value={val}
                                                    className="ring-[1px] ring-border rounded py-1 px-3 data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500"
                                                >
                                                    <span className="text-left font-medium text-sm">
                                                        {val === "YES"
                                                            ? "I’ve had such thoughts"
                                                            : "I’ve never had such thoughts"}
                                                    </span>
                                                </RadioGroup.Item>
                                            ))}
                                        </RadioGroup.Root>
                                    );
                                }}
                            />
                        </div>
                        <Separator className="my-10" />

                        {/* 식습관 */}
                        <div className="flex flex-col gap-y-2">
                            <Label>How would you describe your eating habits?</Label>
                            <p className="text-muted-foreground text-sm -mt-1 mb-2">
                                This helps us understand your overall lifestyle and well-being.
                            </p>

                            <Controller
                                name="dietaryHabit"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <RadioGroup.Root
                                        className="grid grid-cols-1 gap-3"
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        {[
                                            {
                                                value: "Healthy",
                                                label: "I maintain a balanced and healthy diet",
                                            },
                                            {
                                                value: "Moderate",
                                                label: "I try to eat well, but not always",
                                            },
                                            {
                                                value: "Unhealthy",
                                                label: "My diet is often unbalanced or irregular",
                                            },
                                        ].map((option) => (
                                            <RadioGroup.Item
                                                key={option.value}
                                                value={option.value}
                                                className="ring-[1px] ring-border rounded py-2 px-3 data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500"
                                            >
                                                <span className="text-left font-medium text-sm">
                                                    {option.label}
                                                </span>
                                            </RadioGroup.Item>
                                        ))}
                                    </RadioGroup.Root>
                                )}
                            />
                        </div>
                        <Separator className="my-10" />

                        <button
                            type="submit"
                            className="mt-4 px-4 py-2 rounded bg-primary text-white font-bold"
                        >
                            Submit
                        </button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};
export default SurveyContainer;
