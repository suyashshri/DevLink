import React from "react";
import { Folder, Code, Star, Users, Lock, Database } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    title: "Structured Organization",
    description:
      "Keep all your projects, repositories, and documents organized in a clean hierarchy.",
    icon: <Folder className="w-10 h-10 text-devlink-secondary" />,
  },
  {
    title: "Code Integration",
    description:
      "Seamlessly integrate with your existing git repositories and code editors.",
    icon: <Code className="w-10 h-10 text-devlink-secondary" />,
  },
  {
    title: "Smart Collections",
    description:
      "Create custom collections to group related projects across different categories.",
    icon: <Star className="w-10 h-10 text-devlink-secondary" />,
  },
  {
    title: "Team Collaboration",
    description:
      "Invite teammates to specific projects with customizable permission levels.",
    icon: <Users className="w-10 h-10 text-devlink-secondary" />,
  },
  {
    title: "Privacy Controls",
    description:
      "Keep your work private by default, with granular sharing options when needed.",
    icon: <Lock className="w-10 h-10 text-devlink-secondary" />,
  },
  {
    title: "Project Analytics",
    description:
      "Track your progress and contributions with built-in analytics dashboards.",
    icon: <Database className="w-10 h-10 text-devlink-secondary" />,
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight">
            Everything you need for{" "}
            <span className="gradient-text">efficient development</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            DevLink combines the best tools for developers in one intuitive
            platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border border-gray-200 hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
            >
              <CardHeader>
                <div className="mb-2">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
