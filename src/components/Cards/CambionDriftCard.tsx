import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

type CambionCycle = {
    id: string;
    expiry: string;
    activation: string;
    active: 'fass' | 'vome';
};

export const CambionDriftCard = () => {
    const [cycle, setCycle] = useState<CambionCycle | null>(null);
    const [countdown, setCountdown] = useState<string>('');

    const fetchCambionCycle = async () => {
        const res = await fetch('https://api.warframestat.us/pc/cambionCycle');
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
                fetchCambionCycle();
                return;
            }

            const mins = Math.floor(diff / 60);
            const secs = diff % 60;
            setCountdown(`${mins}m ${secs}s`);
        }, 1000);
    };

    useEffect(() => {
        fetchCambionCycle();
        const refetchInterval = setInterval(fetchCambionCycle, 60000);
        return () => clearInterval(refetchInterval);
    }, []);

    if (!cycle) return <div>Loading Cambion Drift status...</div>;

    const nextPhase = cycle.active === 'fass' ? 'Vome' : 'Fass';
    const nextPhaseColor = nextPhase === 'Vome' ? 'text-blue-400' : 'text-orange-400';

    return (
        <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg max-w-sm">
            <h2 className="text-xl font-bold mb-2">🩸 Cambion Drift Status</h2>
            <p className="text-lg">
                It is currently{' '}
                <span className={cycle.active === 'fass' ? 'text-orange-400' : 'text-blue-400'}>
                    {cycle.active.charAt(0).toUpperCase() + cycle.active.slice(1)}
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
