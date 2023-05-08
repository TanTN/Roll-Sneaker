import './App.css';
import { Routes, Route, Navigate } from 'react-router';
import { Fragment, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setMobile } from './redux/reducer';
import Main from './page/Main';
import pluginRouters from './routers/routers';
import LayoutDefault from './layout/layoutDefault/LayouDefault';

function App() {
    const [isMobile, setIsMobile] = useState(true);
    const [widthDisplay, setWidthDisplay] = useState(undefined);
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.store.isLogin);

    useEffect(() => {
        setWidthDisplay(window.innerWidth);
        setIsMobile(widthDisplay < 768);
        dispatch(setMobile(isMobile));
        const handleWidthDp = () => {
            setWidthDisplay(window.innerWidth);
            setIsMobile(widthDisplay < 768);
            dispatch(setMobile(isMobile));
        };

        window.addEventListener('resize', handleWidthDp);
        return () => window.removeEventListener('resize', handleWidthDp);
    }, [widthDisplay]);
    return (
        <div className="">
            <Routes>
                {pluginRouters.map((route, index) => {
                    let Layout = LayoutDefault;
                    let Page = isLogin ? <route.component /> : <Navigate replace to='/login'/>;
                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }
                    if (route.path === '/login') {
                      Page = <route.component />
                    }
                    if (route.path === '/register') {
                      Page = <route.component />
                    }
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    {Page}
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </div>
    );
}

export default App;
