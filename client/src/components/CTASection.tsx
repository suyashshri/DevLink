import React from "react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-24 bg-devlink-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
          Ready to organize your{" "}
          <span className="gradient-text">development workflow</span>?
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Join thousands of developers who are already more productive with
          DevLink.
        </p>
        <Button className="bg-devlink-secondary hover:bg-devlink-secondary/90 text-white text-lg py-6 px-8">
          Get Started for Free
        </Button>
        <p className="mt-6 text-gray-400">
          No credit card required. Start your free trial today.
        </p>
      </div>
    </section>
  );
};

export default CTASection;
