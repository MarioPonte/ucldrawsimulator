"use client";

interface TeamLeagueMatchesProps {
    drawData: any;
}

const TeamLeagueMatches: React.FC<TeamLeagueMatchesProps> = ({ drawData }) => {
  return (
        <div className="flex flex-col gap-6">
          {drawData.map((data: any) => (
            <div key={data.team} className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <span className="text-xl font-semibold">{data.team}</span>
              </div>
              <div className="flex gap-2">
                <div className="border rounded-md p-2 w-full">
                  <p className="font-medium">HOME</p>
                  {data.home.map((opponent: any) => (
                    <div key={opponent.id} className="flex items-center gap-2">
                      <img src={`https://flagcdn.com/${opponent.country}.svg`} alt={`${opponent.country} Flag`} className="w-4 h-3 border" />
                      <span className="text-sm">{opponent.name}</span>
                    </div>
                  ))}
                </div>
                <div className="border rounded-md p-2 w-full">
                  <p className="font-medium">AWAY</p>
                  {data.away.map((opponent: any) => (
                    <div key={opponent.id} className="flex items-center gap-2">
                      <img src={`https://flagcdn.com/${opponent.country}.svg`} alt={`${opponent.country} Flag`} className="w-4 h-3 border" />
                      <span className="text-sm">{opponent.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
  );
}

export default TeamLeagueMatches;