
import './App.css'
import { Provider } from 'react-redux';
import store from './Redux/store'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import Restaurants from './components/Restaurants/Restaurants'
import Login from './components/Login/Login'
import Notfound from './components/Not-found/Notfound'
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Signup from './components/Signup/Signup'
import { QueryClient, QueryClientProvider } from 'react-query';
import ResDetails from './components/RestaurantDetails/ResDetails';
import ProDetails from './components/ProductDetails/ProDetails';
import ProtectedRoute from './components/Protect/Protect';




const router= createHashRouter([
  {path:'/' ,element: <Layout/>,children:[
  {path:'',element: <Signup/> },
  {path:'signup',element: <Signup/>},
  {path:'home',element:(<ProtectedRoute><Home/></ProtectedRoute>)},
  {path:'restaurants',element:(<ProtectedRoute><Restaurants/></ProtectedRoute>) },
  {path:'products',element:(<ProtectedRoute><Products/></ProtectedRoute>)},
  {path:'restaurantdetails/:id',element:(<ProtectedRoute><ResDetails /></ProtectedRoute>)},
  {path:'productdetails/:id',element:(<ProtectedRoute><ProDetails /></ProtectedRoute>)},
  {path:'login',element:<Login/> },
  {path:'*',element:(<ProtectedRoute><Notfound/></ProtectedRoute>) }
  ]},
]);
function App() {
  let clientQuery =new QueryClient();
  return (
    <>
    <QueryClientProvider client={clientQuery} >
        <Provider store={store}>
        <RouterProvider router={router}/>  
      </Provider>
      </QueryClientProvider>
    </>
  )
}

export default App
