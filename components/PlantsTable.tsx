import React, { useEffect } from "react";
import firebase from "firebase";
import {
  CommonCollection,
  Land as LandInterface,
  Plant,
} from "../lib/interface";
import LandRow from "./LandRow";
import AdminCheck from "./AdminCheck";
import CanonicalPlantRows from "./CanonicalPlantRows";

const PlantsTable: React.FC<{
  lands: CommonCollection<LandInterface>;
  plants: Plant[];
  user: firebase.User | null | undefined;
  handleLockPlant: (plant_id: string) => void;
  handleUnlock: (plant_id: string) => void;
  handleUpdateCount: () => void;
  crow: boolean;
  crowHours: number;
}> = ({ lands, plants, handleLockPlant, handleUnlock, handleUpdateCount, crow, crowHours }) => {
  return (
    <div className="overflow-x-auto">
      <table className="mt-5 cus1">
        <thead className="text-center z-30">
          <tr>
            <th rowSpan={2} className="text-center w-3/12">
              Land
            </th>
            <th colSpan={5} className="text-center">
              Plant
            </th>
            <th rowSpan={2} className="text-center">
              Actions
            </th>
          </tr>
          <tr>
            <th>Reset In</th>
            <th>Page</th>
            <th>Card Index</th>
            <th>Element</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(plants).map((plant, index) => {
            return (
              <CanonicalPlantRows
                key={index}
                land={lands[plant.landId]}
                plant={plant}
                handleLockPlant={handleLockPlant}
                handleUnlock={handleUnlock}
                handleUpdateCount={handleUpdateCount}
                crow={crow}
                crowHours={crowHours}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PlantsTable;
