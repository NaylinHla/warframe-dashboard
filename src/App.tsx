import Navbar from "./components/NavBar.tsx";
import {CetusStatusCard} from "./pages/CetusStatusCard.tsx";
import {CambionDriftCard} from "./pages/CambionDriftCard.tsx";
import {OrbVallisCard} from "./pages/OrbVallisCard.tsx";

function App() {
    return (
        <div className="min-h-screen min-w-screen">
            <Navbar />
            <main className="p-6 flex-grow">
                <div className="mb-5">
                    <CetusStatusCard />
                </div>
                <div className="mb-5">
                    <OrbVallisCard />
                </div>
                <div className="mb-5">
                    <CambionDriftCard />
                </div>
            </main>
        </div>
    );
}


export default App;