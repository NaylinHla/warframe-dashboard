import { useEffect, useState } from "react";
import dayjs from "dayjs";

type VoidTrader = {
    id: string;
    character: string;
    location: string;
    inventory: { item: string; ducats: number; credits: number }[];
    activation: string;
    expiry: string;
};

const VoidTraderCard = () => {
    const [trader, setTrader] = useState<VoidTrader | null>(null);
    const [countdown, setCountdown] = useState("");

    useEffect(() => {
        const fetchTrader = async () => {
            const res = await fetch("https://api.warframestat.us/pc/voidTrader");
            const data: VoidTrader = await res.json();
            setTrader(data);
        };

        fetchTrader();
        const interval = setInterval(fetchTrader, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            if (trader?.expiry) {
                const end = dayjs(trader.expiry);
                const now = dayjs();
                const diff = end.diff(now, "second");
                if (diff <= 0) {
                    setCountdown("Expired");
                } else {
                    const h = Math.floor(diff / 3600);
                    const m = Math.floor((diff % 3600) / 60);
                    const s = diff % 60;
                    setCountdown(`${h}h ${m}m ${s}s`);
                }
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [trader]);

    if (!trader) return <div>Loading Void Trader...</div>;

    return (
        <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg max-w-md">
            <h2 className="text-xl font-bold mb-2">🛒 Void Trader</h2>
            <p className="mb-2">📍 Location: {trader.location}</p>
            <p className="mb-4 text-sm text-gray-400">⏳ Leaves in: {countdown}</p>
            <div className="space-y-2">
                {trader.inventory.map((item, idx) => (
                    <div key={idx} className="bg-gray-800 p-2 rounded">
                        <p className="font-semibold">{item.item}</p>
                        <p className="text-sm text-gray-300">Ducats: {item.ducats} | Credits: {item.credits}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VoidTraderCard;
