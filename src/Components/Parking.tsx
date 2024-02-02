import React from 'react';


let antallParkeringsplasser = 10;

let data = [
    { licensePlate: 'ABC123', dateFrom: '2022-02-01', dateTo: '2022-02-15', isParkingActivated: true },
    { licensePlate: 'XYZ789', dateFrom: '2022-02-10', dateTo: '2022-02-20', isParkingActivated: false },
    { licensePlate: 'DEF456', dateFrom: '2022-02-15', dateTo: '2022-02-25', isParkingActivated: true },
];


let tilgjengeligParkingsplasser = antallParkeringsplasser - data.length

function activateParking(){
    //logikken inn her ja
}

function deactivateParking() {
    //logikken inn her ja
}

function Parking() {
  return (
      <main className="flex flex-col h-full w-full ">
          <div className="flex">
              <div className="w-2/3 bg-gray-200 p-4 border-b-2 border-gray-700">
                  <h2 className="text-xl font-bold mb-4">Tilgjengelige antall parkeringer: {tilgjengeligParkingsplasser}</h2>
              </div>
              <div className="w-1/3 bg-gray-300 p-4 border-b-2 border-gray-700">
                  <button
                      className="bg-slate-800 text-white px-4 py-2 rounded-md m-2"
                      onClick={activateParking}
                  >Aktiver Parkering</button>
              </div>
          </div>

          <div className="flex">
              <div className="bg-gray-300 p-4 w-full">
                  <h2 className="text-xl font-bold mb-4">Aktive parkeringer</h2>
                  <div>
                      {data.map((item, index) => (
                          <div key={index} className="mb-4 flex justify-between">
                              <div className="m-2">
                                  <p>License Plate: {item.licensePlate}</p>
                              </div>
                              <div className="m-2">
                                  <p>Date From: {item.dateFrom}</p>
                              </div>
                              <div className="m-2">
                                  <p>Date To: {item.dateTo}</p>
                              </div>
                              <button className="bg-slate-800 text-white px-4 py-2 rounded-md m-2" onClick={deactivateParking}>
                                  Deaktiver
                              </button>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </main>
  );
}

export default Parking;
