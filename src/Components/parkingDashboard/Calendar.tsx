import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {ParkingSpot} from "../../types/types";

type CalendarProps = {
    map: Map<number, Map<number, ParkingSpot[]>>;
    setSelectedDate: (day: number) => void;
    selectedDate: number | null;
    setSelectedMonth: (month: number) => void;
    selectedMonth: number;
};

const Calendar = ({map, setSelectedDate, selectedDate, setSelectedMonth, selectedMonth}: CalendarProps) => {
    const currentDate = new Date();
    const [displayedYear, setDisplayedYear] = useState(currentDate.getFullYear());

    const handlePrevMonth = () => {
        if (selectedMonth === 0) {
            setDisplayedYear(displayedYear - 1);
            setSelectedMonth(11);
        } else {
            setSelectedMonth(selectedMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (selectedMonth === 11) {
            setDisplayedYear(displayedYear + 1);
            setSelectedMonth(0);
        } else {
            setSelectedMonth(selectedMonth + 1);
        }
    };

    const daysInMonth = getDaysInMonth(displayedYear, selectedMonth);

    function getDaysInMonth(year: number, month: number) {
        return new Date(year, month + 1, 0).getDate();
    }

    const handleDayClick = (day: number) => {
        setSelectedDate(day);
    };

    const getBookingStatus = (day: number) => {
        const bookings = map.get(selectedMonth + 1)?.get(day) || [];
        if (bookings.length <= 2 && bookings.length > 0) {
            return 'bg-yellow-200';
        } else if (bookings.length > 4) {
            return 'bg-red-200';
        } else {
            return 'bg-emerald-200';
        }
    };


    const renderMonth = () => {
        const firstDayOfMonth = new Date(displayedYear, selectedMonth, 1);
        const firstDayOfWeek = firstDayOfMonth.getDay();
        const days = [];

        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push(<div key={`empty-${i}`} className="p-3"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(displayedYear, selectedMonth, day + 1);
            const isPastDay = date < currentDate;
            days.push(
                <div
                    key={day}
                    className={`p-3 text-center text-gray-600 font-medium cursor-pointer border-white rounded-md shadow ${
                        selectedDate === day ? 'bg-blue-400 text-slate-50' : isPastDay ? 'text-gray-500' : getBookingStatus(day)
                    }`}
                    onClick={() => handleDayClick(day)}
                >
                    {day}
                </div>
            );
        }
        const date = new Date(displayedYear, selectedMonth);

        return (
            <div className="month">
                <div className="flex justify-between pb-4 mb-4 border-b-4 border-gray-100 ">
                    <h1 className="text-2xl">{`${displayedYear} - ${date.toLocaleString('default', {month: 'long'})}`}</h1>
                    <div className="items-end">
                        <button onClick={handlePrevMonth} className="border-2 py-2 px-4 rounded-md mr-4 focus:outline-none">
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <button onClick={handleNextMonth} className="border-2 py-2 px-4 rounded-md focus:outline-none">
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>
                <div className="calenderGrid grid grid-cols-7 gap-3">
                    <div className="p-3 font-bold text-lg text-gray-600 text-center">Sun</div>
                    <div className="p-3 font-bold text-lg text-gray-600 text-center">Mon</div>
                    <div className="p-3 font-bold text-lg text-gray-600 text-center">Tue</div>
                    <div className="p-3 font-bold text-lg text-gray-600 text-center">Wed</div>
                    <div className="p-3 font-bold text-lg text-gray-600 text-center">Thu</div>
                    <div className="p-3 font-bold text-lg text-gray-600 text-center">Fri</div>
                    <div className="p-3 font-bold text-lg text-gray-600 text-center">Sat</div>
                    {days}
                </div>
            </div>
        );
    };

    return (
        <div>
            {renderMonth()}
        </div>
    );
};

export default Calendar;