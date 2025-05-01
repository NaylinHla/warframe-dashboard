import {CetusStatusCard} from "../components/Cards/CetusStatusCard";
import {CambionDriftCard} from "../components/Cards/CambionDriftCard";
import {OrbVallisCard} from "../components/Cards/OrbVallisCard";
import SortieCard from "../components/Cards/SortieCard";
import VoidTraderCard from "../components/Cards/VoidTraderCard";
import NewsCard from "../components/Cards/NewsCard";
import EventsCard from "../components/Cards/EventsCard";

function Dashboard() {
    return (
        <div className="bg-gray-950 text-white min-h-screen w-full">
            <main className="p-6 max-w-screen-2xl mx-auto">
                <div className="flex flex-col xl:flex-row gap-8 items-start">
                    {/* Open World */}
                    <div className="flex-1 space-y-6 max-w-sm">
                        <h2 className="text-xl font-bold">🌍 Open World Cycles</h2>
                        <CetusStatusCard />
                        <OrbVallisCard />
                        <CambionDriftCard />
                    </div>

                    {/* Rotating Activities */}
                    <div className="flex-1 space-y-6 max-w-md">
                        <h2 className="text-xl font-bold">🌀 Rotating Activities</h2>
                        <SortieCard />
                    </div>

                    {/* Events & News */}
                    <div className="flex-1 space-y-6 max-w-md">
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

export default Dashboard;
