import { useEffect, useState } from "react";

type NewsItem = {
    id: string;
    message: string;
    link: string;
    date: string;
};

const NewsCard = () => {
    const [news, setNews] = useState<NewsItem[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            const res = await fetch("https://api.warframestat.us/pc/news");
            const data: NewsItem[] = await res.json();
            setNews(data);
        };

        fetchNews();
    }, []);

    return (
        <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg max-w-md">
            <h2 className="text-xl font-bold mb-4">📰 Warframe News</h2>
            <ul className="space-y-2">
                {news.slice(0, 5).map((item) => (
                    <li key={item.id} className="bg-gray-800 p-2 rounded">
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                            {item.message}
                        </a>
                        <p className="text-xs text-gray-400">{new Date(item.date).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsCard;
