import './App.css';
import { Routes, Route, Navigate } from 'react-router';
import { Fragment, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setMobile } from './redux/reducer';
import pluginRouters from './routers/routers';  
import LayoutDefault from './layout/layoutDefault/LayouDefault';
import Main from './page/main/Main';
import DetailProduct from './page/detaiilProduct/DetailProduct';


function App() {
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.store.isLogin);

    const [widthDisplay, setWidthDisplay] = useState(undefined);

    useEffect(() => {
        setWidthDisplay(window.innerWidth);
        dispatch(setMobile(widthDisplay < 1024));
        const handleWidthDp = () => {
            setWidthDisplay(window.innerWidth);
            dispatch(setMobile(widthDisplay < 1024));
        };

        window.addEventListener('resize', handleWidthDp);
        return () => window.removeEventListener('resize', handleWidthDp);
    }, [widthDisplay]);

    return (
        <div className="scroll-smooth">
                <Routes>
                    
                    {pluginRouters.map((route, index) => {
                        let Layout = LayoutDefault;
                        let Page = <route.component />;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        if (route.path === 'user/:user' && !isLogin) {
                            Page = <Navigate replace to="/" />;
                        }
    
                        return <Route key={index} path={route.path} element={<Layout>{Page}</Layout>} />;
                    })}
                </Routes>
        </div>
    );
}

export default App;
