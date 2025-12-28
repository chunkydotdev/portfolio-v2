import { partners } from '@/lib/constants'

export function Partners() {
  return (
    <section className="py-16 px-4 w-full">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-3xl md:text-4xl text-center mb-8">
          Previous Partners
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-12 md:h-16 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
