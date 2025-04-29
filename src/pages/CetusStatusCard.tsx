import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

type CetusCycle = {
    id: string;
    expiry: string;
    isDay: boolean;
};

export const CetusStatusCard = () => {
    const [cycle, setCycle] = useState<CetusCycle | null>(null);
    const [countdown, setCountdown] = useState<string>('');

    const fetchCetusCycle = async () => {
        const res = await fetch('https://api.warframestat.us/pc/cetusCycle');
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
                fetchCetusCycle();
                return;
            }

            const mins = Math.floor(diff / 60);
            const secs = diff % 60;
            setCountdown(`${mins}m ${secs}s`);
        }, 1000);
    };

    useEffect(() => {
        fetchCetusCycle();
        const refetchInterval = setInterval(fetchCetusCycle, 60000);
        return () => clearInterval(refetchInterval);
    }, []);

    if (!cycle) return <div>Loading Cetus status...</div>;

    const nextPhase = cycle.isDay ? 'Night' : 'Day';
    const nextPhaseColor = cycle.isDay ? 'text-purple-400' : 'text-yellow-400';

    return (
        <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg max-w-sm">
            <h2 className="text-xl font-bold mb-2">🌍 Cetus Status</h2>
            <p className="text-lg">
                It is currently{' '}
                <span className={cycle.isDay ? 'text-yellow-400' : 'text-purple-400'}>
                    {cycle.isDay ? 'Day' : 'Night'}
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
