import React from 'react';

type CalendarProps = {
    map: Map<number, any[]>;
    setSelectedDate: (day: number) => void;
    selectedDate: number | null;
}
const Calendar = ({map, setSelectedDate, selectedDate}: CalendarProps) => {
    const daysInMonth = getDaysInMonth();

    function getDaysInMonth() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        return new Date(year, month, 0).getDate();
    }

    const handleDayClick = (day: number) => {
        setSelectedDate(day);
    }

    const getBookingStatus = (day: number) => {
        const bookings = map.get(day) || [];
        if (bookings.length === 1) {
            return 'bg-yellow-300';
        } else if (bookings.length > 4) {
            return 'bg-red-300';
        } else {
            return 'bg-green-300';
        }
    }

    return (
        <div className="max-w-xl mx-auto m-2">
            <div className="grid grid-cols-8 gap-1 mb-4">
                {Array.from({length: daysInMonth}, (_, index) => index + 1).map(day => (
                    <div
                        key={day}
                        className={`p-3 text-center cursor-pointer border ${
                            selectedDate === day ? 'bg-blue-500 text-white' : getBookingStatus(day)
                        }`}
                        onClick={() => handleDayClick(day)}
                    >
                        {day}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
