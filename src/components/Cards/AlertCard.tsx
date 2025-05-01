import { useEffect, useState } from "react";

type Alerts = {
    id: string;
    activation: string;
    expiry: string;
    startString: string;
    active: boolean;
    mission: {
        reward: {
            countedItems: {
                count: number;
                type: string;
            }[];
            thumbnail: string;
            color: number;
            credits: number;
            asString: string;
            items: string[];
            itemString: string;
        };
        node: string;
        nodeKey: string;
        faction: string;
        factionKey: string;
        maxEnemyLevel: number;
        minEnemyLevel: number;
        maxWaveNum: number;
        type: string;
        typeKey: string;
        nightmare: boolean;
        archwingRequired: boolean;
        isSharkwing: boolean;
        enemySpec: string;
        levelOverride: string;
        advancedSpawners: string[];
        requiredItems: string[];
        consumeRequiredItems: boolean;
        leadersAlwaysAllowed: boolean;
        levelAuras: string[];
        description: string;
    };
    expired: boolean;
    eta: string;
    rewardTypes: string[];
};

const AlertCard = () => {
    const [alerts, setAlerts] = useState<Alerts[]>([]);

    const fetchAlerts = async () => {
        try {
            const res = await fetch('https://api.warframestat.us/pc/alerts');
            const data = await res.json();
            setAlerts(data);
        } catch (error) {
            console.error("Failed to fetch alerts:", error);
        }
    };

    useEffect(() => {
        fetchAlerts();
        const interval = setInterval(fetchAlerts, 60000);
        return () => clearInterval(interval);
    }, []);

    if (alerts.length === 0) return <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg max-w-sm">Alerts: None right now</div>;

    return (
        <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg max-w-md">
            <h2 className="text-xl font-bold mb-4">🚨 Active Alerts</h2>
            {alerts.map((alert) => (
                <div
                    key={alert.id}
                    className="bg-gray-800 p-3 rounded-lg mb-4 border border-gray-700"
                >
                    <h3 className="text-lg font-semibold">{alert.mission.node}</h3>
                    <p className="text-sm text-gray-400">{alert.mission.description}</p>
                    <div className="mt-2 text-sm">
                        <p>🧬 Type: {alert.mission.type}</p>
                        <p>☠️ Faction: {alert.mission.faction}</p>
                        <p>🎯 Level: {alert.mission.minEnemyLevel}-{alert.mission.maxEnemyLevel}</p>
                        <p>💰 Reward: {alert.mission.reward.itemString || "None"} ({alert.mission.reward.credits} credits)</p>
                        <p className="text-gray-400 mt-1">⏳ Time left: {alert.eta}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AlertCard;
