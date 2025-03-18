import { useEffect, useState } from "react";
import "./MainPage.css"
import ScheduleItem from "../TodoList/TodoList";


export default function TodoList() {
    const today = new Date();
    const formatedDate = today.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })

    const [dates, setDates] = useState<{ day: string, date: string }[]>([]);

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const currentDay = today.getDate();

        const dateArray = [];
        for (let day = currentDay; day <= daysInMonth; day++) {
            const dateObj = new Date(year, month, day);
            dateArray.push({
                day: dateObj.toLocaleDateString("en-GB", { weekday: "short" }),
                date: dateObj.toLocaleDateString("en-GB", { day: "2-digit" })
            })
        }
        setDates(dateArray);
    }, []);

    return (
        <>
            <div className="py-16 w-lg m-auto">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-0.5">
                        <div className="text-gray-500">
                            {formatedDate}
                        </div>
                        <div className="text-2xl font-bold">Today</div>
                    </div>
                    <div className="flex gap-4 w-96 overflow-x-auto no-scrollbar text-center">
                        {
                            dates.map((item, index) => (
                                <div key={index}>
                                    <div className="text-gray-500">
                                        {item.day}
                                    </div>
                                    <div className="font-semibold">
                                        {item.date}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <ScheduleItem
                        time="9:00 AM"
                        title="Meeting"
                        description="Zoom call, Discuss team task for the day"
                        avatarUrls={[
                            'https://via.placeholder.com/30',
                            'https://via.placeholder.com/30',
                            'https://via.placeholder.com/30',
                            'https://via.placeholder.com/30',
                        ]}
                        isLoading={false} />
                    <ScheduleItem
                        time="7:00 AM"
                        title="Wakeup"
                        description="Early wakeup from bed and fresh" />
                    <ScheduleItem
                        time="9:00 AM"
                        title="Meeting"
                        description="Zoom call, Discuss team task for the day"
                        avatarUrls={[
                            'https://via.placeholder.com/30',
                            'https://via.placeholder.com/30',
                            'https://via.placeholder.com/30',
                            'https://via.placeholder.com/30',
                        ]}
                        isLoading={false} />
                </div>
            </div>
        </>
    )
}
