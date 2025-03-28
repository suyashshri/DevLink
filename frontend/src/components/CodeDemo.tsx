import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CodeDemo = () => {
  return (
    <section className="py-20 bg-devlink-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight">
            Powerful <span className="gradient-text">Code Management</span>
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            DevLink handles your code and documents with precision.
          </p>
        </div>

        <div className="bg-devlink-dark rounded-lg shadow-2xl overflow-hidden">
          <Tabs defaultValue="projects" className="w-full">
            <div className="bg-gray-800 px-4 py-2">
              <TabsList className="grid grid-cols-3 bg-transparent">
                <TabsTrigger
                  value="projects"
                  className="data-[state=active]:bg-devlink-secondary/10 data-[state=active]:text-devlink-accent"
                >
                  Projects
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className="data-[state=active]:bg-devlink-secondary/10 data-[state=active]:text-devlink-accent"
                >
                  Code
                </TabsTrigger>
                <TabsTrigger
                  value="tasks"
                  className="data-[state=active]:bg-devlink-secondary/10 data-[state=active]:text-devlink-accent"
                >
                  Tasks
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="projects" className="m-0 p-6 font-code text-sm">
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center space-x-2">
                  <span className="text-devlink-accent">→</span>
                  <span className="text-yellow-300">my-web-app/</span>
                </div>
                <div className="flex items-center space-x-2 ml-6">
                  <span className="text-devlink-accent">→</span>
                  <span className="text-blue-300">src/</span>
                </div>
                <div className="flex items-center space-x-2 ml-12">
                  <span className="text-green-300">components/</span>
                </div>
                <div className="flex items-center space-x-2 ml-12">
                  <span className="text-green-300">pages/</span>
                </div>
                <div className="flex items-center space-x-2 ml-12">
                  <span className="text-green-300">utils/</span>
                </div>
                <div className="flex items-center space-x-2 ml-6">
                  <span className="text-devlink-accent">→</span>
                  <span className="text-blue-300">public/</span>
                </div>
                <div className="flex items-center space-x-2 ml-6">
                  <span className="text-white">README.md</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="code" className="m-0 p-6 font-code text-sm">
              <pre className="text-gray-300">
                <span className="text-pink-500">import</span>{" "}
                <span className="text-white">{"{"}</span>{" "}
                <span className="text-yellow-300">useState</span>{" "}
                <span className="text-white">{"}"}</span>{" "}
                <span className="text-pink-500">from</span>{" "}
                <span className="text-green-400">&apos;react&apos;</span>;<br />
                <br />
                <span className="text-pink-500">function</span>{" "}
                <span className="text-yellow-300">ProjectCard</span>
                <span className="text-white">({"{"}</span>{" "}
                <span className="text-blue-300">project</span>{" "}
                <span className="text-white">
                  {"}"}) {"{"}
                </span>
                <br />
                <span className="text-pink-500">const</span>{" "}
                <span className="text-white">[</span>
                <span className="text-blue-300">expanded</span>
                <span className="text-white">, </span>
                <span className="text-yellow-300">setExpanded</span>
                <span className="text-white">] = </span>
                <span className="text-yellow-300">useState</span>
                <span className="text-white">(</span>
                <span className="text-red-400">false</span>
                <span className="text-white">);</span>
                <br />
                <br />
                <span className="text-pink-500">return</span>{" "}
                <span className="text-white">(</span>
                <br />
                <span className="text-yellow-300">{"<div>"}</span>
                <br />
                <span className="text-yellow-300">{"<h3>"}</span>
                <span className="text-white">{"{"}</span>
                <span className="text-blue-300">project.name</span>
                <span className="text-white">{"}"}</span>
                <span className="text-yellow-300">{"</h3>"}</span>
                <br />
                <span className="text-yellow-300">{"<button>"}</span>View
                Details<span className="text-yellow-300">{"</button>"}</span>
                <br />
                <span className="text-yellow-300">{"</div>"}</span>
                <br />
                <span className="text-white">);</span>
                <br />
                <span className="text-white">{"}"}</span>
              </pre>
            </TabsContent>

            <TabsContent value="tasks" className="m-0 p-6 font-code text-sm">
              <div className="space-y-4 text-gray-300">
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-green-400">✓</span>
                  <span className="flex-1 mx-4">Setup project structure</span>
                  <span className="text-gray-500">Completed</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-yellow-400">○</span>
                  <span className="flex-1 mx-4">Create component library</span>
                  <span className="text-gray-500">In Progress</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-500">○</span>
                  <span className="flex-1 mx-4">Implement authentication</span>
                  <span className="text-gray-500">Todo</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-500">○</span>
                  <span className="flex-1 mx-4">Add unit tests</span>
                  <span className="text-gray-500">Todo</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default CodeDemo;
