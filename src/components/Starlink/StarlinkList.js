const StarlinkList = ({ starlink }) => {
    return (
        <div className="starlink-list min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
            <div className="w-full max-w-5xl bg-white shadow-md rounded-md p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Starlink List</h2>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-left">
                                <th className="p-2 border">ID</th>
                                <th className="p-2 border">Full Rigging</th>
                                <th className="p-2 border">Polylining</th>
                                <th className="p-2 border">Fumigation</th>
                                <th className="p-2 border">Container Repairs</th>
                                <th className="p-2 border">Container Spare Sales</th>
                                <th className="p-2 border">Container Washing</th>
                                <th className="p-2 border">GOH BD</th>
                                <th className="p-2 border">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {starlink.map((item) => (
                                <tr key={item.id} className="odd:bg-white even:bg-gray-100">
                                    <td className="p-2 border">{item.id}</td>
                                    <td className="p-2 border">{item.full_rigging}</td>
                                    <td className="p-2 border">{item.polylining}</td>
                                    <td className="p-2 border">{item.fumigation}</td>
                                    <td className="p-2 border">{item.container_repairs}</td>
                                    <td className="p-2 border">{item.container_spare_sales}</td>
                                    <td className="p-2 border">{item.container_washing}</td>
                                    <td className="p-2 border">{item.goh_bd}</td>
                                    <td className="p-2 border">{item.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StarlinkList;
