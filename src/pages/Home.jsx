import { Link } from 'react-router-dom'
import { ShieldIcon, LockIcon, RadarIcon, UsersIcon, ChartIcon } from '../components/Icons'
import ScrollReveal from '../components/ScrollReveal'

export default function Home() {
  const stats = [
    { label: 'Active Command Units', value: '50K+', Icon: ShieldIcon },
    { label: 'Missions Coordinated', value: '200+', Icon: RadarIcon },
    { label: 'Uptime Reliability', value: '99.9%', Icon: ChartIcon },
    { label: 'Operational Support', value: '24 / 7', Icon: UsersIcon },
  ]

  const whyJoin = [
    {
      title: 'Secure Command',
      description:
        'Military‑grade security protocols protecting every briefing, order, and data stream across the force.',
      Icon: LockIcon,
    },
    {
      title: 'Mission Ready',
      description:
        'Streamlined dashboards, alerts, and briefs to keep every unit synchronized and ready to deploy.',
      Icon: RadarIcon,
    },
    {
      title: 'United Forces',
      description:
        'Connect divisions, commands, and teams in a single, unified operational picture.',
      Icon: UsersIcon,
    },
  ]

  return (
    <ScrollReveal>
      <div className="min-w-[320px] w-full max-w-full overflow-x-hidden">
        {/* Hero */}
      <section className="relative overflow-hidden border-b border-army-primary/40 reveal reveal-up">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at top, rgba(255,255,255,0.08) 0, transparent 55%), radial-gradient(circle at 20% 80%, rgba(76, 175, 80, 0.18) 0, transparent 60%)',
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center justify-center rounded-full border border-army-olive/40 bg-surface-card/60 px-3 py-1 text-[11px] font-medium tracking-wide text-army-oliveLight mb-4 sm:mb-5">
              <span className="mr-1 h-1.5 w-1.5 rounded-full bg-army-olive" />
              OFFICIAL COMMAND PORTAL
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.4rem] font-extrabold tracking-tight text-army-sand leading-tight">
              <span className="block">Central Command.</span>
              <span className="block text-army-sandLight">Unified Force.</span>
            </h1>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto">
              Army Nexus is your digital command portal — connecting personnel, streamlining
              operations, and maintaining tactical superiority across all divisions.
            </p>
            <div className="mt-8 flex flex-col xs:flex-row gap-3 xs:gap-4 justify-center items-center">
              <Link
                to="/signup"
                className="btn-primary w-full xs:w-auto min-w-[150px] shadow-md hover:shadow-lg"
              >
                Enlist Now
              </Link>
              <Link
                to="/dashboard"
                className="btn-secondary w-full xs:w-auto min-w-[150px]"
              >
                Access Portal
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-10 sm:mt-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center text-xs sm:text-sm">
              {stats.map(({ label, value, Icon }) => (
                <div
                  key={label}
                  className="rounded-lg border border-army-primary/40 bg-surface-card/70 px-3 py-3 sm:py-4 shadow-sm transition-all duration-300 hover:border-army-olive/60 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <div className="mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-md bg-army-primary/50 text-army-sand">
                    <Icon className="w-4 h-4" />
                  </div>
                  <p className="text-base sm:text-lg font-semibold text-army-sand">{value}</p>
                  <p className="mt-1 text-[11px] sm:text-xs text-gray-400">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 reveal reveal-up">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-army-sand">Why Join Army Nexus?</h2>
            <p className="mt-3 text-sm sm:text-base text-gray-400">
              Experience the next generation of military command systems — purpose‑built for modern
              operations.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {whyJoin.map(({ title, description, Icon }) => (
              <div
                key={title}
                className="card-hover h-full flex flex-col justify-between"
              >
                <div>
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-army-primary/50 border border-army-olive/50 text-army-sand">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-semibold text-army-sand">{title}</h3>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Highlight */}
      <section className="px-4 sm:px-6 pb-12 sm:pb-16 reveal reveal-up">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-8 lg:gap-10 items-stretch">
          <div className="space-y-4 sm:space-y-5">
            <span className="inline-flex items-center rounded-full border border-army-olive/40 bg-surface-card/60 px-3 py-1 text-[11px] font-medium tracking-wide text-army-oliveLight">
              About the Mission
            </span>
            <h3 className="text-2xl sm:text-3xl font-semibold text-army-sand">
              Building the Future of Military Operations
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Army Nexus accelerates decision‑making with real‑time command dashboards, secure
              communication channels, and mission analytics. Our platform ensures every unit —
              from support teams to frontline operators — moves with unified intent.
            </p>
            <ul className="mt-3 space-y-2 text-sm text-gray-300">
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-army-olive" />
                <span>Centralized briefs, tasking, and mission updates.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-army-olive" />
                <span>Role‑based access for commanders, staff, and operators.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-army-olive" />
                <span>Operational history and readiness insights at a glance.</span>
              </li>
            </ul>
            <Link
              to="/about"
              className="mt-4 inline-flex items-center text-sm font-semibold text-army-olive hover:text-army-oliveLight transition-colors"
            >
              Learn More About Us
              <svg className="ml-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="card relative flex items-center justify-center overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <div className="absolute inset-0 opacity-60 bg-gradient-to-br from-army-primary/40 via-transparent to-army-olive/30" />
            <div className="relative flex flex-col items-center justify-center py-10">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-army-olive/60 bg-army-primary/40 shadow-lg">
                <ShieldIcon className="h-7 w-7 text-army-sand" />
              </div>
              <p className="text-3xl font-extrabold tracking-wide text-army-sand">AN</p>
              <p className="mt-1 text-xs font-medium tracking-[0.18em] uppercase text-gray-400">
                Army Nexus
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 sm:px-6 pb-12 sm:pb-16 reveal reveal-up">
        <div className="mx-auto max-w-4xl text-center card-hover">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-gray-400">
            Ready to Join the Ranks?
          </p>
          <h3 className="mt-3 text-xl sm:text-2xl font-semibold text-army-sand">
            Enlist today and become part of the next generation of connected command leaders.
          </h3>
          <div className="mt-6 flex justify-center">
            <Link
              to="/signup"
              className="btn-primary min-w-[170px] bg-army-sand text-army-dark border-army-sand hover:bg-army-sandLight"
            >
              Begin Enrollment
            </Link>
          </div>
        </div>
      </section>
    </div>
    </ScrollReveal>
  )
}
