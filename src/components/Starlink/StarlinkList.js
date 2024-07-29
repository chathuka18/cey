

const StarlinkList = ({ starlink }) => {

    return (
        <div className="starlink-list">
            <h2>Starlink List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Rigging</th>
                        <th>Polylining</th>
                        <th>Fumigation</th>
                        <th>Container Repairs</th>
                        <th>Container Spare Sales</th>
                        <th>Container Washing</th>
                        <th>GOH BD</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {starlink.map((starlink) => (
                        <tr key={starlink.id}>
                            <td>{starlink.id}</td>
                            <td>{starlink.full_rigging}</td>
                            <td>{starlink.polylining}</td>
                            <td>{starlink.fumigation}</td>
                            <td>{starlink.container_repairs}</td>
                            <td>{starlink.container_spare_sales}</td>
                            <td>{starlink.container_washing}</td>
                            <td>{starlink.goh_bd}</td>
                            <td>{starlink.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StarlinkList;
