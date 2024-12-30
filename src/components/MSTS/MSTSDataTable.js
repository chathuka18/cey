import React, { useState, useEffect } from "react";
import axios from "axios";

const MSTSDataTable = () => {
  const [operationsData, setOperationsData] = useState([]);
  const [maldivesData, setMaldivesData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Operations Data
        const operationsResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/msts-operations`
        );
        setOperationsData(operationsResponse.data);

        // Fetch Maldives Data
        const maldivesResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/msts-maldives`
        );
        setMaldivesData(maldivesResponse.data);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (operationsData.length > 0) {
      // Combine data by matching dates
      const mergedData = operationsData.map((operation) => {
        const matchingMaldives = maldivesData.find(
          (maldives) => maldives.date === operation.date
        );
        return {
          date: operation.date,
          operationsData: operation,
          maldivesData: matchingMaldives || {}, // Default to empty object if no match
        };
      });

      setCombinedData(mergedData);
    }
  }, [operationsData, maldivesData]);

  if (loading) {
    return <div className="text-center mt-10">Loading data...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Combined Data Table
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Operations Data</th>
                <th className="border border-gray-300 px-4 py-2">Maldives Data</th>
              </tr>
            </thead>
            <tbody>
              {combinedData.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {item.date}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <ul className="list-disc pl-4">
                      {Object.entries(item.operationsData).map(([key, value]) => (
                        <li key={key}>
                          <span className="font-medium">
                            {key.replace(/_/g, " ")}:
                          </span>{" "}
                          {value}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {Object.keys(item.maldivesData).length > 0 ? (
                      <ul className="list-disc pl-4">
                        {Object.entries(item.maldivesData).map(([key, value]) => (
                          <li key={key}>
                            <span className="font-medium">
                              {key.replace(/_/g, " ")}:
                            </span>{" "}
                            {value}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-500 italic">No Data</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MSTSDataTable;
