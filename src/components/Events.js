import axios from "./Axios";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

const { useEffect } = wp.element;

function Events({
  isLoading,
  setIsLoading,
  events,
  setEvents,
  filteredEvents,
  setFilteredEvents,
  dateSelectorValues,
}) {
  const getEventsData = () => {
    setIsLoading(true);
    axios
      .get(`wp-json/ca/v1/events`)
      .then((res) => {
        setEvents(res.data);
        setFilteredEvents(res.data);

        console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getEventsData();
  }, []);

  //FilteringEvents once dateSelectorValues changes
  useEffect(() => {
    filteredEvents = events.filter((event) => {
      let selectorMonth = dateSelectorValues.split("|")[0];
      let selectorYear = dateSelectorValues.split("|")[1];
      let shouldStay = false;

      console.log(selectorMonth);

      if (selectorMonth !== "tout") {
        event.dates.forEach((e) => {
          let startingDate = e.date_deb;
          startingDate = startingDate.split("/").reverse().join("-");
          startingDate = startingDate.slice(0, -2) + "01";
          let endingDate = e.date_fin;
          endingDate = endingDate.split("/").reverse().join("-");
          endingDate = endingDate.slice(0, -2) + "01";

          dayjs.extend(isBetween); //allows us to use isBetween function
          if (
            dayjs(`${selectorYear}-${selectorMonth}-01`).isBetween(
              startingDate,
              endingDate,
              null,
              "[]"
            )
          ) {
            shouldStay = true;
          }
        });
      } else {
        shouldStay = true;
      }
      return shouldStay;
    });

    setFilteredEvents(filteredEvents);
  }, [dateSelectorValues]);

  //HTML OUTPUT
  if (isLoading == true) {
    return (
      <div style={{ marginTop: "5vh", fontSize: "15px", color: "#487F89" }}>
        <FontAwesomeIcon size="3x" spin={true} icon={faRedo} />
      </div>
    );
  } else {
    return (
      <>
        <ul className="pt-24px pt-md-32px d-md-flex flex-md-wrap mx-md-n4px mx-lg-n8px">
          {filteredEvents.map((object, index) => {
            return (
              <li
                key={`key ${index}`}
                className="object-card oc-event col-md-6 px-md-4px col-lg-4 px-lg-8px"
              >
                <a href="#" className="bg-img">
                  <i
                    className="bg-img-size-hover-110"
                    style={{
                      backgroundImage: `url(${object.images})`,
                      backgroundSize: "cover",
                    }}
                  >
                    <b className="d-block position-absolute top-0 bottom-0 left-0 right-0 bg-img-bgcolor-primary-0 bg-img-bgcolor-hover-primary-55 bg-img-transition-bgcolor"></b>
                    <span className="text-white shadow-text-sm m-auto bg-img-opacity-0 bg-img-opacity-hover-1 transition-opacity d-block align-self-center z-10 ff-semibold fs-short-2">
                      Voir l'événement
                    </span>
                  </i>
                  <div>
                    <div className="col-3">
                      <span>{object.dates[0].day}</span>
                      <span>{object.dates[0].month}</span>
                      <span>{object.dates[0].year}</span>
                    </div>

                    <div className="col-9">
                      <h3>{object.nom}</h3>

                      <small>{object.localite}</small>

                      <small>{object.date_affichage}</small>
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default Events;
