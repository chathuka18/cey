import React, { useState } from "react";
import MSTSMaldives from "./MSTSMaldives";
import MSTSOperations from "./MSTSOperations";
import MSTSPTI from "./MSTSPTI";
import MSTSReefer from "./MSTSReefer";
import MSTSTechnical from "./MSTSTechnical";
import MSTSDataTable from "./MSTSDataTable";

const MSTSNav = () => {
  const [selected, setSelected] = useState("maldives");

  const renderContent = () => {
    switch (selected) {
        case "all":
        return <MSTSDataTable />;
      case "maldives":
        return <MSTSMaldives />;
      case "operations":
        return <MSTSOperations />;
      case "pti":
        return <MSTSPTI />;
      case "reefer":
        return <MSTSReefer />;
      case "technical":
        return <MSTSTechnical />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      {/* Sub-Nav Bar */}
      <nav className="flex space-x-4 mb-4">
        {/* <button
          onClick={() => setSelected("all")}
          className={`px-4 py-2 border rounded ${
            selected === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
            All
        </button> */}
        <button
          onClick={() => setSelected("maldives")}
          className={`px-4 py-2 border rounded ${
            selected === "maldives" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          MSTS Maldives
        </button>
        <button
          onClick={() => setSelected("operations")}
          className={`px-4 py-2 border rounded ${
            selected === "operations" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          MSTS Operations
        </button>
        <button
          onClick={() => setSelected("pti")}
          className={`px-4 py-2 border rounded ${
            selected === "pti" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          MSTS PTI
        </button>
        <button
          onClick={() => setSelected("reefer")}
          className={`px-4 py-2 border rounded ${
            selected === "reefer" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          MSTS Reefer
        </button>
        <button
          onClick={() => setSelected("technical")}
          className={`px-4 py-2 border rounded ${
            selected === "technical" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          MSTS Technical
        </button>
      </nav>

      {/* Dynamic Content */}
      <div>{renderContent()}</div>
    </div>
  );
};

export default MSTSNav;
