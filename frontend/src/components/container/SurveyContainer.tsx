import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
type SurveyFormValues = {
    age: number;
    academicPressure: number;
    studySatisfaction: number;
    workHour: number;
    financialStress: number;
    suicidalThought: boolean;
    dietaryHabit: number;
    gpa: number;
};

const sd = [
    // "Age",
    // "Academic_Pressure",
    "Study_Satisfaction",
    // "Work/Study_Hours",
    // "Financial_Stress",
    "Have_you_ever_had_suicidal_thoughts",
    "Dietary_Habits_Moderate",
    "Dietary_Habits_Unhealthy",
    "Degree_Class 12",
    // "CGPA",
];

const SurveyContainer = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SurveyFormValues>();
    return (
        <div className="mt-10 w-full">
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Depression Survey</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form action="" className="space-y-4">
                            <div className="flex flex-col gap-y-5">
                                <Label htmlFor="age">Age:</Label>
                                <Input type="number" className="max-w-xl" />
                            </div>
                            <div className="flex flex-col gap-y-5">
                                <Label htmlFor="age">Work / Study Hours a Day:</Label>
                                <Input type="number" className="max-w-xl" />
                            </div>
                            <div className="flex flex-col gap-y-5">
                                <Label>Academic Pressure</Label>
                                <RadioGroup className="flex gap-y">
                                    {[1, 2, 3, 4, 5].map((val) => (
                                        <div key={val}>
                                            <RadioGroupItem
                                                value={val.toString()}
                                                id={`academic_pressure_${val}`}
                                                className="peer sr-only"
                                            />
                                            <Label
                                                htmlFor={`academic_pressure_${val}`}
                                                className={cn(
                                                    "flex h-16 w-16 items-center justify-center rounded-xl border border-muted bg-background text-xl font-bold shadow-sm",
                                                    "peer-checked:border-primary peer-checked:bg-primary/20 peer-checked:text-primary",
                                                    "peer-checked:ring-2 peer-checked:ring-primary peer-checked:shadow-lg",
                                                    "cursor-pointer transition hover:bg-muted/40"
                                                )}
                                            >
                                                {val}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                            <div className="flex flex-col gap-y-5">
                                <Label>Suicidal Thought?</Label>
                                <RadioGroup className="flex gap-y">
                                    {["YES", "NO"].map((val) => (
                                        <div key={val}>
                                            <RadioGroupItem
                                                value={val.toString()}
                                                id={`academic_pressure_${val}`}
                                                className="peer sr-only"
                                            />
                                            <Label
                                                htmlFor={`academic_pressure_${val}`}
                                                className={cn(
                                                    "flex h-16 w-16 items-center justify-center rounded-xl border border-muted bg-background text-xl font-bold shadow-sm",
                                                    "peer-checked:border-primary peer-checked:bg-primary/20 peer-checked:text-primary",
                                                    "peer-checked:ring-2 peer-checked:ring-primary peer-checked:shadow-lg",
                                                    "cursor-pointer transition hover:bg-muted/40"
                                                )}
                                            >
                                                {val}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                            <div className="flex flex-col gap-y-5">
                                <Label>Dietary Habit</Label>
                                <RadioGroup className="flex gap-y">
                                    {["Healthy", "Moderate", "Unhealthy"].map((val) => (
                                        <div key={val}>
                                            <RadioGroupItem
                                                value={val.toString()}
                                                id={`academic_pressure_${val}`}
                                                className="peer sr-only"
                                            />
                                            <Label
                                                htmlFor={`academic_pressure_${val}`}
                                                className={cn(
                                                    "flex h-16 w-16 items-center justify-center rounded-xl border border-muted bg-background text-xl font-bold shadow-sm",
                                                    "peer-checked:border-primary peer-checked:bg-primary/20 peer-checked:text-primary",
                                                    "peer-checked:ring-2 peer-checked:ring-primary peer-checked:shadow-lg",
                                                    "cursor-pointer transition hover:bg-muted/40"
                                                )}
                                            >
                                                {val}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                            <div className="flex flex-col gap-y-5">
                                <Label>CGPA</Label>
                                <RadioGroup className="flex gap-y">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
                                        <div key={val}>
                                            <RadioGroupItem
                                                value={val.toString()}
                                                id={`financial_stress_${val}`}
                                                className="peer sr-only"
                                            />
                                            <Label
                                                htmlFor={`financial_stress_${val}`}
                                                className={cn(
                                                    "flex h-16 w-16 items-center justify-center rounded-xl border border-muted bg-background text-xl font-bold shadow-sm",
                                                    "peer-checked:border-primary peer-checked:bg-primary/20 peer-checked:text-primary",
                                                    "peer-checked:ring-2 peer-checked:ring-primary peer-checked:shadow-lg",
                                                    "cursor-pointer transition hover:bg-muted/40"
                                                )}
                                            >
                                                {val}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                            <div className="flex flex-col gap-y-5">
                                <Label>Financial Stress</Label>
                                <RadioGroup className="flex gap-y">
                                    {[1, 2, 3, 4, 5].map((val) => (
                                        <div key={val}>
                                            <RadioGroupItem
                                                value={val.toString()}
                                                id={`financial_stress_${val}`}
                                                className="peer sr-only"
                                            />
                                            <Label
                                                htmlFor={`financial_stress_${val}`}
                                                className={cn(
                                                    "flex h-16 w-16 items-center justify-center rounded-xl border border-muted bg-background text-xl font-bold shadow-sm",
                                                    "peer-checked:border-primary peer-checked:bg-primary/20 peer-checked:text-primary",
                                                    "peer-checked:ring-2 peer-checked:ring-primary peer-checked:shadow-lg",
                                                    "cursor-pointer transition hover:bg-muted/40"
                                                )}
                                            >
                                                {val}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
export default SurveyContainer;
