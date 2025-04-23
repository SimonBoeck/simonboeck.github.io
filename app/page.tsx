import Image from "next/image";
import { socialLinks } from "./config";

export default function Page() {
  return (
    <section>
      <a target="_blank">
        <Image
          src="/profile.jpg"
          alt="Profile photo"
          className="rounded-full bg-gray-100 block lg:mt-5 mt-0 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-5 sm:mb-5 grayscale hover:grayscale-0"
          unoptimized
          width={250}
          height={250}
          priority
        />
      </a>
      <h1 className="mb-8 text-2xl font-medium">
        About me
      </h1>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          Hi, my name is Simon Böck and I’m a Product Manager, Product Owner and Business Analyst.
        </p>
        <p>
          I have more then a decade experience in product management, agile methodologies, API development, and digital transformation across various industries.
        </p>
        <p>
          I accompany you in the development of your product. I will support you in analyzing your problem, identifying strategic and digital solutions, and coordinating development teams.
        </p>
        <p>
          Together we establish your vision, maximize values so that you are successful in the digital transformation. I offer a wide variety of tools, techniques and approaches to jointly achieve:
        </p>
        <ul>
          <li>ambitious strategies and inspiring product visions</li>
          <li>value-adding products through the use of digital technologies</li>
          <li>modern work cultures,</li>
          <li>and the courage to never accept the status quo as a given.</li>
        </ul>

      </div>
    </section>
  );
}
