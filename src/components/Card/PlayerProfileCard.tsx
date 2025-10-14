import Image from "next/image";
import { Separator } from "../ui/Separator";

interface PlayerProfileProps {
  name: string;
  role: string;
  image: string;
  nationality: string;
  nationalityFlag: string;
  currentTeam: string;
  pastTeam?: string;
  age: number;
}

export function PlayerProfileCard({
  name,
  image,
  nationality,
  currentTeam,
  pastTeam,
  age,
}: PlayerProfileProps) {
  return (
    <div className="max-w-7xl mx-auto  border-0 mt-16 px-4 sm:px-5">
      <div className="pb-4 ml-2 flex items-center gap-3">
        <Separator
          orientation="horizontal"
          className="w-6.5 border-red-600 border-[1px]"
        />
        <div className="text-2xl font-semibold text-[#111111]">{name}</div>
      </div>

      <div className="space-y-6">
        <Separator orientation="horizontal" />

        <div className="grid md:grid-cols-[300px_1fr] gap-6">
          {/* Player Image */}
          <div className="relative h-[270px] overflow-hidden rounded-lg bg-muted">
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>

          {/* Player Information */}
          <div className="space-y-1">
            <div className="grid gap-3">
              <div className="flex items-center justify-between py-3">
                <span className="text-lg font-semibold text-[#5B5F64] uppercase tracking-wide">
                  Nationality:
                </span>
                <div className="flex items-center justify-center gap-2">
                  {/* <span className="text-lg">{nationalityFlag}</span> */}
                  <span className="font-normal text-[#999999] text-base uppercase roboto-font">
                    {nationality}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between py-3">
                <span className="text-lg font-semibold text-[#5B5F64] uppercase tracking-wide">
                  Current Team:
                </span>
                <div className="font-normal text-red-600 text-base uppercase roboto-font ">
                  {currentTeam}
                </div>
              </div>

              <Separator />

              {pastTeam && (
                <>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-lg font-semibold text-[#5B5F64] uppercase tracking-wide">
                      Past Team:
                    </span>
                    <span className="font-normal text-[#999999] text-base uppercase roboto-font">
                      {pastTeam}
                    </span>
                  </div>

                  <Separator />
                </>
              )}

              <div className="flex items-center justify-between py-3">
                <span className="text-lg font-semibold text-[#5B5F64] uppercase tracking-wide">
                  Age:
                </span>
                <span className="font-normal text-[#999999] text-base uppercase roboto-font">
                  {age}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
