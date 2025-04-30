import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";

type SortieVariant = {
    missionType: string;
    modifier: string;
    modifierDescription: string;
    node: string;
};

type Sortie = {
    id: string;
    boss: string;
    faction: string;
    eta: string;
    started: boolean;
    variants: SortieVariant[];
    expiry: string;
};

const SortieCard = () => {
    const [sortie, setSortie] = useState<Sortie | null>(null);
    const [countdown, setCountdown] = useState<string>("");
    const expiryRef = useRef<string | null>(null);

    const fetchSortie = async () => {
        try {
            const res = await fetch('https://api.warframestat.us/pc/sortie');
            const data: Sortie = await res.json();
            setSortie(data);
            expiryRef.current = data.expiry;
        } catch (error) {
            console.error("Failed to fetch sortie:", error);
        }
    };

    const calculateCountdown = (expiry: string) => {
        const now = dayjs();
        const end = dayjs(expiry);
        const diff = end.diff(now, 'second');
        if (diff <= 0) return "Expired";

        const hours = Math.floor(diff / 3600);
        const mins = Math.floor((diff % 3600) / 60);
        const secs = diff % 60;

        return `${hours}h ${mins}m ${secs}s`;
    };

    useEffect(() => {
        fetchSortie(); // Initial fetch

        const fetchInterval = setInterval(fetchSortie, 60000); // Refresh every 60s

        const countdownInterval = setInterval(() => {
            if (expiryRef.current) {
                setCountdown(calculateCountdown(expiryRef.current));
            }
        }, 1000); // Update countdown every second

        return () => {
            clearInterval(fetchInterval);
            clearInterval(countdownInterval);
        };
    }, []); // ← only run on mount

    if (!sortie) return <div>Loading sortie...</div>;

    return (
        <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg max-w-md">
            <h2 className="text-xl font-bold mb-4">🔥 Today's Sortie</h2>
            <p className="mb-2 text-sm text-gray-300">
                👑 Boss: <span className="text-white">{sortie.boss}</span>
            </p>
            <p className="mb-4 text-sm text-gray-300">
                ☠️ Faction: <span className="text-white">{sortie.faction}</span>
            </p>

            <div className="space-y-3">
                {sortie.variants.map((variant, idx) => (
                    <div
                        key={idx}
                        className="bg-gray-800 p-3 rounded-lg border border-gray-700 text-sm"
                    >
                        <p className="font-semibold">{variant.missionType}</p>
                        <p>📍 {variant.node}</p>
                        <p>⚠️ {variant.modifier}</p>
                        <p className="text-gray-400">{variant.modifierDescription}</p>
                    </div>
                ))}
            </div>

            <p className="mt-4 text-gray-400 text-sm">⏳ Time remaining: {countdown}</p>
        </div>
    );
};

export default SortieCard;
