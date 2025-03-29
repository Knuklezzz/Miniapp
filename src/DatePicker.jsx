import { Calendar } from "@/components/ui/calendar.jsx";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover.jsx";
import { Button } from "@/components/ui/button.jsx";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"

const DatePicker = ({ selectedDate, setSelectedDate }) => {
    return (
/*
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left">
                    {selectedDate ? format(selectedDate, "PPP", { locale: ru }) : "Выбрать дату"}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} />
            </PopoverContent>
        </Popover>
*/




    <Popover>
        <PopoverTrigger asChild>
            <Button
                variant={"outline"}
                className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                )}
            >
                <CalendarIcon />
                {selectedDate ? format(selectedDate, "PPP", { locale: ru }) : "Выбрать дату"}
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
            <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
            />
        </PopoverContent>
    </Popover>
    );
};

export default DatePicker;