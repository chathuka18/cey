
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Users/Login';
import AddTravel from './components/CTL/AddTravel';
import AddOceaneed from './components/Oceaneeds/AddOceaneed';
import ProtectedRoute from './components/Users/ProtectedRoute';
import AddCMS from './components/CMS/AddCMS';
import AddCML from './components/CML/AddCML';
import AddMSTS from './components/MSTS/AddMSTS';
import AddCalifolink from './components/CalifoLink/AddCalifolink';
import AddStarlink from './components/Starlink/AddStarlink';
import AddCCS from './components/Container/AddCCS';
import AddCSL from './components/Shipping/AddCSL';
import AddMCM from './components/Marine/AddMCM';
import AddCMA from './components/CMAships/AddCMA';
import AddCSV from './components/CSV/AddCSV';
import AddCWS from './components/Warehouse/AddCWS';
import AddCES from './components/CES/AddCES';
import AddCAL from './components/CAL Agency/AddCAL';
import AddNVOCC from './components/CAL NVOCC/AddNVOCC';
import Register from './components/Users/Register';
import Admin from './components/Users/Admin';
import CompanyList from './components/CompanyList/CompanyList';
import OceaneedsList from './components/Oceaneeds/OceaneedsList';
import Super from './components/SuperAdmin/Super';
import CALList from './components/CAL Agency/CALList';
import NVOCCList from './components/CAL NVOCC/NVOCCList';
import CalifolinkList from './components/CalifoLink/CalifolinkList';
import CESList from './components/CES/CESList';
import CMAList from './components/CMAships/CMAList';
import CMSList from './components/CMS/CMSList';
import CMLList from './components/CML/CMLList';
import CCSList from './components/Container/CCSList';
import CSVList from './components/CSV/CSVList';
import TravelList from './components/CTL/TravelList';
import MCMList from './components/Marine/MCMList';
import MSTSList from './components/MSTS/MSTSList';
import StarlinkList from './components/Starlink/StarlinkList';
import CSLList from './components/Shipping/CSLList';
import CWSList from './components/Warehouse/CWSList';
import AddCeymed from './components/Ceymed/AddCeymed';
import CeymedList from './components/Ceymed/CeymedList';
import Navbar from './components/Navbar';
import UpdateOceaneed from './components/Oceaneeds/UpdateOceaneed';
import UpdateCeymed from './components/Ceymed/UpdateCeymed'
import UpdateCML from './components/CML/UpdateCML'
import UpdateCSL from './components/Shipping/UpdateCSL'
import UpdateMSTS from './components/MSTS/UpdateMSTS'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        </Routes>
        <Navbar />
        
        <Routes>
        <Route 
          path="/companylist" 
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <CompanyList />
            </ProtectedRoute>
          } 
         /> 

        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <Admin />
            </ProtectedRoute>
          } 
         />
         <Route 
          path="/register" 
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <Register />
            </ProtectedRoute>
          } 
         />

        <Route 
          exact path="/ctl" 
          element={
            <ProtectedRoute allowedRoles={['CTL']}>
              <AddTravel />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/onl" 
          element={
            <ProtectedRoute allowedRoles={['ONL']}>
              < AddOceaneed />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/cms" 
          element={
            <ProtectedRoute allowedRoles={['CMS']}>
              <AddCMS />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/cml" 
          element={
            <ProtectedRoute allowedRoles={['CML']}>
              <AddCML />
            </ProtectedRoute>
          } 
        />
        <Route 
        path="/msts" 
        element={
          <ProtectedRoute allowedRoles={['MSTS']}>
              <AddMSTS />
            </ProtectedRoute>
        } />
        <Route 
        path="/cll" 
        element={
          <ProtectedRoute allowedRoles={['CLL']}>
              <AddCalifolink />
            </ProtectedRoute>
        } />
        <Route 
        path="/stl" 
        element={
          <ProtectedRoute allowedRoles={['STL']}>
              <AddStarlink />
            </ProtectedRoute>
        } />
        <Route
          path="/ccs"
          element={
            <ProtectedRoute allowedRoles={['CCS']}>
              <AddCCS />
            </ProtectedRoute>
          }
        />
        <Route
          path="/csl"
          element={
            <ProtectedRoute allowedRoles={['CSL']}>
              <AddCSL />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mcm"
          element={
            <ProtectedRoute allowedRoles={['MCM']}>
              <AddMCM />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cma"
          element={
            <ProtectedRoute allowedRoles={['CMA']}>
              <AddCMA />
            </ProtectedRoute>
          }
        />
        <Route
          path="/csv"
          element={
            <ProtectedRoute allowedRoles={['CSV']}>
              <AddCSV />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cws"
          element={
            <ProtectedRoute allowedRoles={['CWS']}>
              <AddCWS />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ces"
          element={
            <ProtectedRoute allowedRoles={['CES']}>
              <AddCES />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cal"
          element={
            <ProtectedRoute allowedRoles={['CAL']}>
              <AddCAL />
            </ProtectedRoute>
          }
        />
        <Route
          path="/nvocc"
          element={
            <ProtectedRoute allowedRoles={['NVOCC']}>
              <AddNVOCC />
            </ProtectedRoute>
          }
        />
        <Route
          path="/che"
          element={
            <ProtectedRoute allowedRoles={['CHE']}>
              <AddCeymed />
            </ProtectedRoute>
          }
        />



        <Route
          path="/oceanlist"
          element={
            <ProtectedRoute allowedRoles={['SUPER']}>
              <OceaneedsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/super"
          element={
            <ProtectedRoute allowedRoles={['SUPER']}>
              <Super />
            </ProtectedRoute>
          }
        />
        <Route
          path="/callist"
          element={
            <ProtectedRoute allowedRoles={['SUPER']}>
              <CALList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/nvocclist"
          element={
            <ProtectedRoute allowedRoles={['SUPER']}>
              <NVOCCList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/califolist"
          element={
            <ProtectedRoute allowedRoles={['SUPER']}>
              <CalifolinkList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ceslist"
          element={
            <ProtectedRoute allowedRoles={['SUPER']}>
              <CESList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cmalist"
          element={
            <ProtectedRoute allowedRoles={['SUPER']}>
              <CMAList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cmslist"
          element={
            <ProtectedRoute allowedRoles={['SUPER']}>
              <CMSList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cmllist"
          element={
            <ProtectedRoute allowedRoles={['SUPER']}>
              <CMLList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ccslist"
          element={
            <ProtectedRoute allowedRoles={['SUPER']}>
              <CCSList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/csvlist"
          element={
            <ProtectedRoute allowedRoles={['SUPER']}>
              <CSVList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ctllist"
          element={
            <ProtectedRoute allowedRoles={['SUPER']}>
              <TravelList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mcmlist"
          element={
            <ProtectedRoute allowedRoles={['SUPER']}>
              <MCMList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mstslist"
          element={
            <ProtectedRoute allowedRoles={['SUPER']}>
              <MSTSList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/starlist"
          element={
            <ProtectedRoute allowedRoles={['SUPER']}>
              <StarlinkList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/csllist"
          element={
            <ProtectedRoute allowedRoles={['SUPER']}>
              <CSLList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cwslist"
          element={
            <ProtectedRoute allowedRoles={['SUPER']}>
              <CWSList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chelist"
          element={
            <ProtectedRoute allowedRoles={['SUPER']}>
              <CeymedList />
            </ProtectedRoute>
          }
        />

        <Route
        path='onlUpdate'
        element={
          <ProtectedRoute allowedRoles={['onlUpdate']}>
            <UpdateOceaneed />
          </ProtectedRoute>
        }
        />
        <Route
        path='cheUpdate'
        element={
          <ProtectedRoute allowedRoles={['cheUpdate']}>
            <UpdateCeymed />
          </ProtectedRoute>
        }
        />
        <Route
        path='cmlUpdate'
        element={
          <ProtectedRoute allowedRoles={['cmlUpdate']}>
            <UpdateCML />
          </ProtectedRoute>
        }
        />
        <Route
        path='cslUpdate'
        element={
          <ProtectedRoute allowedRoles={['cslUpdate']}>
            <UpdateCSL />
          </ProtectedRoute>
        }
        />
        <Route
        path='mstsUpdate'
        element={
          <ProtectedRoute allowedRoles={['mstsUpdate']}>
            <UpdateMSTS />
          </ProtectedRoute>
        }
        />
        
      
       
      </Routes>
    </Router>
  );
};

export default App;