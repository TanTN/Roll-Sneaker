import './App.css';
import { Routes, Route, Navigate } from 'react-router';
import { Fragment, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setMobile } from '@/store/reducerStore';
import pluginRouters from './routers';
import LayoutDefault from './layout/layoutDefault';

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

                    return <Route key={index} path={route.path} element={<Layout>{Page}</Layout>} />;
                })}
            </Routes>
        </div>
    );
}

export default App;
