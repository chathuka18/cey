import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TravelList from '../CTL/TravelList';
import OceaneedsList from '../Oceaneeds/OceaneedsList';
import CMSList from '../CMS/CMSList';
import CMLList from '../CML/CMLList';
import MSTSList from '../MSTS/MSTSList';
import CalifolinkList from '../CalifoLink/CalifolinkList';
import StarlinkList from '../Starlink/StarlinkList';
import CCSList from '../Container/CCSList';
import CSLList from '../Shipping/CSLList';
import MCMList from '../Marine/MCMList';
import CMAList from '../CMAships/CMAList';
import CSVList from '../CSV/CSVList';
import CWSList from '../Warehouse/CWSList';
import CESList from '../CES/CESList';
import CALList from '../CAL Agency/CALList';
import NVOCCList from '../CAL NVOCC/NVOCCList';

const AdminPage = () => {
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

    return (
        <div className="admin-page">
            {error && <p className="error">{error.message}</p>}
            <TravelList travels={travels} />
            <OceaneedsList oceaneeds={oceaneeds} />
            <CMSList cms={cms} />
            <CMLList cml={cml} />
            <MSTSList msts={msts} /> 
            <CalifolinkList califolink={califolink} />   
            <StarlinkList starlink={starlink} />
            <CCSList ccs={ccs} />
            <CSLList csl={csl} />
            <MCMList mcm={mcm} />
            <CMAList cma={cma} />
            <CSVList csv={csv} />
            <CWSList cws={cws} />
            <CESList ces={ces} />
            <CALList cal={cal} />
            <NVOCCList nvocc={nvocc} />
            <CeymedList ceymed={ceymed} />
        </div>
    );
};

export default AdminPage;
