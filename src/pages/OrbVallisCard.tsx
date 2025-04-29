import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

type VallisCycle = {
    id: string;
    expiry: string;
    activation: string;
    isWarm: boolean;
};

export const OrbVallisCard = () => {
    const [cycle, setCycle] = useState<VallisCycle | null>(null);
    const [countdown, setCountdown] = useState<string>('');

    const fetchOrbVallisCycle = async () => {
        const res = await fetch('https://api.warframestat.us/pc/vallisCycle');
        const data = await res.json();
        setCycle(data);
        updateCountdown(data.expiry);
    };

    const updateCountdown = (expiry: string) => {
        const interval = setInterval(() => {
            const now = dayjs();
            const end = dayjs(expiry);
            const diff = end.diff(now, 'second');

            if (diff <= 0) {
                clearInterval(interval);
                setCountdown('Refreshing...');
                fetchOrbVallisCycle();
                return;
            }

            const mins = Math.floor(diff / 60);
            const secs = diff % 60;
            setCountdown(`${mins}m ${secs}s`);
        }, 1000);
    };

    useEffect(() => {
        fetchOrbVallisCycle();
        const refetchInterval = setInterval(fetchOrbVallisCycle, 60000);
        return () => clearInterval(refetchInterval);
    }, []);

    if (!cycle) return <div>Loading Orb Vallis status...</div>;

    const nextPhase = cycle.isWarm ? 'Cold' : 'Warm';
    const nextPhaseColor = nextPhase === 'Cold' ? 'text-blue-400' : 'text-orange-400';

    return (
        <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg max-w-sm">
            <h2 className="text-xl font-bold mb-2">❄️ Orb Vallis Status</h2>
            <p className="text-lg">
                It is currently{' '}
                <span className={cycle.isWarm ? 'text-orange-400' : 'text-blue-400'}>
                    {cycle.isWarm ? 'Warm' : 'Cold'}
                </span>
                .
            </p>
            <p className="mt-2">
                ⏳ Time until{' '}
                <span className={nextPhaseColor}>
                    {nextPhase}
                </span>: {countdown}
            </p>
            <p className="text-sm text-gray-400 mt-1">
                Next cycle at: {dayjs(cycle.expiry).format('HH:mm:ss')}
            </p>
        </div>
    );
};
