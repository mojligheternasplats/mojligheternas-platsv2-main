import { PageHeader } from '@/components/shared/PageHeader';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        title="About Us"
        description="Pioneering the future of data systems through innovation, research, and collaboration."
      />
      <div className="container py-16 md:py-24">
        <div className="prose lg:prose-xl mx-auto">
          <p>
            DataFlow Architect is a leading research institution and consultancy dedicated to solving the most
            challenging problems in data engineering and systems architecture. Founded in 2015, our mission is to
            design, build, and deploy robust, scalable, and efficient data solutions that empower organizations
            to unlock the full potential of their data.
          </p>
          
          <div className="my-12 not-prose">
            <Image 
              src="https://picsum.photos/seed/about-us/1200/500"
              alt="Our team working collaboratively"
              width={1200}
              height={500}
              className="rounded-lg shadow-lg w-full object-cover"
              data-ai-hint="team collaboration"
            />
          </div>

          <h2>Our Vision</h2>
          <p>
            We envision a world where data flows seamlessly and securely, enabling breakthroughs in science,
            smarter cities, more efficient industries, and a more connected global community. We believe that
            well-designed data architecture is the bedrock of modern innovation.
          </p>

          <h2>What We Do</h2>
          <p>
            Our work spans across three main pillars:
          </p>
          <ul>
            <li><strong>Fundamental Research:</strong> We push the boundaries of what's possible in distributed systems, database design, and large-scale data processing.</li>
            <li><strong>Applied Projects:</strong> We partner with industry leaders and public institutions to solve real-world problems, turning theoretical research into practical, impactful solutions.</li>
            <li><strong>Education & Outreach:</strong> Through workshops, camps, and academic programs, we are committed to nurturing the next generation of data architects and engineers.</li>
          </ul>

          <blockquote>
            "Our goal is not just to build systems, but to build understanding. We transform complex data landscapes into clear, actionable insights."
          </blockquote>
          
          <p>
            Our interdisciplinary team of computer scientists, engineers, and domain experts works at the
            forefront of technology. We invite you to explore our work and join us on our mission to
            architect the future of data.
          </p>
        </div>
      </div>
    </div>
  );
}
