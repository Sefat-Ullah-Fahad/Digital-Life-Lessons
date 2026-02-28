import React from "react";
import Banner from "../../components/Home/Banner";
import WhyLifeMatters from "../../components/Home/WhyLifeMatters";
import FeaturedLessons from "../../components/Home/FeaturedLessons";
import TopContributors from "../../components/Home/TopContributors";

export default function Home() {
  return (
    <main>
      <section>
        <Banner></Banner>
      </section>

      <section>
        <WhyLifeMatters></WhyLifeMatters>
      </section>

      <section>
        <FeaturedLessons></FeaturedLessons>
      </section>

      <section>
        <TopContributors></TopContributors>
      </section>
    </main>
  );
}
