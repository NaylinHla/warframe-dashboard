const TierList = () => {
    return (
        <main className="p-6 max-w-screen-xl mx-auto text-white">
            <h1 className="text-3xl font-bold mb-6">
                📊 Tier List (AI GENERATED RESULTS)
            </h1>

            {/* Warframes */}
            <section className="bg-gray-900 rounded-xl p-4 shadow-md mb-6">
                <h2 className="text-2xl font-semibold mb-4">🧍 Warframes</h2>
                <div>
                    {[
                        { tier: "S Tier", color: "text-yellow-400", frames: "Wisp, Revenant, Octavia, Protea, Mesa, Khora, Hildryn Prime" },
                        { tier: "A Tier", color: "text-yellow-300", frames: "Rhino, Saryn, Gara, Nidus, Volt, Nezha, Equinox, Trinity" },
                        { tier: "B Tier", color: "text-yellow-200", frames: "Frost, Ember, Banshee, Mirage, Loki, Mag, Nova" }
                    ].map((t, idx) => (
                        <div key={idx} className="p-1">
                            <div className="bg-gray-800 rounded-xl p-4 shadow-md">
                                <h3 className={`text-xl font-bold ${t.color}`}>{t.tier}</h3>
                                <p className="text-gray-300">{t.frames}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Primary Weapons */}
            <section className="bg-gray-900 rounded-xl p-4 shadow-md mb-6">
                <h2 className="text-2xl font-semibold mb-4">🎯 Primary Weapons</h2>
                <div>
                    {[
                        { tier: "S Tier", color: "text-yellow-400", weapons: "Nataruk, Kuva Bramma, Tenet Arca Plasmor, Felarx, Rubico Prime, Fulmin Prime, Proboscis Cernos, Cedo" },
                        { tier: "A Tier", color: "text-yellow-300", weapons: "Tenora Prime, Kuva Tonkor, Vaykor Hek, Tenet Flux Rifle, Acceltra, Dread, Kuva Chakkhurr, Phenmor, Synapse, Opticor Vandal" },
                        { tier: "B Tier", color: "text-yellow-200", weapons: "Quanta Vandal, Baza, Braton Prime, Cernos Prime, Corinth, Daikyu, Dex Sybaris, Glaxion Vandal, Hek, Ignis" }
                    ].map((t, idx) => (
                        <div key={idx} className="p-1">
                            <div className="bg-gray-800 rounded-xl p-4 shadow-md">
                                <h3 className={`text-xl font-bold ${t.color}`}>{t.tier}</h3>
                                <p className="text-gray-300">{t.weapons}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Secondary Weapons */}
            <section className="bg-gray-900 rounded-xl p-4 shadow-md mb-6">
                <h2 className="text-2xl font-semibold mb-4">🔫 Secondary Weapons</h2>
                <div>
                    {[
                        { tier: "S Tier", color: "text-yellow-400", weapons: "Epitaph, Kuva Nukor, Pyrana Prime, Tenet Cycron, Sporelacer" },
                        { tier: "A Tier", color: "text-yellow-300", weapons: "Akarius, Atomos, Catchmoon, Kuva Seer, Lex Prime, Staticor" },
                        { tier: "B Tier", color: "text-yellow-200", weapons: "Akbolto Prime, Ballistica Prime, Hikou Prime, Sicarus Prime, Twin Grakatas" }
                    ].map((t, idx) => (
                        <div key={idx} className="p-1">
                            <div className="bg-gray-800 rounded-xl p-4 shadow-md">
                                <h3 className={`text-xl font-bold ${t.color}`}>{t.tier}</h3>
                                <p className="text-gray-300">{t.weapons}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Melee Weapons */}
            <section className="bg-gray-900 rounded-xl p-4 shadow-md mb-6">
                <h2 className="text-2xl font-semibold mb-4">🗡️ Melee Weapons</h2>
                <div>
                    {[
                        { tier: "S Tier", color: "text-yellow-400", weapons: "Glaive Prime, Kronen Prime, Nikana Prime, Redeemer Prime, Stropha, Dual Keres Prime, Gram Prime, Guandao Prime" },
                        { tier: "A Tier", color: "text-yellow-300", weapons: "Orthos Prime, Plague Kripath, Reaper Prime, Venka Prime, War, Zaw (Plague Kripath), Lesion" },
                        { tier: "B Tier", color: "text-yellow-200", weapons: "Dakra Prime, Dragon Nikana, Dual Ichor, Galatine Prime, Scindo Prime" }
                    ].map((t, idx) => (
                        <div key={idx} className="p-1">
                            <div className="bg-gray-800 rounded-xl p-4 shadow-md">
                                <h3 className={`text-xl font-bold ${t.color}`}>{t.tier}</h3>
                                <p className="text-gray-300">{t.weapons}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default TierList;
