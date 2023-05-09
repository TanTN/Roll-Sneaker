import './App.css';
import { Routes, Route, Navigate } from 'react-router';
import { Fragment, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setMobile } from './redux/reducer';
import pluginRouters from './routers/routers';
import LayoutDefault from './layout/layoutDefault/LayouDefault';

function App() {
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.store.isLogin);
    const user = useSelector(state => state.store.userCurrent)
    
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
        <div className="">
            <Routes>
                {pluginRouters.map((route, index) => {
                    let Layout = LayoutDefault;
                    let Page = isLogin ? <route.component /> : <Navigate replace to='/'/>;
                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }
                    if (route.path === '/' && !isLogin) {
                      Page = <route.component />
                    } 
                    if (route.path === '/' && isLogin) {

                      Page = <Navigate replace to={`/main/${user.username}`}/>
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
