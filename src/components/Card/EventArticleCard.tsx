import Image from "next/image"
import Link from "next/link"

interface ArticleCardProps {
  id: string,
  title: string
  description: string
  date: string
  imageUrl: string
  imageAlt: string
}


export function EventArticleCard({ title, description, date, imageUrl, imageAlt, id }: ArticleCardProps) {


  return (
    <div className="group relative cursor-pointer">

      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />


        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Date Badge */}
        <div className="absolute bottom-0 left-0 bg-black  p-4 text-white">
          <div className="text-2xl font-black  ">{date.split(" ")[0]}</div>
          <div className="text-sm font-bold uppercase tracking-wide roboto-font mt-1">January</div>
          <span className="text-sm font-bold uppercase tracking-wide roboto-font">2025</span>
        </div>

      </div>

      <div className="py-6">
        
        <Link href={`/events/${id}`} >
        <h3 className=" text-xl lg:text-2xl font-black mb-3 uppercase tracking-tight hover:text-[#e41b23] duration-500">
          {title}
        </h3>
         </Link>

        <p className="text-[#777777] text-sm md:text-base lg:text-lg leading-relaxed font-normal roboto-font">{description}</p>
      </div>

    </div>
  )
}
