"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  dayNames,
  getDaysInMonth,
  getFirstDayOfMonth,
  monthNames,
} from "../_utils/calendarUtils";

type CalendarProps = {
  onSelectDate?: (date: Date) => void;
};

const Calendar = ({ onSelectDate }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(selectedDate);
    if (onSelectDate) {
      onSelectDate(selectedDate);
    }
  };

  const renderCalendarDays = () => {
    const days = [];
    const totalSlots = firstDayOfMonth + daysInMonth; // 전체 슬롯(공백 + 날짜)
    const rows = Math.ceil(totalSlots / 7); // 필요한 줄 수

    // 이전 달 공백 추가
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="mx-2 h-6 w-6"></div>);
    }

    // 현재 달 날짜 추가
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        selectedDate?.getDate() === day &&
        selectedDate?.getMonth() === currentDate.getMonth() &&
        selectedDate?.getFullYear() === currentDate.getFullYear();
      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`mx-2 h-6 w-6 text-xs font-medium text-[#101010] rounded-full flex items-center justify-center
                       ${
                         isSelected
                           ? "bg-[#006ffd] text-white"
                           : "hover:bg-gray-100"
                       }`}
        >
          {day}
        </button>
      );
    }

    // 다음 달 공백 추가
    const remainingSlots = rows * 7 - (firstDayOfMonth + daysInMonth);
    for (let i = 0; i < remainingSlots; i++) {
      days.push(<div key={`empty-end-${i}`} className="mx-2 h-6 w-6"></div>);
    }

    // 7개씩 나누어 그룹화
    const weeks = [];
    for (let i = 0; i < rows; i++) {
      weeks.push(
        <div key={`week-${i}`} className="flex justify-between w-full">
          {days.slice(i * 7, i * 7 + 7)}
        </div>
      );
    }

    return weeks;
  };

  return (
    <section className="w-full px-6 flex flex-col justify-center items-center">
      <div className="w-full flex flex-col justify-start itesm-center bg-[#f9f9f9] rounded-md gap-y-6 px-4 py-3">
        {/* 달력 헤더 */}
        <div className="flex items-center justify-between px-4 py-2">
          <h2 className="font-semibold text-sm text-[#101010]">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex flex-row justify-start items-center gap-x-4">
            <button
              onClick={handlePrevMonth}
              className="rounded-full hover:bg-gray-200"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNextMonth}
              className="rounded-full hover:bg-gray-200"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col justify-start items-center gap-y-2">
          {/* 달력 요일 */}
          <div className="w-full flex flex-row justify-between items-center">
            {dayNames.map((day, index) => (
              <div
                key={index}
                className="w-10 h-4 text-center font-medium text-[#101010] text-xs"
              >
                {day}
              </div>
            ))}
          </div>
          {/* 달력 일 */}
          {renderCalendarDays()}
        </div>
      </div>
    </section>
  );
};

export default Calendar;
