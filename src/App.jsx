import { BrowserRouter, Routes, Route} from "react-router-dom";

import MainLayout from "./components/MainLayout"
import Home from "./pages/Home"
import CareGuide from "./pages/CareGuide";
import NotFound from "./pages/NotFound";


function App() {

  return(

    <BrowserRouter>

      <MainLayout>

        <Routes>

          <Route path="/" element= {<Home />}/>
          <Route path="/care/:code" element= {<CareGuide />}/>
          <Route path="*" element={<NotFound />} />
        
        </Routes>

      </MainLayout>
      
    </BrowserRouter>
  

  )
}


export default App
