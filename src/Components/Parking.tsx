import React from 'react';

function activateParking(){

}
function Parking() {
  return (
      <main className="flex flex-col h-full">
          <div className="flex">
              <div className="w-2/3 bg-gray-200 p-4 border-b-2 border-gray-700">
                  <h2 className="text-xl font-bold mb-4">First Column</h2>
              </div>

              <div className="w-1/3 bg-gray-300 p-4 border-b-2 border-gray-700">
                  <h2 className="text-xl font-bold mb-4">Second Column</h2>
                  <button
                      className="bg-slate-800 text-white px-4 py-2 rounded-md"
                      onClick={activateParking}
                  >Aktiver Parkering</button>
              </div>
          </div>

          <div className="flex">
              <div className="w-2/3 bg-gray-200 p-4 border-r-2 border-gray-700">
                  <h2 className="text-xl font-bold mb-4">Third Column</h2>
              </div>

              <div className="w-1/3 bg-gray-300 p-4">
                  <h2 className="text-xl font-bold mb-4">Fourth Column</h2>
              </div>
          </div>
      </main>
  );
}

export default Parking;
