import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';

type CalendarProps = {
    map: Map<number, any[]>;
    setSelectedDate: (day: number) => void;
    selectedDate: number | null;
};

const Calendar = ({map, setSelectedDate, selectedDate}: CalendarProps) => {
    const currentDate = new Date();
    const [displayedMonth, setDisplayedMonth] = useState(currentDate.getMonth());
    const [displayedYear, setDisplayedYear] = useState(currentDate.getFullYear());

    const handlePrevMonth = () => {
        setDisplayedMonth((prevMonth) => {
            if (prevMonth === 0) {
                setDisplayedYear(displayedYear - 1);
                return 11;
            } else {
                return prevMonth - 1;
            }
        });
    };

    const handleNextMonth = () => {
        setDisplayedMonth((prevMonth) => {
            if (prevMonth === 11) {
                setDisplayedYear(displayedYear + 1);
                return 0;
            } else {
                return prevMonth + 1;
            }
        });
    };

    const daysInMonth = getDaysInMonth(displayedYear, displayedMonth);

    function getDaysInMonth(year: number, month: number) {
        return new Date(year, month + 1, 0).getDate();
    }

    const handleDayClick = (day: number) => {
        setSelectedDate(day);
    };

    const getBookingStatus = (day: number) => {
        const bookings = map.get(day) || [];
        if (bookings.length === 1) {
            return 'bg-yellow-300';
        } else if (bookings.length > 4) {
            return 'bg-red-300';
        } else {
            return 'bg-green-300';
        }
    };

    const renderMonth = () => {
        const firstDayOfMonth = new Date(displayedYear, displayedMonth, 1);
        const firstDayOfWeek = firstDayOfMonth.getDay();
        const days = [];

        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push(<div key={`empty-${i}`} className="p-3"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(displayedYear, displayedMonth, day);
            const isPastDay = date < currentDate;
            days.push(
                <div
                    key={day}
                    className={`p-3 text-center cursor-pointer border ${
                        selectedDate === day ? 'bg-blue-500 text-white' : isPastDay ? 'text-gray-500' : getBookingStatus(day)
                    }`}
                    onClick={() => handleDayClick(day)}
                >
                    {day}
                </div>
            );
        }
        const date = new Date(displayedYear, displayedMonth);

        return (
            <div className="month">
                <h2 className="text-xl mb-2">{`${displayedYear} - ${date.toLocaleString('default', {month: 'long'})}`}</h2>
                <div className="grid grid-cols-7 gap-1">
                    <div className="p-3 bg-gray-200 text-center">Sun</div>
                    <div className="p-3 bg-gray-200 text-center">Mon</div>
                    <div className="p-3 bg-gray-200 text-center">Tue</div>
                    <div className="p-3 bg-gray-200 text-center">Wed</div>
                    <div className="p-3 bg-gray-200 text-center">Thu</div>
                    <div className="p-3 bg-gray-200 text-center">Fri</div>
                    <div className="p-3 bg-gray-200 text-center">Sat</div>
                    {days}
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-xl mx-auto m-2">
            <div className="flex justify-between mb-4 items-center">
                <button onClick={handlePrevMonth} className="focus:outline-none">
                    <FontAwesomeIcon icon={faChevronLeft} size="lg"/>
                </button>
                <button onClick={handleNextMonth} className="focus:outline-none">
                    <FontAwesomeIcon icon={faChevronRight} size="lg"/>
                </button>
            </div>
            {renderMonth()}
        </div>
    );
};

export default Calendar;
