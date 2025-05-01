import Navbar from "./components/NavBar.tsx";
import { CetusStatusCard } from "./pages/CetusStatusCard.tsx";
import { CambionDriftCard } from "./pages/CambionDriftCard.tsx";
import { OrbVallisCard } from "./pages/OrbVallisCard.tsx";
import VoidFissuresCard from "./pages/VoidFissuresCard.tsx";
import SortieCard from "./pages/SortieCard.tsx";
import VoidTraderCard from "./pages/VoidTraderCard.tsx";
import NewsCard from "./pages/NewsCard.tsx";
import EventsCard from "./pages/EventsCard.tsx";

function App() {
    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <Navbar />
            <main className="p-6 max-w-screen-xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Left Column: Open World Cycles */}
                    <div className="flex-1 space-y-6">
                        <h2 className="text-xl font-bold">🌍 Open World Cycles</h2>
                        <CetusStatusCard />
                        <OrbVallisCard />
                        <CambionDriftCard />
                    </div>

                    {/* Middle Column: Rotating Activities (stretch vertically) */}
                    <div className="flex-1 flex flex-col h-full gap-6">
                        <h2 className="text-xl font-bold">🌀 Rotating Activities</h2>
                        <SortieCard />
                        <div className="flex-grow">
                            <VoidFissuresCard />
                        </div>
                    </div>

                    {/* Right Column: Global Events & News */}
                    <div className="flex-1 space-y-6">
                        <h2 className="text-xl font-bold">📣 Global Events & News</h2>
                        <VoidTraderCard />
                        <EventsCard />
                        <NewsCard />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
