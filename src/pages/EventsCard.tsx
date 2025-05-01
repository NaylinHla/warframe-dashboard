import { useEffect, useState } from "react";
import dayjs from "dayjs";

type Event = {
    id: string;
    description: string;
    tooltip: string;
    expiry: string;
};

const EventsCard = () => {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const res = await fetch("https://api.warframestat.us/pc/events");
            const data: Event[] = await res.json();
            setEvents(data);
        };

        fetchEvents();
    }, []);

    return (
        <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg max-w-md">
            <h2 className="text-xl font-bold mb-4">🎉 Events</h2>
            <ul className="space-y-2">
                {events.map((event) => (
                    <li key={event.id} className="bg-gray-800 p-2 rounded">
                        <p className="font-semibold">{event.tooltip}</p>
                        <p className="text-sm">{event.description}</p>
                        <p className="text-xs text-gray-400">⏳ Ends: {dayjs(event.expiry).format("YYYY-MM-DD HH:mm:ss")}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventsCard;
