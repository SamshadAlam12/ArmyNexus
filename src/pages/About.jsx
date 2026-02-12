import { ShieldIcon, UsersIcon, ChartIcon, SparkIcon } from '../components/Icons'
import ScrollReveal from '../components/ScrollReveal'

export default function About() {
  const values = [
    {
      title: 'Discipline',
      description:
        'Every operation is executed with rigorous standards, precision, and unwavering accountability.',
      Icon: ShieldIcon,
    },
    {
      title: 'Unity',
      description:
        'One force, one mission. We stand together, support together, and succeed together.',
      Icon: UsersIcon,
    },
    {
      title: 'Strength',
      description:
        'Physical, mental, and moral readiness that drives resilience on and off the field.',
      Icon: ChartIcon,
    },
  ]

  const journey = [
    {
      year: '2020',
      title: 'Foundation',
      description: 'Army Nexus concept and core command framework established.',
    },
    {
      year: '2021',
      title: 'Alpha Launch',
      description: 'Initial deployment with select divisions and mission groups.',
    },
    {
      year: '2022',
      title: 'Full Deployment',
      description: 'System scaled across multi‑theatre operations and support units.',
    },
    {
      year: '2024',
      title: 'Global Execution',
      description: 'Command portal expanded to international allied forces.',
    },
  ]

  return (
    <ScrollReveal>
      <div className="min-w-[320px] w-full max-w-full overflow-x-hidden">
      {/* Hero */}
      <section className="px-4 sm:px-6 pt-12 sm:pt-14 lg:pt-16 pb-10 sm:pb-12 lg:pb-14 border-b border-army-primary/40 bg-gradient-to-b from-army-primary/30 to-transparent reveal reveal-up">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center justify-center rounded-full border border-army-olive/40 bg-surface-card/70 px-3 py-1 text-[11px] font-medium tracking-wide text-army-oliveLight mb-4">
            <SparkIcon className="w-3 h-3 mr-1 text-army-oliveLight" />
            ABOUT ARMY NEXUS
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-army-sand mb-3">
            Our <span className="text-army-sandLight">Mission</span> &amp; Vision
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
            Army Nexus exists to deliver unified digital infrastructure, connecting personnel
            worldwide through a single command platform.
          </p>
        </div>

        {/* Mission / Vision cards */}
        <div className="mt-10 sm:mt-12 mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <div className="card-hover h-full">
            <div className="flex items-center gap-2 mb-2">
              <ShieldIcon className="w-4 h-4 text-army-oliveLight" />
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-army-oliveLight">
                Our Mission
              </p>
            </div>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              To provide a secure, always‑connected digital command environment that unites every
              soldier, staff member, and commander under a single operational picture. Army Nexus
              ensures decisions are made faster, missions are executed smarter, and teams stay
              aligned — anywhere in the world.
            </p>
          </div>
          <div className="card-hover h-full">
            <div className="flex items-center gap-2 mb-2">
              <ChartIcon className="w-4 h-4 text-army-oliveLight" />
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-army-oliveLight">
                Our Vision
              </p>
            </div>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              A world where every operation, from planning to debrief, is powered by a unified
              digital backbone. Army Nexus envisions a future where intelligence, readiness, and
              coordination operate in complete lockstep.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 reveal reveal-up">
        <div className="mx-auto max-w-5xl text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-army-sand">Core Values</h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400">
            The principles that define every action of Army Nexus.
          </p>
        </div>
        <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
          {values.map(({ title, description, Icon }) => (
            <div key={title} className="card-hover h-full">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-army-primary/50 border border-army-olive/50 text-army-sand">
                <Icon className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-semibold text-army-sand">{title}</h3>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Journey timeline */}
      <section className="px-4 sm:px-6 pb-12 sm:pb-16 reveal reveal-up">
        <div className="mx-auto max-w-5xl text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-army-sand">Our Journey</h2>
          <p className="mt-2 text-sm sm:text-base text-gray-400">
            The evolution of our digital command initiative.
          </p>
        </div>

        <div className="mx-auto max-w-4xl relative">
          <div className="absolute left-4 sm:left-1/2 top-2 bottom-2 border-l border-army-primary/40 pointer-events-none" />
          <div className="space-y-6 sm:space-y-8">
            {journey.map((step, index) => {
              const isLeft = index % 2 === 0
              return (
                <div
                  key={step.year}
                  className={`relative flex ${
                    isLeft ? 'sm:justify-start' : 'sm:justify-end'
                  } sm:items-center`}
                >
                  <div className="absolute left-3 sm:left-1/2 -ml-[3px] h-3 w-3 rounded-full bg-army-olive shadow-md" />
                  <div
                    className={`mt-2 sm:mt-0 w-full sm:w-[46%] ${
                      isLeft ? 'sm:mr-auto sm:pl-0 pl-8' : 'sm:ml-auto sm:pr-0 pl-8'
                    }`}
                  >
                    <div className="card-hover">
                      <p className="text-xs font-semibold tracking-[0.22em] uppercase text-army-oliveLight mb-1">
                        {step.year}
                      </p>
                      <p className="text-sm sm:text-base font-semibold text-army-sand">
                        {step.title}
                      </p>
                      <p className="mt-1.5 text-xs sm:text-sm text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats + Quote */}
      <section className="px-4 sm:px-6 pb-12 sm:pb-16 reveal reveal-up">
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)] gap-6 sm:gap-8 items-stretch">
          {/* Stats */}
          <div className="card-hover flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-army-sand">50,000+</p>
                <p className="mt-1 text-xs text-gray-400 uppercase tracking-wide">
                  Active Users
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-army-sand">150+</p>
                <p className="mt-1 text-xs text-gray-400 uppercase tracking-wide">
                  Mission Teams
                </p>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="card-hover flex flex-col justify-center text-center px-4 sm:px-6">
            <p className="text-sm sm:text-base text-gray-300 italic leading-relaxed">
              “In unity there is strength. In technology, there is capability. In Army Nexus, there
              is the future.”
            </p>
            <p className="mt-3 text-xs text-gray-500">— Command and Control Division</p>
          </div>
        </div>
      </section>
    </div>
    </ScrollReveal>
  )
}
