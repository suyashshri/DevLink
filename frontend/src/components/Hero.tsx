import React from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-full h-full bg-gradient-to-br from-devlink-primary/5 via-background to-devlink-accent/5" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:space-x-12">
          <div className="text-center md:text-left md:w-1/2 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Manage your developer projects like a{" "}
              <span className="gradient-text">pro</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              DevLink is your all-in-one platform for organizing, collaborating,
              and tracking all your development projects in one beautiful
              interface.
            </p>
            <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
              <Button className="bg-devlink-secondary hover:bg-devlink-secondary/90 h-12 px-6">
                Get Started - It&apos;s Free
              </Button>
              <Button variant="outline" className="h-12 px-6">
                View Demo
              </Button>
            </div>
          </div>

          <div className="mt-16 md:mt-0 md:w-1/2 animate-slideUp">
            <div className="relative mx-auto max-w-xl">
              <div className="code-snippet gradient-border">
                <pre className="text-devlink-accent">
                  <span className="text-gray-400">
                    DevLink Project Management
                  </span>
                  <span className="text-pink-500">function</span>{" "}
                  <span className="text-yellow-300">manageProject</span>()
                  <span className="text-white"> {`{`}</span>
                  <span className="text-yellow-300">organize</span>(
                  <span className="text-green-400">&quot;code&quot;</span>);
                  <span className="text-yellow-300">track</span>(
                  <span className="text-green-400">&quot;progress&quot;</span>);
                  <span className="text-yellow-300">collaborate</span>(
                  <span className="text-green-400">&quot;team&quot;</span>);
                  <span className="text-purple-400">return</span>{" "}
                  <span className="text-green-400">&quot;success&quot;</span>;
                  <span className="text-white">{`}`}</span>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
