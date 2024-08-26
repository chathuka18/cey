import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CompanyList.css';

const CompanyList = () => {
    const [travels, setTravels] = useState([]);
    const [oceaneeds, setOceaneeds] = useState([]);
    const [cms, setCMS] = useState([]);
    const[cml, setCml] = useState([]);
    const[msts, setMSTS] = useState([]);
    const[califolink, setCalifolink] = useState([]);
    const[starlink, setStarlink] = useState([]);
    const[ccs, setCcs] = useState([]);
    const[csl, setCsl] = useState([]);
    const[mcm, setMCM] = useState([]);
    const[cma, setCMA] = useState([]);
    const[csv, setCsv] = useState([]);
    const[cws, setCWS] = useState([]);
    const[ces, setCES] = useState([]);
    const[cal, setCAL] = useState([]);
    const[nvocc, setNVOCC] = useState([]);
    const[ceymed, setCeymed] = useState([]);

    const [selectedCompany, setSelectedCompany] = useState('all');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [error, setError] = useState(null);

    const fetchTravels = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/travel`);
            setTravels(response.data);
        } catch (error) {
            console.error('There was an error fetching the travels!', error);
            setError(error || 'There was an error fetching the travels!');
        }
    };

    const fetchOceaneeds = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/oceaneeds`);
            setOceaneeds(response.data);
        } catch (error) {
            console.error('There was an error fetching the oceaneeds!', error);
            setError(error || 'There was an error fetching the oceaneeds!');
        }
    };

    const fetchCMS = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/cms`);
            setCMS(response.data);
        } catch (error) {
            console.error('There was an error fetching the CMS!', error);
            setError(error || 'There was an error fetching the CMS!');
        }
    };

    const fetchCML = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/cml`);
            setCml(response.data);
        } catch (error) {
            console.error('There was an error fetching the CML!', error);
            setError(error || 'There was an error fetching the CML!');
        }
    };

    const fetchMSTS = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/msts`);
            setMSTS(response.data);
        } catch (error) {
            console.error('There was an error fetching the MSTS!', error);
            setError(error || 'There was an error fetching the MSTS!');
        }
    };

    const fetchCalifolink = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/cll`);
            setCalifolink(response.data);
        } catch (error) {
            console.error('There was an error fetching the Califolink!', error);
            setError(error || 'There was an error fetching the Califolink!');
        }
    }

    const festchSTL = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/starlink`);
            setStarlink(response.data);
        } catch (error) {
            console.error('There was an error fetching the STL!', error);
            setError(error || 'There was an error fetching the STL!');
        }
    }

    const fetchCCS = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/ccs`);
            setCcs(response.data);
        } catch (error) {
            console.error('There was an error fetching the CCS!', error);
            setError(error || 'There was an error fetching the CCS!');
        }
    }

    const fetchCSL = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/csl`);
            setCsl(response.data);
        } catch (error) {
            console.error('There was an error fetching the CSL!', error);
            setError(error || 'There was an error fetching the CSL!');
        }
    }

    const fetchMCM = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/mcm`);
            setMCM(response.data);
        } catch (error) {
            console.error('There was an error fetching the MCM!', error);
            setError(error || 'There was an error fetching the MCM!');
        }
    }

    const fetchCMA = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/cma`);
            setCMA(response.data);
        } catch (error) {
            console.error('There was an error fetching the CMA!', error);
            setError(error || 'There was an error fetching the CMA!');
        }
    }

    const fetchCSV = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/csv`);
            setCsv(response.data);
        } catch (error) {
            console.error('There was an error fetching the CSV!', error);
            setError(error || 'There was an error fetching the CSV!');
        }
    }

    const fetchCWS = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/cws`);
            setCWS(response.data);
        } catch (error) {
            console.error('There was an error fetching the CWS!', error);
            setError(error || 'There was an error fetching the CWS!');
        }
    }
    const fetchCES = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/ces`);
            setCES(response.data);
        } catch (error) {
            console.error('There was an error fetching the CES!', error);
            setError(error || 'There was an error fetching the CES!');
        }
    }

    const fetchCAL = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/cal`);
            setCAL(response.data);
        } catch (error) {
            console.error('There was an error fetching the CAL!', error);
            setError(error || 'There was an error fetching the CAL!');
        }
    }

    const fetchNVOCC = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/nvocc`);
            setNVOCC(response.data);
        } catch (error) {
            console.error('There was an error fetching the NVOCC!', error);
            setError(error || 'There was an error fetching the NVOCC!');
        }
    }

    const fetchCeymed = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/ceymed`);
            setCeymed(response.data);
        } catch (error) {
            console.error('There was an error fetching the Ceymed!', error);
            setError(error || 'There was an error fetching the Ceymed!');
        }
    }


    useEffect(() => {
        fetchTravels();
        fetchOceaneeds();
        fetchCMS();
        fetchCML();
        fetchMSTS();
        fetchCalifolink();
        festchSTL();
        fetchCCS();
        fetchCSL();
        fetchMCM();
        fetchCMA();
        fetchCSV();
        fetchCWS();
        fetchCES();
        fetchCAL();
        fetchNVOCC();
        fetchCeymed();   
    }, []);

    const companies = [
        { value: 'all', label: 'All Companies' },
        { value: 'oceaneeds', label: 'Oceaneeds' },
        { value: 'cms', label: 'CMS' },
        { value: 'cml', label: 'CML' },
        { value: 'cal', label: 'CAL Agency' },
        { value: 'nvocc', label: 'CAL NVOCC' },
        { value: 'ces', label: 'CES' },
        { value: 'califolink', label: 'Califolink' },
        { value: 'starlink', label: 'Starlink' },
        { value: 'msts', label: 'MSTS' },
        { value: 'ccs', label: 'CCS' },
        { value: 'cws', label: 'Warehouse' },
        { value: 'csv', label: 'Cargo Server' },
        { value: 'csl', label: 'Ceyline Shipping' },
        { value: 'mcm', label: 'Mercantile Marine' },
        { value: 'cma', label: 'CMA Ships' },
        { value: 'travels', label: 'CTL' },
        { value: 'che', label: 'Ceyemd' },
    ];

    const filterData = (data) => {
        return data.filter(item => {
            const companyMatch = selectedCompany === 'all' || selectedCompany === item.company;
            return companyMatch;
        });
    };

    

    return (
        <div className="company-list">
            {error && <p className="error">{error.message}</p>}

            <div className="filters">
                <select 
                    value={selectedCompany} 
                    onChange={(e) => setSelectedCompany(e.target.value)}
                >
                    {companies.map(company => (
                        <option key={company.value} value={company.value}>
                            {company.label}
                        </option>
                    ))}
                </select>
                
            </div>

            <section className="section">
                <h1 className="section-title">Ship Agency Services</h1>
                
                {(selectedCompany === 'all' || selectedCompany === 'oceaneeds') && (
                    <div className="subsection">
                    <h2 className="subsection-title">Oceaneeds</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>No. of Operations</th>
                                <th>No. of Quotations</th>
                                <th>No. of Confirmed Jobs</th>
                                <th>Success Rate</th>
                                <th>New Principles Tap/ Added</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {oceaneeds.map((oceaneed) => (
                                <tr key={oceaneed.id}>
                                    <td>{oceaneed.id}</td>
                                    <td>{oceaneed.no_of_operations}</td>
                                    <td>{oceaneed.no_of_quotations}</td>
                                    <td>{oceaneed.no_of_confirmed_jobs}</td>
                                    <td>{oceaneed.success_rate}</td>
                                    <td>{oceaneed.new_principles_tap_added}</td>
                                    <td>{oceaneed.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}

                {(selectedCompany === 'all' || selectedCompany === 'cms') && (
                     <div className='subsection'>
                    <h2 className='subsection-title'>CMS</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Launch Hires: From Casual Caller (Foreign)</th>
                                <th>Launch Hires: From Agent (Local)</th>
                                <th>Casual Caller Ops</th>
                                <th>Agency Network</th>
                                <th>New Principles Tap/ Added</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cms.map((cms) => (
                                <tr key={cms.id}>
                                    <td>{cms.id}</td>
                                    <td>{cms.foreign_hires}</td>
                                    <td>{cms.local}</td>
                                    <td>{cms.caller_ops}</td>
                                    <td>{cms.agency_network}</td>
                                    <td>{cms.new_principles_tap_added}</td>
                                    <td>{cms.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}

                {(selectedCompany === 'all' || selectedCompany === 'cml') && (
                      <div className="subsection">
                    <h2 className="subsection-title">CML</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Ship / Boat Management</th>
                                <th>Flag State Ops</th>
                                <th>P&I Endorsements</th>
                                <th>Oluwil Project Income</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cml.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.ship_boat}</td>
                                    <td>{item.flag_state}</td>
                                    <td>{item.endorsement}</td>
                                    <td>{item.oluwil}</td>
                                    <td>{item.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    
                    </div>
                )}

                {(selectedCompany === 'all' || selectedCompany === 'cal') && (
                    <div className="subsection">
                    <h2  className="subsection-title">CAL Agency</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Crew Change Total:</th>
                                <th>Casual Caller Ops:</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cal.map((cal) => (
                                <tr key={cal.id}>
                                    <td>{cal.id}</td>
                                    <td>{cal.crew_change}</td>
                                    <td>{cal.casual_caller_ops}</td>
                                    <td>{cal.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                )}


                {(selectedCompany === 'all' || selectedCompany === 'nvocc') && (
                     <div className="subsection">
                    <h2 className="subsection-title">CAL NVOCC </h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Loading TEU's</th>
                                <th>Discharging TEU's</th>
                                <th>Transhipment Handling TEU's</th>
                                <th>Liner DO TEU's</th>
                                <th>Export BL TEU's</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nvocc.map((nvocc) => (
                                <tr key={nvocc.id}>
                                    <td>{nvocc.id}</td>
                                    <td>{nvocc.loading}</td>
                                    <td>{nvocc.discharging}</td>
                                    <td>{nvocc.transhipment}</td>
                                    <td>{nvocc.liner}</td>
                                    <td>{nvocc.export}</td>
                                    <td>{nvocc.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}


                {(selectedCompany === 'all' || selectedCompany === 'ces') && (
                     <div className="subsection">
                    <h2 className="subsection-title">CES</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>CDL Dry Docking</th>
                                <th>Afloat repair jobs: -No. of Vessels</th>
                                <th>Afloat repair jobs: -No. of Jobs</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ces.map((ces) => (
                                <tr key={ces.id}>
                                    <td>{ces.id}</td>
                                    <td>{ces.cdl_dry_docking}</td>
                                    <td>{ces.no_of_vessels}</td>
                                    <td>{ces.no_of_jobs}</td>
                                    <td>{ces.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
                )}


            </section>


            <section className="section">
                <h1 className="section-title">Logistics & Supply Chain</h1>

                {(selectedCompany === 'all' || selectedCompany === 'califolink') && (
                    <div className="subsection">
                    <h2 className="subsection-title">Califolink</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Container Fleet</th>
                                <th>Container Onhire</th>
                                <th>Utilization Container</th>
                                <th>Machine Fleet</th>
                                <th>Machine Onhire</th>
                                <th>Utilization Machine</th>
                                <th>Transport Jobs</th>
                                <th>No of KM</th>
                                <th>Avg KM</th>
                                <th>TEU</th>
                                <th>Eco</th>
                                <th>Clearing</th>
                                <th>Fabrication</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {califolink.map((califolink) => (
                                <tr key={califolink.id}>
                                    <td>{califolink.id}</td>
                                    <td>{califolink.container_fleet}</td>
                                    <td>{califolink.container_onhire}</td>
                                    <td>{califolink.untilzation_container}</td>
                                    <td>{califolink.machine_fleet}</td>
                                    <td>{califolink.machine_onhire}</td>
                                    <td>{califolink.untilzation_machine}</td>
                                    <td>{califolink.transport_jobs}</td>
                                    <td>{califolink.no_of_km}</td>
                                    <td>{califolink.avg_km}</td>
                                    <td>{califolink.teu}</td>
                                    <td>{califolink.eco}</td>
                                    <td>{califolink.clearing}</td>
                                    <td>{califolink.fabrication}</td>
                                    <td>{califolink.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}


                {(selectedCompany === 'all' || selectedCompany === 'starlink') && (
                     <div className="subsection">
                    <h2 className="subsection-title">Starlink</h2>
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
                )}


                {(selectedCompany === 'all' || selectedCompany === 'msts') && (
                    <div className="subsection">
                    <h2 className="subsection-title">MSTS</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>PTI</th>
                                <th>Monitoring Days</th>
                                <th>Fleet</th>
                                <th>Owned/Rent</th>
                                <th>On Hire</th>
                                <th>Re-work</th>
                                <th>Survey</th>
                                <th>Reefer Spare</th>
                                <th>Vessel Spare</th>
                                <th>Reefer Repairs</th>
                                <th>Exports</th>
                                <th>Maldives</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {msts.map((msts) => (
                                <tr key={msts.id}>
                                    <td>{msts.id}</td>
                                    <td>{msts.pti}</td>
                                    <td>{msts.monitoring_days}</td>
                                    <td>{msts.fleet}</td>
                                    <td>{msts.owned_rent}</td>
                                    <td>{msts.on_hire}</td>
                                    <td>{msts.re_work}</td>
                                    <td>{msts.survey}</td>
                                    <td>{msts.reefer_spare}</td>
                                    <td>{msts.vessel_spare}</td>
                                    <td>{msts.reefer_repairs}</td>
                                    <td>{msts.exports}</td>
                                    <td>{msts.maldives}</td>
                                    <td>{msts.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}


                {(selectedCompany === 'all' || selectedCompany === 'ccs') && (
                     <div className="subsection">
                    <h2 className="subsection-title">CCS </h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Average Gate Movement (Per Day)</th>
                                <th>Average Storage -Laden (Per Day)</th>
                                <th>Average Storage -Empty (Per Day)</th>
                                <th>Average Refer Containers (Per Day)</th>
                                <th>Repairs (USD)</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ccs.map((ccs) => (
                                <tr key={ccs.id}>
                                    <td>{ccs.id}</td>
                                    <td>{ccs.gate_movement}</td>
                                    <td>{ccs.storage_laden}</td>
                                    <td>{ccs.storage_empty}</td>
                                    <td>{ccs.refer_container}</td>
                                    <td>{ccs.repairs_usd}</td>
                                    <td>{ccs.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}


                {(selectedCompany === 'all' || selectedCompany === 'cws') && (
                      <div className="subsection">
                        <h2 className="subsection-title">Warehouse </h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>WH 01- Capacity</th>
                                    <th>WH 01- Utilization</th>
                                    <th>WH 01- Utilization %n</th>
                                    <th>WH 02- Capacity</th>
                                    <th>WH 02- Utilization</th>
                                    <th>WH 02- Utilization %</th>
                                    <th>Value Added Services (LKR)</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cws.map((cws) => (
                                    <tr key={cws.id}>
                                        <td>{cws.id}</td>
                                        <td>{cws.wh01_capacity}</td>
                                        <td>{cws.wh01_utilization}</td>
                                        <td>{cws.wh01_utilization_percentage}</td>
                                        <td>{cws.wh02_capacity}</td>
                                        <td>{cws.wh02_utilization}</td>
                                        <td>{cws.wh02_utilization_percentage}</td>
                                        <td>{cws.value_added_services}</td>
                                        <td>{cws.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}



                {(selectedCompany === 'all' || selectedCompany === 'csv') && (
                     <div className="subsection">
                    <h2 className="subsection-title">Cargo Server</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Sea Freight TEU's</th>
                                <th>Air Frieght KGs</th>
                                <th>Logistics Jobs</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {csv.map((csv) => (
                                <tr key={csv.id}>
                                    <td>{csv.id}</td>
                                    <td>{csv.sea_freight}</td>
                                    <td>{csv.air_freight}</td>
                                    <td>{csv.logistics_job}</td>
                                    <td>{csv.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}


            </section>


            <section className="section">
                <h1 className="section-title">Shipping</h1>

                {(selectedCompany === 'all' || selectedCompany === 'csl') && (
                    <div className="subsection">
                    <h2 className="subsection-title">Shipping </h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Crew On Board</th>
                                <th>New Principals</th>
                                <th>Income per COB</th>
                                <th>Cost Per C.O.B</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {csl.map((csl) => (
                                <tr key={csl.id}>
                                    <td>{csl.id}</td>
                                    <td>{csl.crew_on_board}</td>
                                    <td>{csl.new_principals}</td>
                                    <td>{csl.income}</td>
                                    <td>{csl.cost}</td>
                                    <td>{csl.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}


                {(selectedCompany === 'all' || selectedCompany === 'mcm') && (
                    <div className="subsection">
                    <h2 className="subsection-title">Mercantile Marine</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Crew On Board</th>
                                <th>New Principals</th>
                                <th>Income per COB</th>
                                <th>Cost Per C.O.B</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mcm.map((mcm) => (
                                <tr key={mcm.id}>
                                    <td>{mcm.id}</td>
                                    <td>{mcm.crew_on_board}</td>
                                    <td>{mcm.new_principals}</td>
                                    <td>{mcm.income}</td>
                                    <td>{mcm.cost}</td>
                                    <td>{mcm.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}


                {(selectedCompany === 'all' || selectedCompany === 'cma') && (
                    <div className="subsection">
                    <h2 className="subsection-title">CMA Ships </h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Crew On Board</th>
                                <th>New Principals</th>
                                <th>Income per COB</th>
                                <th>Cost Per C.O.B</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cma.map((cma) => (
                                <tr key={cma.id}>
                                    <td>{cma.id}</td>
                                    <td>{cma.crew_on_board}</td>
                                    <td>{cma.new_principals}</td>
                                    <td>{cma.income}</td>
                                    <td>{cma.cost}</td>
                                    <td>{cma.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}

            </section>

            <section className="section">
                <h1 className="section-title">Other</h1>


                {(selectedCompany === 'all' || selectedCompany === 'travels') && (
                    <div className="subsection">
            <h2 className="subsection-title">CTL</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tickets: Seafarer</th>
                        <th>Tickets: FIT/ Corporate</th>
                        <th>Outbound</th>
                        <th>Inbound</th>
                        <th>Visa</th>
                        <th>Insurance</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {travels.map((travel) => (
                        <tr key={travel.id}>
                            <td>{travel.id}</td>
                            <td>{travel.tickets_Seafarer}</td>
                            <td>{travel.tickets_FIT_Corporate}</td>
                            <td>{travel.outbound}</td>
                            <td>{travel.inbound}</td>
                            <td>{travel.visa}</td>
                            <td>{travel.insurance}</td>
                            <td>{travel.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
                )}

                {(selectedCompany === 'all' || selectedCompany === 'che') && (
                    <div className="subsection">
                    <h2 className="subsection-title">Ceymed</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>No of Reports</th>
                                <th>No of Chanelling Patients</th>
                                <th>No of Cooperate Staff Medicals</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ceymed.map((item) => (
                                <tr key={item.id}>
                                    <td>CHE{item.id}</td>
                                    <td>{item.no_of_reports}</td>
                                    <td>{item.no_of_chanelling_patients}</td>
                                    <td>{item.no_of_cooperate_staff_medicals}</td>
                                    <td>{item.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}
            </section>
        </div>
    );
};

export default CompanyList;