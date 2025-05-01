import VoidFissuresCard from "../components/Cards/VoidFissuresCard";

function VoidFissuresPage() {
    return (
        <div className="bg-gray-950 text-white min-h-screen p-6">
            <div className="max-w-screen-xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">⚡ Active Void Fissures</h1>
                <VoidFissuresCard />
            </div>
        </div>
    );
}

export default VoidFissuresPage;