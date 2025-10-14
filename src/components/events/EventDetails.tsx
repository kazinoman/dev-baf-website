import { CalendarDays, Clock, Phone, Mail, Globe, Users, Trophy } from "lucide-react";
import Image from "next/image";
import eventImg from "@/assets/images/event/overview.jpg";
import fs1 from "@/assets/images/event/fs1.jpg";
import fs2 from "@/assets/images/event/fs2.jpg";
import Button from "../ui/Button";

export default function EventDetails() {
  return (
    <div className="min-h-screen mt-7 lg:mt-12">
      {/* Content Section */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* image and Event Overview */}
            <div className="">
              {/* Hero image and overview  */}
              <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
                <Image
                  src={eventImg}
                  alt="Football players in action on the field"
                  fill
                  className="object-cover"
                  priority
                />

                {/* <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent" /> */}

                {/* Date Badge */}
                <div className="absolute top-6 left-6 md:top-8 md:left-8">
                  <div className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
                    <div className="p-4 text-center">
                      <div className="text-3xl md:text-4xl font-bold text-primary">20</div>
                      <div className="text-sm font-medium  uppercase tracking-wide">January</div>
                      <div className="text-sm font-medium ">2023</div>
                    </div>
                  </div>
                </div>

                {/* Event Title */}
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white">
                  <div className="mb-3 bg-accent text-[#e41b23]-foreground">
                    <Trophy className="w-4 h-4 mr-1" />
                    Championship Match
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold text-balance mb-2">Chelsea vs Arsenal</h1>
                  <p className="text-lg md:text-xl text-white/90 font-medium">Premier League Showdown</p>
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 uppercase mt-12">Event Overview</h2>

              <p className="text-[#777777] text-sm md:text-base lg:text-lg leading-relaxed font-normal roboto-font">
                What makes Thomas Tuchel tick? The will to win, of course. His love of football. A constant desire to
                improve and innovate. But our boss always knows of being able to unwind, so thats why we have a at
                Chelsea. Meet Lars, our C.R. O. A firm believer in the power of football and art of relaxation, Lars is
                tasked with bringing smiles to the Chelsea players faces, lifting their moods and even, in some cases,
                booking their family holidays.
              </p>

              <p className="text-[#777777] text-sm md:text-base lg:text-lg leading-relaxed font-normal roboto-font mt-8">
                What makes Thomas Tuchel tick? The will to win, of course. His love of football. A constant desire to
                improve and innovate. But our boss always knows of being able to unwind, so thats why we have a at
                Chelsea. Meet Lars.
              </p>

              {/* maplocation  */}
              <section className="bg-white mt-12">
                <h2 className="text-3xl font-bold mb-7 flex items-center gap-2 uppercase">Location</h2>
                <div className="google-map-area">
                  <div className="map rounded-2xl overflow-hidden shadow-lg">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3651.0452483624595!2d90.424043!3d23.781403!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x3cc42b4e4b430164!2sReacThemes!5e0!3m2!1sen!2sbd!4v1656420500360!5m2!1sen!2sbd"
                      height="500"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-[500px]"
                    ></iframe>
                  </div>
                </div>
              </section>

              {/* FACILITIES */}
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 uppercase mt-12">FACILITIES</h2>

                <p className="text-[#777777] text-sm md:text-base lg:text-lg leading-relaxed font-normal roboto-font">
                  The Foundation’s Goal Getters platform is a female-targeted programme delivered across secondary
                  schools in the UK and aims to inspire and empower young women to set new goals, embed positive values
                  and connect with other young females.
                </p>
                {/* image container it  */}
                <div className="flex flex-col md:flex-row gap-4 lg:gap-6 mt-8 mb-4 lg:mb-16">
                  <Image src={fs1} width={500} height={400} alt="fs1" className="object-contain" />
                  <Image src={fs2} width={500} height={400} alt="fs1" className="object-contain" />
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Organizer Info */}
            <div className="bg-card border-border">
              <div className="p-6">
                <h3 className="text-2xl font-bold  mb-4 uppercase tracking-wide">Organizer</h3>
                <div className="space-y-4 mt-5 lg:mt-10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-[#e41b23]" />
                    </div>
                    <div className="flex items-center gap-0.5">
                      <p className="text-base roboto-font font-bold ">Name:</p>
                      <p className="font-medium text-base roboto-font text-[#777777]">Mike Dawson</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-[#e41b23]" />
                    </div>
                    <div className="flex items-center gap-0.5">
                      <p className="text-base roboto-font font-bold ">Phone:</p>
                      <p className="font-medium text-base roboto-font text-[#777777]">8 (800) 123-45-67</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-[#e41b23]" />
                    </div>
                    <div className="flex items-center gap-0.5">
                      <p className="text-base roboto-font font-bold">Email:</p>
                      <p className="font-medium text-base roboto-font text-[#777777] ">info@example.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Globe className="w-4 h-4 text-[#e41b23]" />
                    </div>
                    <div className="flex items-center gap-0.5">
                      <p className="text-base roboto-font font-bold ">Website:</p>
                      <p className="font-medium text-base roboto-font text-[#777777]  ">www.webmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Time & Date */}
            <section className="bg-card border-border">
              <div className="p-6">
                <h3 className="text-2xl font-bold  mb-4 uppercase tracking-wide">Time & Date</h3>
                <div className="space-y-4 mt-5 lg:mt-10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-[#e41b23]" />
                    </div>
                    <div className="flex items-center gap-0.5">
                      <p className="text-base roboto-font font-bold">Start:</p>
                      <p className="font-medium text-base roboto-font text-[#777777]">10:00 AM</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-[#e41b23]" />
                    </div>
                    <div className="flex items-center gap-0.5">
                      <p className="text-base roboto-font font-bold ">Break:</p>
                      <p className="font-medium text-base roboto-font text-[#777777]">8 (800) 123-45-67</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <CalendarDays className="w-4 h-4 text-[#e41b23]" />
                    </div>
                    <div className="flex items-center gap-0.5">
                      <p className="text-base roboto-font font-bold">End:</p>
                      <p className="font-medium text-base roboto-font text-[#777777] ">02:00PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* TVENUE */}
            <section className="bg-card border-border">
              <div className="p-6">
                <h3 className="text-2xl font-bold  mb-4 uppercase tracking-wide">VENUE</h3>
                <div className="space-y-4 mt-5 lg:mt-10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-[#e41b23]" />
                    </div>
                    <div>
                      <p className="font-medium text-base roboto-font text-[#777777]">Donald Stadium</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-[#e41b23]" />
                    </div>
                    <div>
                      <p className="font-medium text-base roboto-font text-[#777777]">Donald Stadium</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <CalendarDays className="w-4 h-4 text-[#e41b23]" />
                    </div>
                    <div>
                      <p className="font-medium text-base roboto-font text-[#777777]">Donald Stadium</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Action Buttons */}

            <div className="flex flex-col gap-3">
              <Button type="button" variant="orange" className="w-full">
                book your seat
              </Button>
              <Button type="button" variant="black" className="w-full bg-[#e41b23] border-none">
                add to calander
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
