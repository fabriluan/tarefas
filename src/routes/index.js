import { Routes, Route, BrowserRouter} from 'react-router-dom';

import Admin from '../pages/Admin';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Private from './Private';

function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Home/> } />
                <Route path='/register' element={ <Register/> } />
                <Route path='/admin' element={ <Private> <Admin/> </Private> } />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;