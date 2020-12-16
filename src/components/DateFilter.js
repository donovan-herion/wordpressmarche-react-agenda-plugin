import React from "react";

const { useEffect } = wp.element;

function DateFilter({
  dateFilter,
  setDateFilter,
  setDateFilterId,
  currentMonth,
  currentYear,
}) {
  const fillDateFilter = () => {
    const monthsNames = [
      "Jan",
      "Fev",
      "Mar",
      "Avr",
      "Mai",
      "Juin",
      "Jui",
      "Aout",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthsNumbers = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];

    const arrayOfObject = [
      { name: "Tout", id: 0, month: "", year: "", checked: true },
    ];

    monthsNames.map((elem, index) => {
      let monthName = monthsNames[index];
      let monthNumber = monthsNumbers[index];
      let currentMonthNumber = currentMonth;
      let year = 1900;
      if (monthNumber < currentMonthNumber) {
        year += currentYear + 1;
      } else {
        year += currentYear;
      }
      let object = {
        name: monthName,
        id: index + 1,
        month: monthNumber,
        year: year,
        checked: false,
      };
      arrayOfObject.push(object);
    });

    // console.log(arrayOfObject);
    setDateFilter(arrayOfObject);
  };

  useEffect(() => {
    fillDateFilter();
  }, []);

  function changeSelectedCategory(temp_e) {
    console.log("changed Category");
    const eventId = temp_e.target.id;
    console.log(eventId);
    setDateFilterId(eventId);
  }

  return (
    <>
      <ul className="cat-filters d-md-flex mw-550px flex-wrap justify-content-center align-items-center d-none">
        {dateFilter.map((object, index) => {
          return (
            <li
              key={index}
              className={`${index == 0 ? "mx-16px" : ""} position-relative`}
            >
              <input
                name="cat"
                id={object.id}
                className="position-absolute top-0 bottom-0 left-0 right-0 w-100 h-100"
                type="radio"
                value="all"
                data-month={index}
                data-year="2021 par exemple"
                defaultChecked={object.checked}
                onClick={(e) => {
                  changeSelectedCategory(e);
                }}
              />
              <label
                name="cat-all"
                className="py-4px px-8px fs-short-2 ff-semibold transition-color"
              >
                {`${object.name} ${object.year}`}
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default DateFilter;
