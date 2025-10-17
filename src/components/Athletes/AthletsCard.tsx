import React from "react";
import { Trophy, Award, Calendar } from "lucide-react";
import { Badge } from "../ui/Badge";
import { useRouter } from "next/navigation";

const teamColors: Record<string, string> = {
  Falcons: "bg-blue-100 text-blue-800",
  Eagles: "bg-green-100 text-green-800",
  Tigers: "bg-orange-100 text-orange-800",
};

export interface IAthlete {
  id: number;
  full_name: string;
  photo_url?: string;
  team?: string;
  gender: string;
  athlete_category: string;
  bio?: string;
  preferred_events?: string[];
  achievements?: string[];
  registration_date?: string;
}

interface Props {
  athlete: IAthlete;
}

const AthleteCard: React.FC<Props> = ({ athlete }) => {
  const router = useRouter();
  return (
    <div
      className="rounded-xl border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group cursor-pointer"
      onClick={() => router.push(`/athletes/${athlete.id}`)}
    >
      {/* Photo Section */}
      <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        {athlete.photo_url ? (
          <img
            src={athlete.photo_url}
            alt={athlete.full_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#00704A] to-[#005239] flex items-center justify-center text-white text-4xl font-bold shadow-xl">
              {athlete.full_name?.charAt(0) || "A"}
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Team Badge */}
        {athlete.team && (
          <div className="absolute top-4 right-4">
            <Badge
              className={`${
                teamColors[athlete.team] || "bg-gray-100 text-gray-800"
              } border-none shadow-lg px-2 py-0.5 text-xs rounded-2xl`}
            >
              {athlete.team}
            </Badge>
          </div>
        )}

        {/* Gender Badge */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-white/20 backdrop-blur-sm text-white border-none px-2 py-0.5 text-xs rounded-2xl">
            {athlete.gender === "male" ? "Male" : "Female"}
          </Badge>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#2D3436] mb-1 line-clamp-1">{athlete.full_name}</h3>
            <Badge className="!bg-[rgb(0_112_74_/_0.1)] !text-[#00704A] !font-extrabold border-none px-2 py-0.5 text-xs rounded-2xl">
              {athlete.athlete_category?.toUpperCase()}
            </Badge>
          </div>
        </div>

        {athlete.bio && <p className="text-gray-600 text-sm mb-4 line-clamp-2">{athlete.bio}</p>}

        {/* Events */}
        {athlete.preferred_events && athlete.preferred_events.length > 0 && (
          <div className="mb-4 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-[#C1272D]" />
              <span className="text-xs !font-bold text-gray-700">Events</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {athlete.preferred_events.slice(0, 3).map((event, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="text-xs !border-gray-300 !text-gray-600 rounded-2xl px-3 py-0.5 !font-bold"
                >
                  {event}
                </Badge>
              ))}
              {athlete.preferred_events.length > 3 && (
                <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">
                  +{athlete.preferred_events.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Achievements Count */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span>{athlete.achievements?.length || 0} Achievements</span>
          </div>

          {athlete.registration_date && (
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <Calendar className="w-3 h-3" />
              <span>Since {new Date(athlete.registration_date).getFullYear()}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AthleteCard;
