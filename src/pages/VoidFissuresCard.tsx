import { useEffect, useState } from "react";
import dayjs from "dayjs";

type VoidFissure = {
    id: string;
    node: string;
    missionType: string;
    tier: string;
    tierNum: number;
    enemy: string;
    expiry: string;
    expired: boolean;
    isStorm: boolean;
};

type FissureWithCountdown = VoidFissure & { countdown: string };

const VoidFissuresCard = () => {
    const [fissures, setFissures] = useState<FissureWithCountdown[]>([]);

    const fetchFissures = async () => {
        try {
            const res = await fetch('https://api.warframestat.us/pc/fissures');
            const data: VoidFissure[] = await res.json();
            const activeFissures = data.filter(f => !f.expired);
            const withCountdown = activeFissures.map(f => ({
                ...f,
                countdown: calculateCountdown(f.expiry),
            }));
            setFissures(withCountdown);
        } catch (error) {
            console.error("Failed to fetch fissures:", error);
        }
    };

    const calculateCountdown = (expiry: string) => {
        const now = dayjs();
        const end = dayjs(expiry);
        const diff = end.diff(now, 'second');
        if (diff <= 0) return "Expired";

        const mins = Math.floor(diff / 60);
        const secs = diff % 60;
        return `${mins}m ${secs}s`;
    };

    useEffect(() => {
        fetchFissures();
        const fetchInterval = setInterval(fetchFissures, 60000); // Refresh data every 60s

        const countdownInterval = setInterval(() => {
            setFissures(prev =>
                prev.map(f => ({
                    ...f,
                    countdown: calculateCountdown(f.expiry),
                }))
            );
        }, 1000); // Update countdown every second

        return () => {
            clearInterval(fetchInterval);
            clearInterval(countdownInterval);
        };
    }, []);

    if (fissures.length === 0) return <div>Loading void fissures...</div>;

    return (
        <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">🌌 Active Void Fissures</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {fissures.map((fissure) => (
                    <div
                        key={fissure.id}
                        className="bg-gray-800 p-3 rounded-lg border border-gray-700 flex flex-col justify-between min-h-[160px]"
                    >
                        <h3 className="text-md font-semibold">{fissure.node}</h3>
                        <div className="text-sm mt-1">
                            <p>🧬 {fissure.missionType}</p>
                            <p>🏆 {fissure.tier}</p>
                            <p>☠️ {fissure.enemy}</p>
                            {fissure.isStorm && <p className="text-yellow-400">⚡ Void Storm</p>}
                            <p className="text-gray-400 mt-1">⏳ {fissure.countdown}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VoidFissuresCard;
