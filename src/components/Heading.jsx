import Reveal from './Reveal.jsx'

export default function Heading({ title, sub, as = 'h2' }) {
  const H = as
  return (
    <Reveal className="text-center mb-14">
      <H className="text-3xl sm:text-4xl lg:text-4xl font-extrabold mb-3 tracking-tight text-heading">
        {title}
      </H>
      {sub && (
        <p className="text-base sm:text-lg max-w-2xl mx-auto text-muted leading-relaxed font-normal">
          {sub}
        </p>
      )}
    </Reveal>
  )
}
